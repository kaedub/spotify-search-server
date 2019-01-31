const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
} = require('./config.js');

const SpotifyWebApi = require('spotify-web-api-node')


const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});


/** 
 * Remove unused fields from the json response data received from
 * Spotify API in order to make handling data on the frontend more
 * manageable.
 * 
 * Accepts a json response for the /search route
 */


function cleanSearchResults(results, fields=['artists','albums','tracks']) {
  const data = {};
  for (let field of fields) {

    data[field] = results.body[field].items.map((item)=> {

      let itemData = {  
        id: item.id,
        name: item.name, 
        popularity: item.popularity,
      }

      if (field == 'tracks') {
        itemData = {
          ...itemData,
          artists: item.artists,
          album: item.album,
        }
      } else if (field == 'albums') {
        itemData = {
          ...itemData,
          artists: item.artists,
          image: item.images[0],
        }
      } else {
        itemData = {
          ...itemData,
          image: item.images[0],
        }
      }

      return itemData;
    });
  }
  return data;
}

module.exports = {
  spotifyApi,
  cleanSearchResults,
};