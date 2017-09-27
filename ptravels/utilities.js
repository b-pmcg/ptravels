/* jshint node: true, esversion: 6 */
/* jshint ignore:start */


module.exports = {
    getMostRecentShowString: phishnetApiResponse => {
        let venuename = phishnetApiResponse[0].venuename;
        let city = phishnetApiResponse[0].city;
        let state = phishnetApiResponse[0].state;
        let fullGeoString = `${venuename}, ${city}, ${state}`;
        return fullGeoString;
    },
    getShowString: individualShow => {
        let venuename = individualShow.venuename;
        let city = individualShow.city;
        let state = individualShow.state;
        let fullGeoString = `${venuename}, ${city}, ${state}`;
        return fullGeoString;
    },
    getShowId: phishnetApiResponse => {
        let showid = phishnetApiResponse[0].showid;
        return showid;
    },
    getCoordsFromGeoData: googleGeoResponse => {
        //console.log(googleGeoResponse.results[0]);
        let coordinates = {
            lat: googleGeoResponse.results[0].geometry.location.lat,
            lng: googleGeoResponse.results[0].geometry.location.lng
        }
        return coordinates;
    },
    getCoordsArrayFromGeoData: googleGeoResponse => {
        //console.log(googleGeoResponse.results[0]);
        let coordinates = [
            googleGeoResponse.geometry.location.lat,
            googleGeoResponse.geometry.location.lng
        ]
        return coordinates;
    }
}