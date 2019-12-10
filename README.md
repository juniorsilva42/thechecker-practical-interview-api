## Practical Test TheChecker :heavy_check_mark:

#### :heavy_check_mark: :email: A microservice that gets a mailing list from mailchimp and checks it in TheChecker api

Candidato: Ivanicio Jr   
E-mail: jsiilva@outlook.com.br   
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
-  **[Express](https://github.com/expressjs/express)** as a tool to build the web server that handles our boleto endpoints.
-  **[Mongo](https://www.mongodb.com/)** as to store our data and **[Mongoose](https://mongoosejs.com/)** as a Node.js ORM.
-  **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** as useful option to create development environment.
-  **[Ava](https://github.com/avajs/ava)** as a test runner and **[Chai](http://chaijs.com)** to do some more advanced test assertions.
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

### Install and run with NPM
If you never developed in this repo before:

1.  **Clone the repository:**

```sh

$ git clone git@github.com:jsiilva1/thechecker-practical-test

```
2.  **Install Dependencies**

```sh

$ yarn or npm install

```

1.  **Start development live server**

```sh

$ yarn dev

```

## Or you can too
### Install and run with Docker
```sh

$ git clone git@github.com:jsiilva1/thechecker-practical-test

```
2.  **Orchestrate the images**

```sh

$ docker-compose up

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
## Data Flow
#### 1. POST /mailchimp/authorize

Start the flow of Oauth Login to Mailchimp.

Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, Lorem Ipsum dor, 

1. The `Client` makes an HTTP request to Oauth login  .
1. OAuth authentication type is through code, so get `code` in the request body.
2. Try login through a request to Mailchimp API with the required Oauth data to finalize authentication
3. In success case, return the response to the `Client` with access_token data (HTTP response).

![mailchhimp-auth-diagram](https://raw.githubusercontent.com/jsiilva1/thechecker-practical-interview-api/master/docs/diagrams/POST-mailchimp-authorize.png?token=ADHLA2UMD45URZ2OVRVMORC57A2UK)