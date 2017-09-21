/* jshint node: true, esversion: 6 */
'use strict';
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.babel.js');
const compiler = webpack(config);
const port = 3000;

var http = require('http');
var finalhandler = require('finalhandler');
var Router = require('router');

const creds = require('./config');
const M = creds.pnetConfig.methods;
const gateway = require('./gateway');
const utilities = require('./utilities');

// Dummy data:
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
 
// Webpack
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
  }));

app.listen(port, function () {
    console.log(`Express server running on port: ${port}`);
  });

// Routes --Move this out!--  
// app.get('/makerequest', async function (req, res) {
// res.setHeader('Content-Type', 'application/json; charset=utf-8');
// queryToPass.push(new queryComposer("showid", showid).queryString);
// var pdata =  await gateway.testRequest(M.getAllVenues, queryToPass);
// console.log(pdata);
// res.write(JSON.stringify(pdata));
// res.end();
// });

app.get('/usershows/:username', async function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  let username = req.params.username;
  console.log("server got this username: " + username);
  let pnetData =  await gateway.getShowsByUsername(username);
  let showString = utilities.getMostRecentShowString(pnetData);
  let geoData = await gateway.getGeoData(showString);
  let coords = utilities.getCoordsFromGeoData(geoData);
  console.log("coords sendingback these coords:" + coords);
  //res.json({ message: 'hello' });
  res.write(JSON.stringify(coords));
  res.end();
})
  
  //END ROUTES

//gateway.makeRequest(M.getPeopleByShowId, queryToPass);

// looks like old request still works!
//gateway.oldRequest("destiny_unhinged");