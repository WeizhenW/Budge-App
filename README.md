# Budge App
Budge is a mobile first web application that allows users to greatly reduce their wait time and make some extra money while dining out at restaurants.

Users are able to search waitlists at local restaurants, join the waitlist when they are at the restaurant, and bid and purchase the spot from other users.

Deployed versio available at: https://budge-app-2019.herokuapp.com

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in package.json).

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- Node.js
- PostrgeSQL
- Nodemon

## Database Setup
- Create a database named budge_app
- Run the queries from database.sql

## Install Dependencies
- npm install to install all the dependencies
- Create a .env file at the root of the project and include the following lines:
```REACT_APP_GOOGLE_MAPS_KEY=YOUR_OWN_API_KEY```
- Start postgres if not running already by using brew services start postgresql
- Run npm run server
- Run npm run client
- Navigate to localhost:3000

## Built with
- React (including redux) as front-end framework
- Node.js/Express for server
- PostgreSQL as database
- Semantic-UI for UI styling
- Twilio for text messaging
- Google Map API for map

## Lay of the Land
- src/ contains the React application
- public/ contains static assets for the client-side
- build/ after you build the project, contains the transpiled code from src/ and public/ that will be viewed on the production site
- server/ contains the Express App

## Authors: 

Frontend UI, server routing, and database queries:

Kyle Henderson

    https://github.com/kylethenderson

Michael Ferlis

    https://github.com/michaelferlis

Kaeti Gust

    https://github.com/KaetiG

Weizhen Wang

    https://github.com/weizhenw


Prime Academy Staff - Register, Login, and Authentication
