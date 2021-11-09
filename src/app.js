const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname, '/../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//setup static directory to the server
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhinav Tyagi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhinav Tyagi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help message, lol',
        title: 'Help',
        name: 'Abhinav Tyagi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude , (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                search: req.query.address,
                location: location,
                forecast: forecastData
            })  
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhinav Tyagi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhinav Tyagi',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})