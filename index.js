const express = require('express');
morgan = require('morgan');

//appending Morgan logs into a file
fs = require('fs'),
    path = require('path');


const app = express();

let topMovies = [
    {
        title: 'The Godfather',
        genre: 'Action'
    },
    {
        title: 'Star Wars',
        genre: 'Science Fiction'
    }, {
        title: 'Forest Gump',
        genre: 'Drama'
    }, {
        title: 'Jaws',
        genre: 'Adventure'
    }, {
        title: 'Jurassic Park',
        genre: 'Science Fiction'
    }, {
        title: 'The Conjuring',
        genre: 'Horror'
    }, {
        title: 'Home Alone',
        genre: 'Comedy'
    }, {
        title: 'Avatar',
        genre: 'Fantasy'
    }, {
        title: 'It',
        genre: 'Horror'
    }, {
        title: 'Avengers',
        genre: 'Fantasy'
    },

];

//file created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

//setting up the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('common'));

//get request for retrieving top 10 movies
app.get('/topmovies', (req, res) => {
    res.json(topMovies);
});

//get request for displaying default text
app.get('/', (req, res) => {
    res.send('Welcome to Movie Application!');
});

//get request for displaying documentation html
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

//navigating documentation.html page using static function
//app.use(express.static('public'));
app.use('/documentation.html', express.static('public'));


//error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Mobile App is listening on port 8080');
});