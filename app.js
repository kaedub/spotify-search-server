const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const {
  spotifyApi,
  cleanSearchResults,
} = require('./spotifyAPI');

const authRouter = require('./auth');



// add logging system
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(cors());
app.use(authRouter);

/********************** */
/**    Search Route    */

app.get('/search', async function (req, res, next) {
  try {
    let { query } = req.query;
        
    let results = await spotifyApi.search(query, ['artist','album','track']);

    let data = cleanSearchResults(results);
    
    return res.json({data});
  } catch (error) {
    error.status = error.status || error.statusCode;
    return next(error);
  }
});


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
