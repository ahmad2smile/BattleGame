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

## Endpoints

New Game:

```bash
 /games (POST)

 body= {
     playerRole: "Atacker"
 }
```

Place Ship on Game (playerRole should be "Defender"):

```bash
 /place-ship (POST)

 body={
     gameId: "c12ea82a-3c87-4ec3-b977-577dc08ecbe3",
     position: 31
 }
```

Attack at Game (player Role should be "Attacker"):

```bash
 /attacks (POST)

  body={
     gameId: "c12ea82a-3c87-4ec3-b977-577dc08ecbe3",
     position: 31
 }
```

State of the Game:

```bash
 /games (GET)

 Query={
     id: "c12ea82a-3c87-4ec3-b977-577dc08ecbe3"
 }
```

## Stay in touch

-   Author - [Ahmad](http://shafiqahmad.com)

## License

Nest is [MIT licensed](LICENSE).
