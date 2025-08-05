use serde::{Deserialize, Serialize};
use turso::Connection;

#[derive(Debug, Serialize, Deserialize)]
pub struct Word {
    pub word: String,
    pub story: String,
}

pub async fn create_word(conn: &Connection, word: &str, story: &str) {
    conn.execute(
        "INSERT INTO WORD (word, story) VALUES (?, ?)",
        (word, story),
    )
    .await
    .unwrap();
}

pub async fn get_word(conn: &Connection, word: &str) -> Option<Word> {
    let mut rows = conn
        .query("SELECT word, story FROM WORD WHERE word = ?", (word,))
        .await
        .unwrap();

    if let Ok(Some(row)) = rows.next().await {
        let word_text = row.get_value(0).unwrap().as_text().unwrap().to_string();
        let story_text = row.get_value(1).unwrap().as_text().unwrap().to_string();

        Some(Word {
            word: word_text,
            story: story_text,
        })
    } else {
        None
    }
}

pub async fn get_all_words(conn: &Connection) -> Vec<Word> {
    let mut rows = conn
        .query("SELECT word, story FROM WORD", ())
        .await
        .unwrap();

    let mut words = Vec::new();

    while let Ok(Some(row)) = rows.next().await {
        let word_text = row.get_value(0).unwrap().as_text().unwrap().to_string();
        let story_text = row.get_value(1).unwrap().as_text().unwrap().to_string();

        words.push(Word {
            word: word_text,
            story: story_text,
        });
    }

    words
}

pub async fn update_word(conn: &Connection, word: &str, new_story: &str) {
    conn.execute(
        "UPDATE WORD SET story = ? WHERE word = ?",
        (new_story, word),
    )
    .await
    .unwrap();
}

pub async fn delete_word(conn: &Connection, word: &str) {
    conn.execute("DELETE FROM WORD WHERE word = ?", (word,))
        .await
        .unwrap();
}

pub async fn word_exists(conn: &Connection, word: &str) -> bool {
    let mut rows = conn
        .query("SELECT 1 FROM WORD WHERE word = ?", (word,))
        .await
        .unwrap();
    rows.next().await.unwrap().is_some()
}

pub async fn ensure_table_exists(conn: &Connection) {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS WORD (
            word TEXT,
            story TEXT
        );",
        (),
    )
    .await
    .unwrap();
}
