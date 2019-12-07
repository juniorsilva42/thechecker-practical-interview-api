# Teste prático TheChecker

#### :football: A microservice to get e-mails from list' MailChimp and verify with TheChecker API

Candidato: Ivanicio Jr   
E-mail: [jsiilva@outlook.com.br]  (mailto:jsiilva@outlook.com.br)
Phone: +55 89 994112266  
[Linkedin](https://www.linkedin.com/in/jsilva49/) - [Github](https://github.com/jsiilva1/)

## Table of Contents
-  [Technology](#technology)
-  [Developing](#developing)
-  [First Install](#first-install)
-  [Running tests](#running-tests)
-  [Installing new dependencies](#installing-new-dependencies)

## Technology
Here's a brief overview of technology stack:
-  **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
-  **[Mongo](https://www.mongodb.com/)** as to store our data and **[Mongoose](https://mongoosejs.com/)** as a Node.js ORM.
-  **[Ava](https://github.com/avajs/ava)** as a test runner and **[Chai](http://chaijs.com)** to do some more advanced test assertions.
-  **[Express](https://github.com/expressjs/express)** as a tool to build the web server that handles our boleto endpoints.
-  **[Nodemon](https://nodemon.io/)** as a tool to use for development file reload.
 -  **[CORS](https://www.npmjs.com/package/cors)** a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
 - **[Body-parser](https://www.npmjs.com/package/body-parser)** - Node.js body parsing middleware;
 -  **[Compression](https://www.npmjs.com/package/compression)** - Node.js compression middleware
 -  **[HTTP-Status](https://www.npmjs.com/package/http-status)** - Utility to interact with HTTP status code
 -  **[Ramda](https://www.npmjs.com/package/ramda)** -  A practical functional library for JavaScript programmers
 -  **[Winston](https://www.npmjs.com/package/winston)** -  A multi-transport async logging library

A brief overview of the project file structure
```
├── src
   ├── bin (get bootstrap config and dispatch server)
   ├── config (config metadata of api)
   ├── functions (contain function for api base)
   ├── lib (middle layer: contain functions to handle with the most diverse challenges that goes through the API)
     ├── bootstrap (bootstrap app)
     ├── errors (functions to handle with errors)
     ├── http (functions to handle with http requests and responses)
     ├── services (functions to handle with vendor apis)
   ├── resources (plays the role of controllers)
     ├── foo-resource (each resource contain functions to handle with each endpoint call and besides skema skeleton of responses and requests)
   ├── server (takes care of start of server)
     ├── index.js (dispatch server)
     ├── router.js (dispatch routes )
     ├── shutdown.js (takes care of errors signal on process)
├── scripts (app scripts)
├── tests (app tests)
├── package.json
├── README.md (you're here)
```
## Developing 
In order to develop for this project you must choose among [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed or NPM Scripts

### First Install with NPM
If you never developed in this repo before:

1.  **Clone the repository:**

```sh

$ git clone git@github.com:jsiilva1/thechecker-practical-test

```
2.  **Install Dependencies**

```sh

$ yarn or npm install

```

### Running the server

1.  **Start development server (with nodemon):**

```sh

$ yarn dev

```
### Running tests

  Tests are separate in `integration` and `unit`. You can either run them separately or run them all.

-  **Run all tests:**

```sh

$ yarn test

```
-  **Run only `integration` tests:**

```sh

$ yarn test-integration

``` 
-  **Run only `unit` tests:**

```sh

$ yarn test-unit

```