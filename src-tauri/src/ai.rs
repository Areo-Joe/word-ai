use crate::state::AppState;
use futures::StreamExt;
use rside::ai;
use serde::Serialize;
use std::env;
use tauri::{async_runtime::Mutex, ipc::Channel, State};

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event",
    content = "data"
)]
pub enum StreamAIEvent {
    Message { content: String },
    Done,
}

#[tauri::command]
pub async fn stream_ai(
    state: State<'_, Mutex<AppState>>,
    word: &str,
    on_event: Channel<StreamAIEvent>,
) -> Result<(), String> {
    let api_key = env::var("API_KEY").unwrap();
    let url = env::var("AI_URL").unwrap();
    let model = env::var("MODEL").unwrap();

    let conn_guard = state.lock().await;

    if let Some(rside::words::Word { story, .. }) =
        rside::words::get_word(&conn_guard.conn, word).await
    {
        on_event
            .send(StreamAIEvent::Message { content: story })
            .unwrap();
        on_event.send(StreamAIEvent::Done).unwrap();
    } else {
        let mut text_stream = Box::pin(ai::generate_story(word, &url, &model, &api_key).await);

        let mut story = String::new();
        while let Some(content) = text_stream.next().await {
            story.push_str(&content);

            on_event
                .send(StreamAIEvent::Message { content: content })
                .unwrap();
        }
        rside::words::create_word(&conn_guard.conn, word, &story).await;
    }

    Ok(())
}
