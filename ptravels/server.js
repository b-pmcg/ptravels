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

const http = require('http');
const finalhandler = require('finalhandler');
const Router = require('router');
const headerSettings = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:3001'
}

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
    stats: { colors: true }
}));

app.listen(port, () => {
    console.log(`Express server running on port: ${port}`);
});

// v3 Get setlist info from showid
app.get('/setlistinfo/:showid', async(req, res) => {
    res.set(headerSettings);
    let showid = req.params.showid;
    let pnetData = await gateway.getSetlistByShowId(showid);
    console.log("setlistinfo: " + pnetData);
    res.write(JSON.stringify(pnetData));
    res.end();
});

// v2 Get all shows by username
app.get('/usershows/:username', async(req, res) => {
    res.set(headerSettings);
    let username = req.params.username;
    let pnetData = await gateway.getShowsByUsername(username);
    res.write(JSON.stringify(pnetData));
    res.end();
});

// Google Geo API, get show by Venue, City, State
app.get('/geodata/:showstring', async(req, res) => {
    res.set(headerSettings);
    let showString = req.params.showstring;
    let geoData = await gateway.getGeoData(showString);
    if (!geoData) {
        console.log("Handle this error better (server.js)");
        return; // Clean this up somehow
    }
    res.write(JSON.stringify(geoData));
    res.end();
})



/*Unused right now */
// app.get('/venueshows/:venue', async(req, res) => {
//     res.set(headerSettings);
//     let venueName = req.params.venue;
//     let allVenueShows = gateway.getVenueByVenueId(venueName);
//     // get shows by venueid
//     res.write(JSON.stringify(coords));
//     res.end();
// })

//END ROUTES

//gateway.makeRequest(M.getPeopleByShowId, queryToPass);

// looks like old request still works!
//gateway.oldRequest("destiny_unhinged");

/**Think about the factories, before the industrial revolution. Only the skilled, specialized
 * workers could operate the machinery, be part of the team by crafting componentry
 * with complex equipment.
 * 
 * Later, the industrial revolution would become synonymous with the turning point
 * of american work culture, becoming far more automated, only being operated by the
 * worker class. Today's programming culture is mirroring that with the increase in
 * programming-training, bootcamps, etc.
*/