const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c620c1efec557095b161720522d0a7a2&query=${latitude},${longitude}`;

    request(url, { json: true }, (error, { body }) => {
        const defaultErrorMessage = 'Unable to connect to weather services.';
        if (error) {
            callback(defaultErrorMessage);
        } else if (body.error) {
            callback(body.error.info);
        } else {
            try {
                const weather = body.current;
                callback(undefined, `${weather.weather_descriptions[0]}. Currently, it's ${weather.temperature}°C. It feels like ${weather.feelslike}°C.`);
            } catch (error) {
                callback(defaultErrorMessage);
            }
        }
    });
}

module.exports = forecast;