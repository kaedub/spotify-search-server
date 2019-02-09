const express = require('express');
const router = new express.Router();

const { spotifyApi } = require('./spotifyAPI');

const { CLIENT_URI } = require('./config.js');

/** SPOTIFY AUTH 
 *  
 * If I had more time I would like to explore ideas for 
 * better error handling during the authorization process.
 */

router.get('/login', async function (req, res, next) {
  try {
    // Create the authorization URL
    const scopes = ['user-read-private', 'user-read-email'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

    // Redirect user to Spotify authorize URL
    return res.redirect(authorizeURL);
  } catch (error) {
    return next(error);
  }
});

router.get('/authorize', async function (req, res, next) {
  try {

    let { code } = req.query;

    let authData = await spotifyApi.authorizationCodeGrant(code);

    // Set the access token on the API object
    spotifyApi.setAccessToken(authData.body['access_token']);
    spotifyApi.setRefreshToken(authData.body['refresh_token']);

    // Build query string
    let query = ''
    for (let param in authData.body) {
      query += `${param}=${authData.body[param]}&`;
    }
    

    /** Not really sure what to do here */
    return res.redirect(`${CLIENT_URI}?${query}`)
  } catch (error) {
    return next(error);
  }
})

module.exports = router;