-- SEED File
-- Create mock users
-- Create mock listings

INSERT INTO tutorials (name, description, color)
VALUES('Beginner’s Guide', 'Learn the basics of cryptocurrencies', 'linear-gradient(247.96deg, #203ED6 0%, #0F0B38 94.96%)
'),
      ('General Information','Background information on cryptocurrencies', 'linear-gradient(248.51deg, #F50062 9.52%, #0F0B38 107.13%)'),
      ('Investing Guide', 'Learn about trading and how to time investments', 'linear-gradient(243.19deg, #A9AC11 -4.06%, #0F0B38 99.5%)'),
      ('BTC', 'Learn about Bitcoin the worlds first cryptocurrency', 'linear-gradient(244.8deg, #604392 5.75%, #0F0B38 96.35%)
'),
      ('ETH', 'Learn about Ethereum and decentralization', 'linear-gradient(246.46deg, #6162D6 0%, #0F0B38 98.1%)
'),
      ('ADA','Learn about Cardano and the basics of staking', 'linear-gradient(249.8deg, #439284 0%, #0F0B38 94.03%)
'),
      ('DOGE', 'Learn about Dogecoin and risk assessment', 'linear-gradient(248.41deg, #EB8338 0%, #0F0B38 104.37%)
'),
      ('DOT', 'Learn about Polkadot and blockchain', 'linear-gradient(248.6deg, #92438A 0%, #0F0B38 94.85%)
'),
      ('XMR', 'Learn about Monero and anonymity', 'linear-gradient(248.93deg, #D66168 1.39%, #0F0B38 95.91%)
');

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




    --   (“Beginner’s Guide”, “Learn the basics of cryptocurrencies”)
    --   (“General”,“Background information on cryptocurrencies”),
    --   (“ADA”, “Learn about trading and how to time investments”),
    --   (“BTC”, “Learn about Bitcoin the worlds first cryptocurrency”),
    --   (“ETH”, “Learn about Ethereum and decentralization”),
    -- (“ADA”,“Learn about Cardano and the basics of staking”),
    -- (“DOGE”, “Learn about Dogecoin and risk assessment”),
    -- (“DOT”, “Learn about Polkadot and blockchain”),
    -- (“XMR”, “Learn about Monero and anonymity”);