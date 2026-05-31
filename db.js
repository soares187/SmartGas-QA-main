const Database = require('better-sqlite3');

const db = new Database('gas.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    NOT NULL UNIQUE,
    senha_hash TEXT    NOT NULL,
    criado_em  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leituras (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    device    TEXT NOT NULL,
    ppm       REAL NOT NULL,
    alerta    INTEGER NOT NULL DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;