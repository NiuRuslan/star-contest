const request = require('request');
const mongoose = require('mongoose');
const Artist = require('../models/artists');

// for (let i = 0; i <= 9; i++) {
//   const reqUrl = `https://api.spotify.com/v1/search?q=year:201${i}&type=artist&limit=50`;
//   const req2Url = `https://api.spotify.com/v1/search?q=year:201${i}&type=artist&limit=50&offset=300`;
// // 
//   request(req2Url, {
//     auth: { bearer: process.env.TOKEN },
//   }, async (error, response, body) => {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     const result = await JSON.parse(body);
//     // console.log('body:', result.artists.items);
//     mongoose
//       .connect('mongodb://localhost:27017/SpotifyGame', { useNewUrlParser: true, useUnifiedTopology: true })
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
