const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  fullLink: {
    type: String,
    required: true,
  },
  shortLink: {
    type: String,
    required: false,
    default: shortId.generate,
  },
  visits: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
