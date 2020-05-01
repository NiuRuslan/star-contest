const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  followers: Array,
  images: Array,
  preview: String,
}, {
  versionKey: false,
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

module.exports = mongoose.model('Artist', ArtistSchema);
