# KuriosBE API Documentation

BASEURL: https://kuriosbe.herokuapp.com

## Project Overview


Planning Repository: https://github.com/SITE-Capstone/capstone_plan

Frontend Repository: https://github.com/SITE-Capstone/capstone_fe 

Deployment Website: **Add Link to Deployed Project**

CRUD     |      URL  | DESCRIPTION
-----    |-----     |-------------|

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

Wallet
CRUD     |      URL  | DESCRIPTION
---------|-----------|-------------
GET      | /wallet/       | Get User Wallet Data
PUT      | /wallet/exchange | Exchanges Currencies & Edits Wallet
GET      | /wallet/transactions | Gets all Purchases by coin_id
GET      | /wallet/alltransactions | Gets all Transactions by coin_id
PUT      | /wallet/reset | Resets user wallet back to default
PUT      | /wallet/custom | Reset user wallet with a custom starting value




