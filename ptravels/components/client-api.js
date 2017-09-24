const utilities = require('../utilities');
/*This is a container component that combines the
Map component and single-input.js and is imported in app.js*/

export default class ClientApi {
    constructor() {
    }

    getCoordsFirstShow = async (username) => {
        //let self = this; // <-- How to avoid?
        /*Fetch all shows by submitted username */
        await fetch(`/usershows/${username}`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem with /usershows. Status Code: ' + response.status);
                return;
            }
            return response.json(); 
        })
        /* Get first user show, stringify it for geodata and fetch*/
        .then(data => {
            console.log(data);
            var showString = utilities.getMostRecentShowString(data);
            console.log(`showstring: ${showString}`)
            return fetch(`/geodata/${showString}`)
        })
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem with /geodata. Status Code: ' + response.status);
                return;
            }
            return response.json(); 
        })
        /* Extract coords from geodata and return to caller */
        .then(data => {
            // this works:
            console.dir("new data " + (typeof data));
            //
            console.log("Coords: " + data.results[0].geometry.location.lat + data.results[0].geometry.location.lng);
            //return data.json();
            let lat = data.results[0].geometry.location.lat;
            let lng = data.results[0].geometry.location.lng;
            var coords = utilities.getCoordsFromGeoData(data);

            //coords = correct data, why won't it return properly?.
            let str = "IM A STRING";
            return str;
        })
        .catch(err => console.log('Fetch Error: ', err)) //is this error handling implemented correctly?
    }
}
