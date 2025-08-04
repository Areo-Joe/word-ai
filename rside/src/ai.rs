use eventsource_client as es;
use futures::{Stream, StreamExt};
use serde::Deserialize;
use serde_json::json;

#[derive(Deserialize)]
struct StreamResult {
    choices: Vec<Choice>,
}

#[derive(Deserialize)]
struct Choice {
    delta: Delta,
}

#[derive(Deserialize)]
struct Delta {
    content: Option<String>,
}

pub async fn generate_story(
    word: &str,
    url: &str,
    model: &str,
    api_key: &str,
) -> impl Stream<Item = String> {
    let body = create_word_story_request_body(word, model);
    let client = build_sse_client(&body, url, api_key);
    stream_ai(client)
}

pub fn build_sse_client(body: &str, url: &str, api_key: &str) -> impl es::Client {
    es::ClientBuilder::for_url(url)
        .unwrap()
        .header("Content-Type", "application/json")
        .unwrap()
        .header("Authorization", &format!("Bearer {}", api_key))
        .unwrap()
        .method(String::from("POST"))
        .body(body.to_string())
        .build()
}

pub fn stream_ai(client: impl es::Client) -> impl Stream<Item = String> {
    client
        .stream()
        .take_while(|x| {
            // 当接收到结束信号时停止流
            match x {
                Result::Ok(es::SSE::Event(es::Event { data, .. })) => {
                    // 检查是否是结束信号
                    if data.eq("[DONE]") {
                        futures::future::ready(false) // 停止流
                    } else {
                        futures::future::ready(true) // 继续流
                    }
                }
                _ => futures::future::ready(true),
            }
        })
        .filter_map(async |x| match x {
            Result::Ok(es::SSE::Event(es::Event { data, .. })) => {
                if let Ok(result) = serde_json::from_str::<StreamResult>(&data) {
                    let content_vec: Vec<String> = result
                        .choices
                        .into_iter()
                        .filter_map(|x| x.delta.content)
                        .collect();

                    Some(content_vec)
                } else {
                    None
                }
            }
            _ => None,
        })
        .flat_map(|content_vec| futures::stream::iter(content_vec))
}

fn create_word_story_request_body(word: &str, model: &str) -> String {
    json!({
        "model": model,
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
            "content": word
          }
        ],
        "stream": true,
        "thinking": {
            "type": "disabled"
        }
    }).to_string()
}
