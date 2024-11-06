const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let allMovies = [
    {
        movieId: '01',
        movieTitle: 'The Godfather',
        movieGenres: ['Epic', 'Gangster', 'Tragedy', 'Crime', 'Drama'],
        movieDirector:
        {
            firstName: 'Francis Ford',
            lastName: 'Coppola',
            birthYear: '1939',
            birthPlace: 'USA',
            deathYear: '1986'

        }
    },
    {
        movieId: '02',
        movieTitle: 'The Dark Knight',
        movieGenres: ['Action', 'Action Epic', 'Superhero', 'Crime', 'Drama', 'Thriller'],
        movieDirector:
        {
            firstName: 'Christopher',
            lastNama: 'Nolan',
            birthYear: '1970',
            birthPlace: 'UK',
            deathYear: null
        }
    },
    {
        movieId: '03',
        movieTitle: 'Forest Grump',
        movieGenres: ['Drama', 'Epic', 'Romance'],
        movieDirector:
        {
            firstName: 'Robert',
            lastName: 'Zemeckis',
            birthYear: '1952',
            birthPlace: 'USA',
            deathYear: null
        }
    },
    {
        movieId: '04',
        movieTitle: 'Jaws',
        movieGenres: ['Sea Adventure', 'Survival', 'Adventure', 'Drama', 'Thriller'],
        movieDirector:
        {
            firstName: 'Steven',
            lastName: 'Spielberg',
            birthYear: '1946',
            birthPlace: 'USA',
            deathYear: null
        }
    },
    {
        movieId: '05',
        movieTitle: 'Jurassic Park',
        movieGenres: ['Science Fiction', 'Dianosaur Adventure', 'Action', 'Adventure', 'Sci-fi', 'Thriller'],
        movieDirector:
        {
            firstName: 'Steven',
            lastName: 'Spielberg',
            birthYear: '1946',
            birthPlace: 'USA',
            deathYear: null
        }
    },
    {
        movieId: '06',
        movieTitle: 'The Conjuring',
        movieGenres: ['Horror', 'Supernatural Horror', 'Suspense Mystery', 'Mystery', 'Thriller'],
        movieDirector:
        {
            firstName: 'James',
            lastName: 'Wan',
            birthYear: '1977',
            birthPlace: 'Malaysia',
            deathYear: null
        }
    },
    {
        movieId: '07',
        movieTitle: 'Home Alone',
        movieGenres: ['Comedy', 'High-Concept Comedy', 'Holiday Comedy', 'Holiday Family', 'Slapstick', 'Family', 'Holiday'],
        movieDirector:
        {
            firstName: 'Chris',
            lastName: 'Columbus',
            birthYear: '1958',
            birthPlace: 'USA',
            deathYear: null
        }
    },
    {
        movieId: '08',
        movieTitle: 'Avatar',
        movieGenres: ['Fantasy', 'Adventure Epic', 'Sci-Fi', 'Action', 'Adventure'],
        movieDirector:
        {
            firstName: 'James',
            lastName: 'Cameron',
            birthYear: '1954',
            birthPlace: 'Canada',
            deathYear: null
        }
    },
    {
        movieId: '09',
        movieTitle: 'It',
        movieGenres: ['Horror', 'Supernatural Horro', 'Monster Horro'],
        movieDirector:
        {
            firstName: 'Andy',
            lastName: 'Muschietti',
            birthYear: '1973',
            birthPlace: 'Argentina',
            deathYear: null
        }
    },
    {
        movieId: '10',
        movieTitle: 'Avengers',
        movieGenres: ['Fantasy', 'Action Epic', 'Alien Invasion', 'Superhero', 'Action', 'Sci-Fi'],
        movieDirector:
        {
            firstName: 'Joss',
            lastName: 'Whedon',
            birthYear: '1964',
            birthPlace: 'USA',
            deathYear: null
        }
    },

];

let user = [
    {
        userName: 'John',
        password: 'John@123',
        email: 'John.Camell@gmail.com',
        dateOfBirth: '07/08/1990',
        favoriteMovies: ['Jaws', 'Jurassic Park', 'Avengers']
    },
];
//Return a list of ALL movies to the user
app.get('/allMovies', (req, res) => {
    res.json(allMovies);
    console.log("in getting all movies");
});

//Return data about a single movie by title to the user
app.get('/allMovies/:movieTitle', (req, res) => {
    res.json(allMovies.find((movie) => { return movie.movieTitle === req.params.movieTitle }));
    console.log("Success in getting a single movie from the list, that is: " + req.params.movieTitle);
});

//Return data about a genre by title /genre/:name
app.get('/allMovies/:movieGenre', (req, res) => {
    res.send(" Successful Get method with Movie genres data by Movie Title");
});
//Return data about a director by title /directors/:name
app.get('/allMovies/movieDirector/:birthYear', (req, res) => {
    res.send(" Successful Get method with Movie Director data by Movie Title");
});

//Register new user 
app.post('/user', (req, res) => {
    res.send("Successful POST request adding a new user");
})

// Update user information
app.put('/user/:userName', (req, res) => {
    res.send('Successful PUT request updating username');
});

//Adding a movie to list of favorites for user
app.post('/user/:userName/:favoriteMovies', (req, res) => {
    res.send('Successful POST request adding user favorite movie');
})

//Removes a movie from the list of favorites
app.delete('/user/:userName/:favoriteMovies', (req, res) => {
    res.send('Successful DELETE request to remove a movie from the favorites list');
});

// Deregister user 
app.delete('/user/:username', (req, res) => {
    res.send('Successful Deregistering user by username');
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});