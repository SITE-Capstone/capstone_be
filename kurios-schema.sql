CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  email         TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password      TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  tutorials_completed   TEXT NOT NULL
);

CREATE TABLE wallet(
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER NOT NULL,
  usd       INTEGER NOT NULL DEFAULT 10000,
  btc       INTEGER NOT NULL DEFAULT 0,
  eth       INTEGER NOT NULL DEFAULT 0,
  ada       INTEGER NOT NULL DEFAULT 0,
  dot       INTEGER NOT NULL DEFAULT 0,
  xmr       INTEGER NOT NULL DEFAULT 0,
  doge      INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
)





