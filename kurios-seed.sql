-- SEED File
-- Create mock users
-- Create mock listings

INSERT INTO users (username, first_name, last_name, email, password, tutorials_completed)
VALUES (
  'jlo',
  'Jennifer',
  'Lopez',
  'jennifer@lopez.io',
  '$2b$12$ME4TAfZ5kXAm18cBGeulDu5YCEHuq93V3ZAW5qGQf90jLglEb.tje',
  ''
), (
  'lebron',
  'LeBron',
  'James',
  'lebron@james.io',
  '$2b$12$2cDHtwQgH.TFm51.xixIpOf9wEZZ66IusgMK937nB/L2AxODiGMJS',
  ''
), (
  'serena',
  'Serena',
  'Williams',
  'serena@williams.io',
  '$2b$12$LA1KAGAZHzUKGkxraRoClOsZ46xnmT6YxWuyYEJg5k7Iu29.uzrLW',
  ''
);
INSERT INTO wallet (user_id)
VALUES(1);

INSERT INTO wallet (user_id, btc, eth)
VALUES(2,10000,4);

INSERT INTO wallet (user_id, btc, eth, dot)
VALUES(3,100000, 1, 5);

INSERT INTO completed_tutorials (user_id)
VALUES(1);

INSERT INTO completed_tutorials (user_id, tut1)
VALUES(2,true);

INSERT INTO completed_tutorials (user_id, tut1, tut2, tut3)
VALUES(3,true, false, true);

