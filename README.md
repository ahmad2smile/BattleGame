# Battleship Game API

## Description

API is built using NestJS, TypeORM, MySQL.

## Installation

API uses MySQL Db and an instance is expected on `localhost:3306` either a local installation of MySQL or Docker exposed would do.

for details please check `ormconfig.json`

```bash
 npm install
```

## Running the app

```bash
 # build
 npm run build

 # create DB
 npm run database:init

 # apply migrations
 npm run migration:run

 # sync database
 npm run migration:sync

# start server
 npm run start
```

## Test

```bash
# unit tests
 npm run test

# e2e test full Game Won scenario
 npm run test:e2e

```

## Stay in touch

-   Author - [Ahmad](http://shafiqahmad.com)

## License

Nest is [MIT licensed](LICENSE).
