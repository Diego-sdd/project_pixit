<p align="center">
  <a href="#-getting-started">Getting started</a>
</p>

</br>

## Prerequisites
1 - Node (https://nodejs.org)
2 - Yarn (https://classic.yarnpkg.com/en/) or Npm (https://classic.yarnpkg.com/en/)
3 - Mysql (https://www.mysql.com/)

## Technologies
```bash
1 - Node;
3 - Express;
2 - Mysql;
4 - Knex;
```
## 💻 Getting started

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env' and set with YOUR environment variables.
$ cp .env.example .env

# Before run the api, run the migrations

#create MySQL database
$ cd src/database
$ knex migrate:latest

# To finish, run the api service
$ yarn dev
```

---
