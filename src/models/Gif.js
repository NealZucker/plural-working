import mongoose from "mongoose";

let GifSchema = new mongoose.Schema({
  name: {
    type: String
  },

  description: {
    type: String
  },

  url: {
    type: String
  }
});

module.exports = mongoose.model('Gif', GifSchema);
