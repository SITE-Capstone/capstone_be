-- SEED File
-- Create mock users
-- Create mock listings

INSERT INTO users (username, first_name, last_name, email, password)
VALUES (
  'jlo',
  'Jennifer',
  'Lopez',
  'jennifer@lopez.io',
  '$2b$12$ME4TAfZ5kXAm18cBGeulDu5YCEHuq93V3ZAW5qGQf90jLglEb.tje'
), (
  'lebron',
  'LeBron',
  'James',
  'lebron@james.io',
  '$2b$12$2cDHtwQgH.TFm51.xixIpOf9wEZZ66IusgMK937nB/L2AxODiGMJS'
), (
  'serena',
  'Serena',
  'Williams',
  'serena@williams.io',
  '$2b$12$LA1KAGAZHzUKGkxraRoClOsZ46xnmT6YxWuyYEJg5k7Iu29.uzrLW'
);
INSERT INTO wallet (user_id)
VALUES(1);

INSERT INTO wallet (user_id, btc, eth)
VALUES(2,10000,4);

INSERT INTO wallet (user_id, btc, eth, dot)
VALUES(3,100000, 1, 5);

INSERT INTO tutorials (name, description)
VALUES('Bitcoin','2fsfdsfsd'),('ETH','ddfsdfsd'),('Generic','5sdfdsfds');

INSERT INTO completed_tutorials(user_id, tutorial_id)
VALUES(1,1), (1,2), (1,3), (2,1), (2,2),(2,3), (3,1), (3,2), (3,3);

-- UPDATE EXAMPLE
-- UPDATE completed_tutorials
-- SET completed = true
-- WHERE user_id = 1 AND tutorial_id = 1;



-- SELECT EXAMPLE
-- SELECT tutorials.name, completed_tutorials.completed, completed_tutorials.user_id  
-- FROM completed_tutorials  
-- JOIN tutorials ON completed_tutorials.tutorial_id = tutorials.id



