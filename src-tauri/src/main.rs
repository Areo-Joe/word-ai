// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::async_runtime::Mutex;
use tauri::{async_runtime::block_on, Builder, Manager};
use word_ai_lib::state::AppState;

fn main() {
    let db = block_on(async {
        turso::Builder::new_local("sqlite.db")
            .build()
            .await
            .unwrap()
    });

    let conn = db.connect().unwrap();
    block_on(async { rside::words::ensure_table_exists(&conn).await });

    Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState { conn }));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![word_ai_lib::ai::stream_ai])
        .run(tauri::generate_context!())
        .unwrap();
}
