const utilities = require('../utilities');
const rp = require('request-promise');
/*This is supposed to be the workhorse to keep ptravels-map clean*/

export default class ClientApi {
    constructor(props) {
        this.getCoordsForSingleShow = this.getCoordsForSingleShow.bind(this);
    }

    getCoordsForSingleShow = async(username) => {
        /* Super messy, but finally works. */
        try {
            const options = {
                uri: `http://localhost:3000/usershows/${username}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            // Get all shows by user:
            let apiResponse = await rp(options);
            // Get most recent show & turn it into an address string for geolookup:
            let showString = utilities.getMostRecentShowString(apiResponse);
            // Get showid
            let showid = utilities.getShowIdForLatest(apiResponse);

            const options2 = {
                uri: `http://localhost:3000/geodata/${showString}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            // Pass address string to geolookup:
            var geodata = await rp(options2)
                // Parse results and extract lat/lng into coords object
            var returnObj = utilities.getCoordsFromGeoData(geodata);
            returnObj.showid = showid;
            return returnObj;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };
    }

    getCoordsForAllShowsByUser = async(username) => {
        console.log(username);
        let markers = [];
        let returnObj = {showid: []};
        try {
            const options = {
                uri: `http://localhost:3000/usershows/${username}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            // Get all shows by user:
            let apiResponse = await rp(options);
            // Get the showid to return to ptravels
            let showid = utilities.getShowId(apiResponse);
            // Loop through each show & turn it into an address string for geolookup:
            for (let individualShow of apiResponse) {
                let showString = utilities.getShowString(individualShow);
                let showid = utilities.getShowId(individualShow);
                returnObj.showid.push(showid);

                const options2 = {
                    uri: `http://localhost:3000/geodata/${showString}`,
                    headers: {
                        'User-Agent': 'Request-Promise'
                    },
                    json: true
                };
                // Pass address string to geolookup:
                var geodata = await rp(options2);
                //console.log("geodata " + geodata.results);
                for (let address of geodata.results) {
                    //console.log("address" + address);
                    // Parse results and extract lat/lng into coords object
                    var latLongsArray = utilities.getCoordsArrayFromGeoData(address);
                    //console.log(latLongsArray);
                    markers.push(latLongsArray);
                }
            }

            console.log(markers.length);
            returnObj.markers = markers;
            return returnObj;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };
    }

    getSetlistInfoForSingleShow = async showid => {
        try {
            console.log("I'm client API, showId is : " + showid)
            const options = {
                uri: `http://localhost:3000/setlistinfo/${showid}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            console.log(apiResponse);
            return apiResponse;
        } catch (err) {
            console.log("insidecatch");
            console.log(err);
        };
    }
}