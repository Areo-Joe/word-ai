pub mod ai;
pub mod state;
pub mod words;
use std::env;
use tauri::async_runtime::Mutex;
use tauri::{async_runtime::block_on, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let conn = block_on(async {
        turso::Builder::new_local("sqlite.db")
            .build()
            .await
            .unwrap()
            .connect()
            .unwrap()
    });

    block_on(async { rside::words::ensure_table_exists(&conn).await });

    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(state::AppState { conn }));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            ai::stream_ai,
            words::get_all_words,
            words::delete_word
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
