const utilities = require('../utilities');
const rp = require('request-promise');
/*This is supposed to be the workhorse to keep ptravels-map clean*/

export default class ClientApi {
    constructor(props) {
        this.getCoordsFirstShow = this.getCoordsFirstShow.bind(this);
    }

    getCoordsFirstShow = async (username) => {
        /* Super messy, but finally works. */
        try {
            var self = this;
            const options = {
                uri: `http://localhost:3000/usershows/${username}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            let apiResponse = await rp(options);
            var showString = utilities.getMostRecentShowString(apiResponse);
            const options2 = {
                uri: `http://localhost:3000/geodata/${showString}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            var geodata = await rp(options2)
            var coords = utilities.getCoordsFromGeoData(geodata);
            return coords;
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
}
