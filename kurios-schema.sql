CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  email         TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password      TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE wallet(
  id        SERIAL PRIMARY KEY,
  usd       NUMERIC(18,8) NOT NULL DEFAULT 10000,
  btc       NUMERIC(18,8) NOT NULL DEFAULT 0,
  eth       NUMERIC(18,8) NOT NULL DEFAULT 0,
  ada       NUMERIC(18,8) NOT NULL DEFAULT 0,
  dot       NUMERIC(18,8) NOT NULL DEFAULT 0,
  xmr       NUMERIC(18,8) NOT NULL DEFAULT 0,
  doge      NUMERIC(18,8) NOT NULL DEFAULT 0,
  user_id   INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
);


CREATE TABLE tutorials(
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  description      TEXT,
  color            TEXT
);


CREATE TABLE completed_tutorials(
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER NOT NULL,
  completed     BOOLEAN DEFAULT false,
  tutorial_id INTEGER REFERENCES tutorials(id) on DELETE CASCADE, 
  FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE
);

CREATE TABLE transactions(
  id                SERIAL PRIMARY KEY,
  user_id           INTEGER REFERENCES users(id) on DELETE CASCADE,
  buying_id         TEXT NOT NULL,
  buying_quantity   NUMERIC(18,8) NOT NULL,
  selling_id        TEXT NOT NULL, 
  selling_quantity  NUMERIC(18,8) NOT NULL, 
  created_at        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE prices_by_day(
  id                SERIAL PRIMARY KEY,
  coin_id           TEXT NOT NULL,
  price             NUMERIC(18,8) NOT NULL,
  time              TEXT NOT NULL
);

CREATE TABLE prices_by_hour(
  id                SERIAL PRIMARY KEY,
  coin_id           TEXT NOT NULL,
  price             NUMERIC(18,8) NOT NULL,
  time              TEXT NOT NULL
);
CREATE TABLE prices_by_minute(
  id                SERIAL PRIMARY KEY,
  coin_id           TEXT NOT NULL,
  price             NUMERIC(18,8) NOT NULL,
  time              TEXT NOT NULL
);
CREATE TABLE current_price(
  id                SERIAL PRIMARY KEY,
  coin_id           TEXT NOT NULL UNIQUE,
  price             NUMERIC(18,8) NOT NULL,
  time              TEXT NOT NULL
);

CREATE TABLE news_articles(
  id                SERIAL PRIMARY KEY, 
  coin_id           TEXT NOT NULL,
  headline          TEXT NOT NULL,
  time              TEXT NOT NULL,
  source            TEXT NOT NULL,
  url               TEXT NOT NULL,
  image_url         TEXT NOT NULL
);


CREATE TABLE statistics(
  id                SERIAL PRIMARY KEY,
  coin_id           TEXT NOT NULL,
  volume            NUMERIC(18,8) NOT NULL,
  market_cap        NUMERIC(18,8) NOT NULL,
  supply            NUMERIC(18,8) NOT NULL
)
