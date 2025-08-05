use crate::state::AppState;
use rside::words::Word;
use tauri::command;
use tauri::{async_runtime::Mutex, State};

#[command]
pub async fn get_all_words(state: State<'_, Mutex<AppState>>) -> Result<Vec<Word>, String> {
    let conn_guard = state.lock().await;
    let result = rside::words::get_all_words(&conn_guard.conn).await;
    Ok(result)
}

#[command]
pub async fn delete_word(state: State<'_, Mutex<AppState>>, word: &str) -> Result<(), String> {
    let conn_guard = state.lock().await;
    rside::words::delete_word(&conn_guard.conn, word).await;
    Ok(())
}
