const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2];

if (!location) {
    console.log('Provide a location.')
    process.exit();
}

geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return console.log(error);
    }
    
    forecast(latitude, longitude, (error, forecast) => {
        if (error) {
            return console.log(error);
        }   

        console.log(location);
        console.log(forecast);
    });
});