const path = require('path')
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const newViewPath = path.join(__dirname, '../templates/views'); //this is setting the new path for express to sth else instead of 'view'
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', newViewPath) //set path for the new path
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Militus',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Militus',
        helpText: 'Check this link if you need help on anything.'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Militus'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
            error: 'Please provide a search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //the {} destructured the response we would get if nth was passed in for lat and lon, it returns an empty object instead of undefined or an error

        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (err, forecastData) => {
            if(error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Militus',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log("Listening for requests on port 3000")
})