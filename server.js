/* Load the HTTP library */
const http = require('http');
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

/* Create an HTTP server to handle responses */

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
}).listen(8888);

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT,
});

spotifyApi.setAccessToken(process.env.TOKEN);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
  (data) => {
    console.log('Artist albums', data.body);
  },
  (err) => {
    console.error(err);
  },
);
