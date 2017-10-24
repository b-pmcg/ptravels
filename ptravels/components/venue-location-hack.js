/**
 * Supa-hack for venues that don't have a lat/lng from Phish.in
 */

module.exports = {
    setMissingLocationData: showdata => {
        // Northerly Island
        if (showdata.venueid == 782) {
            showdata.venue.latitude = 41.8640539;
            showdata.venue.longitude = -87.6097182;
        } 
        return;
    }
}