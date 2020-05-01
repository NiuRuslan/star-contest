const router = require('express').Router();
const request = require('request-promise');

const mongoose = require('mongoose');
const Artist = require('../models/artists');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-bajz8.mongodb.net/starcontestNew?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

async function getPreview(name) {
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    qs: { q: `artist:"${name}"` },
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'deaa3b41demshe62baacf17b1f37p12378bjsn88fe297726f5',
    },
  };
  const info = await request(options);
  const json = await JSON.parse(info);
  return json.data[0].preview;
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function newArtist(data) {
  const artist = data[getRandom(data.length)];
  artist.preview = await getPreview(artist.name);
  artist.image = artist.images[1].url;
  return artist;
}

function mostPopular(artists) {
  if (artists[0].popularity > artists[1].popularity) {
    return artists[0];
  }
  return artists[1];
}

async function newRound(data, req) {
  const artist1 = await newArtist(data);
  const artist2 = await newArtist(data);
  if (artist1.popularity === artist2.popularity) {
    return newRound(data);
  }
  const popArtist = mostPopular([artist1, artist2], data);
  req.app.locals.artist1 = artist1;
  req.app.locals.artist2 = artist2;
  req.app.locals.popArtist = popArtist;

  return [artist1, artist2, popArtist];
}

router.get('/', async (req, res) => {
  req.app.locals.points = 0;
  const data = req.app.locals.data || (await Artist.find());
  req.app.locals.data = data;
  await newRound(data, req);
  res.render('index');
});

router.post('/', async (req, res) => {
  let { points } = req.app.locals;
  const { data, popArtist } = req.app.locals;
  const artistName = req.body.name;
  if (artistName === popArtist.name) {
    points += 1;
    const game = await newRound(data, req);
    const artist1 = { name: game[0].name, image: game[0].image, preview: game[0].preview };
    const artist2 = { name: game[1].name, image: game[1].image, preview: game[1].preview };
    req.app.locals.points = points;
    res.json([artist1, artist2, points]);
  } else {
    req.app.locals.popstar = popArtist.name;
    req.app.locals.followers = popArtist.followers[0].total;
    req.app.locals.photo = popArtist.image;
    req.app.locals.preview = popArtist.preview;
    res.send({ gameover: true, points });
  }
});

router.get('/gameover', (req, res) => {
  res.render('gameover');
});

module.exports = router;
