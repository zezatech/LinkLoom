const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("../models/shortUrl");
const app = express();
const serverless = require("serverless-http");
require("dotenv").config();
const router = express.Router();
const DbUrl = process.env.MongoDBUrl;
const cors = require("cors");
mongoose
  .connect(DbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const result = await ShortUrl.findOne({ shortLink: req.params.shortUrl });
    if (!result) return res.sendStatus(404);
    result.visits++;
    await result.save();
    res.json({ result });
  } catch (err) {
    console.error("Error in GET /:shortUrl:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/shortUrl", async (req, res) => {
  try {
    const { fullLink } = req.body;
    if (!fullLink) {
      return res.status(400).json({ message: "fullLink is required" });
    }

    const existingShortUrl = await ShortUrl.findOne({ fullLink });
    if (existingShortUrl) {
      return res.json({ result: existingShortUrl });
    }

    const result = await ShortUrl.create({ fullLink });
    res.json({ result });
  } catch (err) {
    console.error("Error in POST /shortUrl:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports.handler = serverless(app);
