# LAB - Class 09

## Project:Server basic-api-server

### Author: Elias Staehle

### Problem Domain

create a rest auth server that allows a user to create various food and dessert items and allow them to view what users have created.

### Links and Resources

- [ci/cd](https://github.com/EDStaehle/class-09-lab/actions) (GitHub Actions)
- [prod development](postgres://eliasstaehle_user:RXgpZrgEXdvXlVg4FgUeRqZD5NaU2bzL@dpg-ce42fk6n6mpku7k0j3rg-a.ohio-postgres.render.com/eliasstaehle)

### Setup

#### `.env` requirements (where applicable)

see `.env.sample`


- `PORT` - Port Number


#### How to initialize/run your application (where applicable)

- nodemon

#### Features / Routes

- Feature One: deploy to dev
- GET : `` - specific route to hit
- GET : `/bad` -  specific route to hit
- Feature One: deploy to prod
- POST : `/signup` - specific route to hit
- POST : `/signin` - specific route to hit
- POST : `/api/v1/food` - specific route to hit
- POST : `/api/v1/dessert` - specific route to hit
- GET : `userswithfood` - specific route to hit
- GET : `userswithdesserts` - specific route to hit

#### Tests

- npm test
-
- handles root path
- handles invalid requests
- handles errors
- handles crud operation for both /games and /cars

#### UML

![UML](./src/assets/class-03-uml.png)
