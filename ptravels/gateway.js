/* jshint node: true, esversion: 6 */
/* jshint ignore:start */
'use strict';
const rp = require('request-promise');
const config = require('./config');
const P = config.pnetConfig;
let container;

module.exports = {
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
            return apiResponse;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };    
    },
    testRequest: async() => {
        try {
            const options = {
                //uri: `${P.baseUrl}${methodPath}?apikey=${P.apikey}${query}`,
                uri: 'https://api.phish.net/v3/venues/all?apikey=714E5526D579DF266C5D',
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            console.log(apiResponse.response.data);
            return apiResponse.response.data;

        } catch (err) {
            console.log("inside node err catch");
            console.log(err);
        };

    },
    makeRequest: async(methodPath, ...query) => {
        try {
            const options = {
                uri: `${P.baseUrl}${methodPath}?apikey=${P.apikey}${query}`,
                //uri: 'https://api.phish.net/v3/venues/all?apikey=714E5526D579DF266C5D',
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            //console.log(apiResponse.response.data);
            return apiResponse.response.data;

        } catch (err) {
            console.log("inside node err catch");
            console.log(err);
        };

    },
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
    }
};

/* jshint ignore:end */