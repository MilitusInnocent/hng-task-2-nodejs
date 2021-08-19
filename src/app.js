const path = require('path')
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

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

mongoose.connect('mongodb://militus:mili2ssmoxie@hngi8-task-2-db-shard-00-00.02xxm.mongodb.net:27017,hngi8-task-2-db-shard-00-01.02xxm.mongodb.net:27017,hngi8-task-2-db-shard-00-02.02xxm.mongodb.net:27017/test?replicaSet=atlas-jd1717-shard-0&ssl=true&authSource=admin', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;

db.on('error', () =>console.log('Error connecting to database'));
db.once('open', () => console.log('connected to database'))

app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phno = req.body.phno;

    const data = {
        "name": name,
        "email": email,
        "phno": phno
    }

    db.collection('users').insertOne(data, (error, collection) => {
        if (error) {
            throw error
        }

        console.log("Record inserted successfully")
    })

    return res.redirect('success')
})

app.get('', (req, res) => {
    res.render('index', {
        name: 'Militus',
    })
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Projects Executed',
        name: 'Militus',
    })
});

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Militus',
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me',
        name: 'Militus'
    })
});

app.get('/success', (req, res) => {
    res.render('success', {
        name: 'Militus'
    })
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Militus',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log("Listening for requests on port " + port)
})