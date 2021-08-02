const request = require('request');


// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlsaXR1cyIsImEiOiJja3F5Nnk5NmUwN3R5MnlzNnhxbmc3Zm1xIn0.CKK50FwnWuB-xqJTNpaQKw&limit=1';
//     request({url, json: true}, (err, res) => {
//         if(err) {
//             callback('Unable to connect to location services!')
//         } else if (res.body.features.length === 0){
//             callback('Unable to find location. Try another search')
//         } else {
//             callback(undefined, {
//                 latitude: res.body.features[0].center[1],
//                 longitude: res.body.features[0].center[0],
//                 location: res.body.features[0].place_name
//             })
//         }
        
//     })

// }

//Refactor and destructuring of JS ES6
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlsaXR1cyIsImEiOiJja3F5Nnk5NmUwN3R5MnlzNnhxbmc3Zm1xIn0.CKK50FwnWuB-xqJTNpaQKw&limit=1';
    request({url, json: true}, (error, {body}) => { //since body is the only thing we use from the response, we destructured it.
        if(error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })

}

module.exports = geocode;
