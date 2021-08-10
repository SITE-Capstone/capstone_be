# KuriosBE API Documentation

BASEURL: https://kuriosbe.herokuapp.com

## Project Overview


Planning Repository: https://github.com/SITE-Capstone/capstone_plan

Frontend Repository: https://github.com/SITE-Capstone/capstone_fe 

Deployment Website: **Add Link to Deployed Project**

General

CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /         | Ping Health Check 

Authentication

CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /auth/me       | Get User Data
POST     | /auth/login    | Logs User In & fetches Data & Token
POST     | /auth/register | Registers a new User Account & logs in

Tutorials
CRUD     |      URL  | DESCRIPTION
-----    |-----     |-------------|

Wallet
CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /wallet       | Get User Wallet Data
PUT      | /wallet/exchange | Exchanges Currencies & Edits Wallet
GET      | /wallet/transactions | Gets all Purchases by coin_id
GET      | /wallet/alltransactions | Gets all Transactions by coin_id
PUT      | /wallet/reset | Resets user wallet back to default
PUT      | /wallet/custom | Reset user wallet with a custom starting value

Prices
CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /price/    |Fetches All Current Prices
GET      | /price/current   | Fetches current price by coin_id
GET      | /price/hourly    | Fetches Hourly price data in minutes by coin_id
GET      | /price/weekly    | Fetches Weekly price data in Hours by coin_id
GET      | /price/yearly    | Fetches Yearly price data in days by coin_id

Statistics 
CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /statistics         | Fetches Every Coin Statistic
GET      | /statistics/coin    | Fetches Coin Statistics By Coin

News 
CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /news         | Fetches Every News Article
GET      | /news/coin    | Fetches News Articles By Coin






