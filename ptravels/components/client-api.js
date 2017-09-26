const utilities = require('../utilities');
const rp = require('request-promise');
/*This is supposed to be the workhorse to keep ptravels-map clean*/

export default class ClientApi {
    constructor(props) {
        this.getCoordsForSingleShow = this.getCoordsForSingleShow.bind(this);
    }

    getCoordsForSingleShow = async (username) => {
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
            let showid = utilities.getShowId(apiResponse);

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
        
        /* Old data, but keep for reference */
        // await fetch(`/usershows/${username}`)
        // .then(response => {
        //     if (response.status !== 200) {
        //         console.log('Looks like there was a problem with /usershows/' + username + '/ Status Code: ' + response.status);
        //         return;
        //     }
        //     return response.json(); 
        // })
        // /* Get first user show, stringify it for geodata and fetch*/
        // .then(data => {
        //     console.log(data);
        //     var showString = utilities.getMostRecentShowString(data);
        //     console.log(`showstring: ${showString}`)
        //     return fetch(`/geodata/${showString}`)
        // })
        // .then(response => {
        //     if (response.status !== 200) {
        //         console.log('Looks like there was a problem with /geodata. Status Code: ' + response.status);
        //         return;
        //     }
        //     return response.json(); 
        // })
        // /* Extract coords from geodata and return to caller */
        // .then(data => {
        //     let self = this;
        //     // this works:
        //     console.dir("new data " + (typeof data));
        //     //
        //     console.log("Coords: " + data.results[0].geometry.location.lat + data.results[0].geometry.location.lng);
        //     //return data.json();
        //     let lat = data.results[0].geometry.location.lat;
        //     let lng = data.results[0].geometry.location.lng;
        //     var coords = utilities.getCoordsFromGeoData(data);
        //     console.log("real cords: " + coords)
        //     this.setState({lat: coords.lat, lng: coords.lng});

        //     //coords = correct data, why won't it return properly?.
        //     let str = ["IM A STRING"];
        //     return str;
        // })
        // .catch(err => console.log('Fetch Error: ', err)) //is this error handling implemented correctly?
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
