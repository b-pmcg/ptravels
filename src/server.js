/* jshint node: true, esversion: 6 */
"use strict";
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require("./webpack.config.babel.js");
const compiler = webpack(config);
const port = 3000;

const http = require("http");
const finalhandler = require("finalhandler");
const Router = require("router");
const headerSettings = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "*/*",
  //'Access-Control-Allow-Origin': 'http://159.65.75.193/', //was 3001?
  "Access-Control-Allow-Origin": "http://phluffstravels.com",
  "Access-Control-Allow-Origin": "http://www.phluffstravels.com",
  //'Access-Control-Allow-Origin': 'https://159.65.75.193/',
  "Access-Control-Allow-Origin": "https://phluffstravels.com",
  "Access-Control-Allow-Origin": "https://www.phluffstravels.com"
  //'Access-Control-Allow-Origin': 'http://www.philbain.com',
};

const creds = require("./config");
const M = creds.pnetConfig.methods;
const gateway = require("./gateway");
const utilities = require("./utilities");

// Query composer, a WIP:
let container;
const venueid = 100;
let showid = 1253142331;
let name = "Trey Anastasio";

function queryComposer(name, value) {
  this.name = name;
  this.value = value;
  this.queryString = `&${name}=${value}`;
}

const queryToPass = [];

// Webpack (dev only)
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  })
);

app.listen(port, () => {
  console.log(`Express server running on port: ${port}`);
});

// Pnet v3 Get setlist info from showid
app.get("/setlistinfo/:showid", async (req, res) => {
  res.set(headerSettings);
  let showid = req.params.showid;
  let pnetData = await gateway.getSetlistByShowId(showid);
  console.log("setlistinfo: " + pnetData);
  res.write(JSON.stringify(pnetData));
  res.end();
});

// Pnet v2 Get all shows by username
app.get("/usershows/:username", async (req, res) => {
  res.set(headerSettings);
  let username = req.params.username;
  let pnetData = await gateway.getShowsByUsername(username);
  res.write(JSON.stringify(pnetData));
  res.end();
});

// Phish.in API, get show info by show date
app.get("/phishin/shows/:showdate", async (req, res) => {
  res.set(headerSettings);
  let showDate = req.params.showdate;
  console.log("phishin usa!" + showDate);
  let showDateData = await gateway.getMp3ShowInfoByShowDate(showDate);
  if (!showDateData) {
    console.log("Handle this error better (server.js)");
    return; // Clean this up somehow
  }
  res.write(JSON.stringify(showDateData));
  res.end();
});

// Google Geo API, get show by Venue, City, State
app.get("/geodata/:showstring", async (req, res) => {
  res.set(headerSettings);
  let showString = req.params.showstring;
  let geoData = await gateway.getGeoData(showString);
  if (!geoData) {
    console.log("Handle this error better (server.js)");
    return; // Clean this up somehow
  }
  res.write(JSON.stringify(geoData));
  res.end();
});
