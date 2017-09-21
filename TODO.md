# Work Outline:

## What I can do:
express server running, middleware feeding into express
express routes for phish api, returns json
react uses fetch to get data from express (proxy)
componentDidMount executes fetch


## Things to do:
### What is this app and what should it do?
Map interface for phish shows
Input username to see shows
add & select multiple users to compare locations
click on map pins to  get show information

### How to handle geo data?
1. phishnet api gets city, location, sends that to Google api for lat long
    * benefits: TOS compliant, totally API driven
    * drawbacks: google rate limits, slower, dependant on 3rd parties

2. create db for geolocation by scraping google & phishnet venue info
    * benefits: faster, more accure, not dependant on google geo
    * drawbacks: not TOS compliant for either, involves extra db work