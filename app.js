const express = require('express');
const app = express();
const cors = require('cors');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require('./config.js');
const router = new express.Router();
const SpotifyWebApi = require('spotify-web-api-node')


// add logging system
if (process.env.NODE_ENV === 'development' ) {
    const morgan = require('morgan');
    app.use(morgan('tiny'));
}

app.use(express.json());
app.use(cors());

var spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
  });



// Search artists whose name contains 'Love'
spotifyApi.searchArtists('Love')
  .then(function(data) {
    console.log('Search artists by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });

// Search tracks whose artist's name contains 'Love'
spotifyApi.searchTracks('artist:Love')
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

// Search tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'
spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
  .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });


router.get('/', async function (req, res, next) {
    try {
        let q = req.query;
        console.log(q)
        return res.json("results");
    } catch (error) {
        return next(error);
    }
});

app.get('/login', function(req, res) {
  console.log('login');
  let scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
      'response_type=code&' +
      `client_id=${CLIENT_ID}&` +
      `scope=${scope}&` +
      `redirect_uri=http://localhost:5000/authorize`
  );
});

router.get('/authorize', function(req, res) {
    console.log('auth');
    console.log(req)
    return res.json('Authorize');
})

app.use(router);


/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;

  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
