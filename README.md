# Spotify Search API

This is the server application for a Spotify search application. This API handles the Spotify OAuth endpoints.

## To run the program
In the project directory,

Install dependencies

#### `npm install`


You may enable development mode to see morgan logs
#### `export NODE_ENV=development"

Run the application in development mode

#### `node server.js`

This will run the application at [http://localhost:5000](http://localhost:5000/)

## Project Details

__Overview__

This application was built using Node and Express with a Spotify Web API wrapper. It's purpose is to host Spotify OAuth endpoints for a Spotify search application. A major design choice I made was to make server-side calls to the Spotify Web API instead of client-side calls. This would allow me to cache recently and commonly queried data. The caveat here is that it also adds complications to authorization. There is a bug in this program that I will go into in the next section.

__If I had more time__

I would implement a caching feature that would cache recent queries for a short period of time and hold the top spotify artists in a cache that is updated periodically with any new Spotify content.

More importantly I would fix an authorization bug that is in this program. It is an easy fix but a major security concern that would need to be addressed before deployment. Due to the way I am using the `SpotifyWebApi` instance, it does not properly authenticate users on the `/search` endpoint. Currently, the API will get an access token and set it globally on the instance. This means unauthorized users can make requests the `/search` endpoint. This is a major security hole but can be fixed easily by sending the user's access token with each request instead of using the `setAccessToken` method on the `SpotifyWebApi` instance.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).