const router = require('express').Router();
const request = require('request');

const mongoose = require('mongoose');
const Artist = require('../models/artists');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-bajz8.mongodb.net/starcontestNew?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function mostPopular(artists, data) {
  if (artists[0].popularity === artists[1].popularity) {
    artists[0] = newArtist(data);
    return mostPopular(artists, data);
  } else if (artists[0].popularity > artists[1].popularity) {
    return artists[0];
  } else {
    return artists[1];
  }
}

function newArtist(data) {
  const artist = data[getRandom(data.length)];
  artist.image = artist.images[1].url;
  return artist;
}

function newRound(data) {
  const artist1 = newArtist(data);
  const artist2 = newArtist(data);
  const popArtist = mostPopular([artist1, artist2], data);
  return [artist1, artist2, popArtist];
}


router.get('/', async (req, res, next) => {
  request(process.env.NASAURL, async (error, response, body) => {
    const result = await JSON.parse(body);
    req.app.locals.background = result.hdurl;
  });

  req.app.locals.points = 0;

  const data = req.app.locals.data || await Artist.find();
  req.app.locals.data = data;

  const game = newRound(data);
  req.app.locals.artist1 = game[0];
  req.app.locals.artist2 = game[1];
  req.app.locals.popArtist = game[2];
  res.render('index');
});

router.post('/', (req, res, next) => {
  let { points, popArtist } = req.app.locals;
  const { data } = req.app.locals;

  const artistName = req.body.name;
  console.log(artistName);
  if (artistName === popArtist.name) {
    points += 1;
    const game = newRound(data);
    req.app.locals.artist1 = game[0];
    req.app.locals.artist2 = game[1];
    req.app.locals.popArtist = game[2];
    req.app.locals.points = points;
    res.json([game[0], game[1], points]);
  } else {
    req.app.locals.popstar = popArtist.name;
    req.app.locals.followers = popArtist.followers[0].total;
    req.app.locals.photo = popArtist.images[2].url;
    res.send({ gameover: true, points });
  }
});

router.get('/gameover', (req, res, next) => {
  console.log(req.app.locals.points);
  res.render('gameover');
});

reqUrl = 'https://api.spotify.com/v1/search?q=year:2011&type=artist&limit=50';
// // req2Url = 'https://api.spotify.com/v1/search?q=year:2019&type=artist&limit=50%offset=50'

// request(reqUrl, {
//   auth: {'bearer': process.env.TOKEN
// }}, async (error, response, body) => {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     let result = await JSON.parse(body);
//     console.log('body:', result.artists.items); // Print the HTML for the Google homepage.
//   });


// for (let i = 0; i <= 9; i++) {
//   // const reqUrl = `https://api.spotify.com/v1/search?q=%20genre:%22modern%20rock%22&year:201${i}&type=artist&limit=50&offset=50`;
//   const reqUrl = `https://api.spotify.com/v1/search?q=year:201${i}&type=artist&limit=50`;
//   request(reqUrl, {
//     auth: { bearer: process.env.TOKEN },
//   }, async (error, response, body) => {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     const result = await JSON.parse(body);
//     // console.log('body:', result.artists.items);
//     mongoose
//       .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-bajz8.mongodb.net/starcontestNew?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//       .then(async () => {
//         await Artist.insertMany(result.artists.items, { ordered: false })
//           .then(() => {
//             mongoose.connection.close(() => {
//               console.log('Insert complete. Connection is close.');
//             });
//           }).catch(e => e);
//       });
//   });
// }

// const SpotifyWebApi = require('spotify-web-api-node');

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   redirectUri: process.env.REDIRECT,
// });

// spotifyApi.setAccessToken(process.env.TOKEN);

// spotifyApi.searchArtists('Love')
//   .then((data) => {
//     console.log('Search artists by "Love"', data.body.artists.items);
//   }, (err) => {
//     console.error(err);
//   });
//
/* GET home page. */

// request('http://www.google.com', (error, response, body) => {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


module.exports = router;
