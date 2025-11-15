import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./feedback.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS feedbacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        rating INTEGER,
        createdAt TEXT
    )`
  );
});

export default db;
