const utilities = require("../utilities");
const rp = require("request-promise");
const localHost = "https://localhost:3000/";
const webServer = "https://phluffstravels.com/";
const devServer = "http://philbain.com/";
const rootServer = "/";
const server = webServer;
/*This is supposed to be the workhorse to keep ptravels-map clean*/

export default class ClientApi {
  constructor(props) {
    this.getCoordsForSingleShow = this.getCoordsForSingleShow.bind(this);
  }
  getAllUserDataFromPhishnet = async username => {
    try {
      const options = {
        uri: `${server}usershows/${username}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      // Get all shows by user:
      let apiResponse = await rp(options);
      return apiResponse;
    } catch (err) {
      console.log(err);
    }
  };

  getCoordsForSingleShow = async username => {
    /* Super messy, but finally works. */
    try {
      const options = {
        uri: `${server}usershows/${username}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      // Get all shows by user:
      let apiResponse = await rp(options);
      // Get most recent show & turn it into an address string for geolookup:
      let showString = utilities.getMostRecentShowString(apiResponse);
      // Get showid
      let showid = utilities.getShowIdForLatest(apiResponse);

      const options2 = {
        uri: `${server}geodata/${showString}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      // Pass address string to geolookup:
      var geodata = await rp(options2);
      // Parse results and extract lat/lng into coords object
      var returnObj = utilities.getCoordsFromGeoData(geodata);
      returnObj.showid = showid;
      return returnObj;
    } catch (err) {
      console.log(err);
    }
  };

  getCoordsForAllShowsByUser = async username => {
    let returnArray = [];
    try {
      const options = {
        uri: `${server}usershows/${username}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      // Get all shows by user:
      let apiResponse = await rp(options);
      // Loop through each show & turn it into an address string for geolookup:
      for (let individualShow of apiResponse) {
        let showidCoordsCombo = {
          showid: [],
          latLng: []
        };
        let showString = utilities.getShowString(individualShow);
        let showid = individualShow.showid;
        showidCoordsCombo.showid.push(showid);

        const options2 = {
          uri: `${server}geodata/${showString}`,
          headers: { "User-Agent": "Request-Promise" },
          json: true
        };
        // Pass address string to geolookup:
        var geodata = await rp(options2);
        // We may get multiple address results, but for now just take the first.
        var latLongsArray = utilities.getCoordsArrayFromGeoData(
          geodata.results[0]
        );
        showidCoordsCombo.latLng.push(latLongsArray);
        returnArray.push(showidCoordsCombo);
      }
      return returnArray;
    } catch (err) {
      console.log(err);
    }
  };

  getSetlistInfoForSingleShow = async showid => {
    try {
      console.log("I'm client API, showId is : " + showid);
      const options = {
        uri: `${server}setlistinfo/${showid}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      let apiResponse = await rp(options);
      return apiResponse;
    } catch (err) {
      console.log(err);
    }
  };

  getInfoForSingleShowFromPhishin = async showdate => {
    try {
      const options = {
        uri: `${server}phishin/shows/${showdate}`,
        headers: { "User-Agent": "Request-Promise" },
        json: true
      };
      let apiResponse = await rp(options);
      console.log(apiResponse);
      if (apiResponse.success == false || apiResponse.data.venue == null) {
        apiResponse.success == false
          ? console.log(`showdate ${showdate} not found`)
          : apiResponse.data.venue == null
            ? console.log(`showdate ${showdate} venue is null`)
            : console.log(`ERROR! with if statement.`);
        return;
      }
      // Rearrange the object to be venue-lead
      let newObject = {
        venueid: apiResponse.data.venue.id,
        venue: apiResponse.data.venue,
        shows: [apiResponse.data]
      };
      delete newObject.shows[0].venue;
      return newObject;
    } catch (err) {
      console.log(err);
    }
  };
}
