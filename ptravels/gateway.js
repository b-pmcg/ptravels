/* jshint node: true, esversion: 6 */
/* jshint ignore:start */
'use strict';
const rp = require('request-promise');
const config = require('./config');
const P = config.pnetConfig;

module.exports = {
    // Phishnet APIv3
    getSetlistByShowId: async showid => {
        try {
            const options = {
                uri: `https://api.phish.net/v3/setlists/get?apikey=${P.apikey}&showid=${showid}`,
                headers: {'User-Agent': 'Request-Promise'},
                json: true
            };
            let apiResponse = await rp(options);
            console.log(`setlistid: ${apiResponse}`);
            return apiResponse;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };
    },
    getVenueByVenueId: async venueid => {
        try {
            const options = {
                uri: `https://api.phish.net/v3/venues/get?apikey=${P.apikey}&venueid=${venueid}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            return apiResponse;
        } catch (err) {
            console.log(err);
        };
    },
    // Phishnet APIv2
    getShowsByUsername: async username => {
        try {
            const options = {
                uri: `https://api.phish.net/api.js?api=2.0&method=pnet.user.myshows.get&format=json&apikey=714E5526D579DF266C5D&username=${username}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            //console.log(`getShowsByUsernameResponse: ${apiResponse}`);
            return apiResponse;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };
    },
    // Google API
    getGeoData: async showString => {
        try {
            const options = {
                uri: `https://maps.googleapis.com/maps/api/geocode/json?address=${showString}&key=AIzaSyDMgPjBslgKeL2jO0jxIiaVOKgRCM_TFNk`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            if (apiResponse.status != 'OK') {
                console.log(`Error parsing response for "${showString}": ${apiResponse.status}`);
                return;
            } 
            return apiResponse;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };    
    }
};

/* jshint ignore:end */