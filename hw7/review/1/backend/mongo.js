// i use mongodb://localhost:27017/cardmongo for MONGO_URL
const WebSocket = require("ws");
require("dotenv-defaults").config();
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function connectMongo() {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });
}
const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
