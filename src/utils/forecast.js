const request = require('request');


// const forecast = (lat,lon, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=a069a1cff27f39520f8269523d1f0045&query='+ lat + ',' + lon + '&units=m';
//     request({url, json: true}, (err, res) => {
//         if(err) {
//             callback('Unable to connect to location services!')
//         } else if (res.body.error){
//             callback('Unable to find location. Try another search')
//         } else {
//             callback(undefined, res.body.current.weather_descriptions[0] + ". The temperature is " + res.body.current.temperature + " degrees but it feels like " + res.body.current.feelslike + " degrees out there."
//             )
//         }
        
//     })

// }

//Refactor and destructured JS ES6
const forecast = (lat,lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a069a1cff27f39520f8269523d1f0045&query='+ lat + ',' + lon + '&units=m';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!')
        } else if (body.error){
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". The temperature is " + body.current.temperature + " degrees but it feels like " + body.current.feelslike + " degrees out there. The humidity is " + body.current.humidity + "% period"
            )
        }
        
    })

}

module.exports = forecast;
