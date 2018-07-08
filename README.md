[![Build Status](https://travis-ci.org/Orlayhemmy/EventManager.svg?branch=develop)](https://travis-ci.org/Orlayhemmy/EventManager)
[![Coverage Status](https://coveralls.io/repos/github/Orlayhemmy/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/Orlayhemmy/EventManager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f106ed897dd8b4e5607c/maintainability)](https://codeclimate.com/github/Orlayhemmy/EventManager/maintainability)


# EventManager
Events Manager is a web app that helps to manage event centers. 

# Table of Contents
Relevant stacks and technologies
Installation
Running Test
Features
Limitations
API Endpoints
How to Contribute
Contact the Author

##  Relevant Stacks and Technologies
Node.js
PostgreSQL
Sequelize
ReactJS
Redux

## Installation
To get this project up and running on your local machinne, simply follow the steps written below

1. Install node

2. Install postgresql database and postico for a physical representation of the database

3. Open a terminal window and clone this repository

$ git clone https://github.com/Orlayhemmy/EventManager.git

4. Type cd EventManager to navigate into the cloned repository

$ cd EventManager

5. To Install dependencies

$ npm install

6. Open the postico you downloaded and create a database with a name of your choice

7. Create a .env file in the project root directory and add variables and keys as described in .env.example

8. Install sequelize-cli for running the database migrations

$ npm install -g seqeulize-cli  

9. You can use the seed in the seeder file to launch off your application with data

$ npm run migrate

10. Start the application

$ npm start

11. In a browser, navigate to localhost:3000

## Running the tests
To run the tests written for this application.

$ npm test       // backend tests
$ npm run client:test       //frontend tests

## Features
Features made for admins are
Adding centers
Editing centers
Approving and disapproving events booked by users
Boek a center like a user
Modify a personal event
Personalized profile

Features made for users are
Adding Events
Editing Events
Personalized profile page

General Features
* Recovery of password in scenarios where password is forgotten
* Tour for users and guests to get them acquainted with its usage
* Booking of center for recurring events
* Easy to use admin dashboard
* In app and email notifications for users and admin when an event is booked cancelled.
* About us page

## Limitation
The limitation of this application is that it does not include a payment system yet.


## API documentation
See documentation here https://ecenter-eventmanager.herokuapp.com/api-docs

## How to contribute
NB: contributions are very much welcome, please see the contibuting.md file on how to contribute

## Licensce
This project is licensed under the MIT License - see the [`LICENSE.md`] file for details

## Contact the Author
Google
LinkedIn