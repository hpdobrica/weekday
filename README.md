# Weekday

A small api running on node/express/serverless, in charge of determining which weekday was on a given date.

## Structure

Here is what base folder structure looks like:


```
./src/           <- holds the whole source code
./src/core/      <- holds core code which is shared by all domains
./src/domain/    <- holds business logic and integration layer with http for domains (future microservice candidates)
./src/server/    <- http specific code, api router configuration and middlewares
```

Time domain holds the main business logic, and is set up as follows:

```
.../time/handlers/       <- holds handlers, integration layer between http and business logic
.../time/controller.js   <- initializes handlers, making sure they receive their dependencies and are ready to be consumed by express
.../time/TimeService.js  <- holds business logic for the domain, totally decoupled from http layer - similar to layer 2 in 3-layer architecture
.../time/IsoDate.js      <- abstraction around Date to allow looser coupling in case other implementation is needed later (e.g. moment.js)
.../time/domainErrors.js <- holds domain-specific errors that are thrown by service layer and below
```


## Running Locally

First make sure you have serverless installed, and install it if you don't:

```
sls -v
npm i serverless -g
```

Install dependencies with:

```
npm install
```

and then run with:

```
serverless offline
```

Try the api out with:

```bash
curl --request POST 'localhost:3000/weekday' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date": "2022-08-19"
}'
```


## Unit tests

Unit tests are written in jest and can be run with

```
npm run jest
```
