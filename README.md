# Ptravels Map

A Geolocation app to visualize your attended shows. Written in React with the help of `create-react-app` and `react-leaflet`.

If you want to fork or clone this, you must have your own phish.net API key.
You can get one here: <http://api.phish.net/keys/>

You need to have the following file (I'll try to make this easier in the future):
`src/config.js`

```javascript

module.exports = {
    pnetConfig: {
        apikey: '<YOUR-API-KEY-HERE>',
        baseUrl: 'https://api.phish.net/v3',
        methods: {
            getAllVenues: '/venues/all',
            getVenueByVenueId: '/venues/get',
            getPeopleByShowId: '/people/byshow'
        }
    }
};
```