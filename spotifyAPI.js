const axios = require('axios');
const { SPOTIFY_BASE_URL } = require('../config');
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

class SpotifyAPI {
  static async request(endpoint, params = {}, verb = 'get') {
    let q;
    if (verb === 'get') {
      q = axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, { params: { ...params } });
    }

    try {
      let data = (await q).data;
      return data;
    } catch (err) {
      /** handle any and all error messages that may arise */
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** search Spotify API */
  static async search(queries) {
    
    const res = await this.request(`/`, {queries});
    return res;
  }
}

module.exports = SpotifyAPI;
