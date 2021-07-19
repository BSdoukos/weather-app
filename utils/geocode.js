const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnNkb3Vrb3MiLCJhIjoiY2txZm42amVkMDVydjJ2bnVzeW42ZHl6OCJ9.QgK2uNkHz-rnSAvv7900yQ&limit=1`;

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (!body.features.length) {
            callback('Location not found.');
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;