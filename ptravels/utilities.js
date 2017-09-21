/* jshint node: true, esversion: 6 */
/* jshint ignore:start */

module.exports = {
    getMostRecentShowString: phishnetApiResponse => {
        let venuename = phishnetApiResponse[0].venuename;
        let city = phishnetApiResponse[0].city;
        let state = phishnetApiResponse[0].state;
        let fullGeoString = `${venuename}, ${city}, ${state}`
        return fullGeoString;
    },
    getCoordsFromGeoData: googleGeoResponse => {
        //console.log(googleGeoResponse.results[0]);
        let coordinates = {
            lat: googleGeoResponse.results[0].geometry.location.lat,
            lng: googleGeoResponse.results[0].geometry.location.lng
        }
        return coordinates;
    }
}