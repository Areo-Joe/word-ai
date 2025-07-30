use es::Client;
use eventsource_client as es;
use futures::TryStreamExt;
use serde::Serialize;
use serde_json::json;
use std::env;
use tauri::{ipc::Channel, AppHandle};

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event",
    content = "data"
)]
pub enum StreamAIEvent {
    Message { content: String },
}

#[tauri::command]
pub async fn stream_ai(
    _app: AppHandle,
    word: &str,
    on_event: Channel<StreamAIEvent>,
) -> Result<(), String> {
    let api_key = env::var("API_KEY").unwrap();
    let url = env::var("AI_URL").unwrap();

    let body = create_word_story_request(word);

    let client = es::ClientBuilder::for_url(&url)
        .unwrap()
        .header("Content-Type", "application/json")
        .unwrap()
        .header("Authorization", &format!("Bearer {}", api_key))
        .unwrap()
        .method(String::from("POST"))
        .body(body)
        .build();

    let mut event_stream = client
        .stream()
        .map_ok(|event| event)
        .map_err(|err| eprintln!("error streaming events: {:?}", err));

    while let Ok(Some(event)) = event_stream.try_next().await {
        match event {
            es::SSE::Event(es::Event { data, .. }) => {
                on_event
                    .send(StreamAIEvent::Message { content: data })
                    .unwrap();
            }
            _ => {}
        }
    }

    Ok(())
}

fn create_word_story_request(word: &str) -> String {
    json!({
        "model": "glm-4.5-flash",
        "messages": [
          {
            "role": "system",
            "content": "You are a vocabulary story creator.Task: Create short explanatory stories for given words.Requirements:
            - Story length: 50-100 words
            - Vivid and memorable plot
            - Naturally incorporate word meaning
            - Easy for language learners to understand

            Output format:[story content]

            IMPORTANT: Only output the formatted story. Do not add any extra comments, explanations, or additional text.

            Example:
            **Word**: serendipity
            Tom was heading to the library to return books when he found an injured kitten on the street. While taking it to the vet, he met Sarah, a kind veterinarian. They instantly connected over their love for animals and became great friends. Sometimes the best discoveries happen when we least expect them.

            Please create a story for the word I provide."
          } ,
          {
            "role": "user",
            "content": "TO_BE_REPLACED_WITH_WORD"
          }
        ],
        "stream": true
    }).to_string().replace("TO_BE_REPLACED_WITH_WORD", word)
}
