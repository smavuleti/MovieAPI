const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');


const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose');
const Models = require('./model.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.get('/', (req, res) => {
    res.send("Welcome to Movie Application");
});

// //Return a list of ALL movies to the user
// app.get('/allMovies', (req, res) => {
//     Movies.find()
//         .then((movies) => {
//             res.status(201).json(movies);
//             console.log("in getting all movies");

//         }).
//         catch((err) => {
//             console.error(err);
//             res.status(500).send("Error:" + err);
//         });
// });

app.get('/allMovies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//Return data about a single movie by title to the user
app.get('/allMovies/:movieTitle', (req, res) => {
    Movies.findOne({ MovieTitle: req.params.movieTitle })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
    //res.json(allMovies.find((movie) => { return movie.movieTitle === req.params.movieTitle }));
    // console.log("Success in getting a single movie from the list, that is: " + req.params.movieTitle);
});

//Return data about a genre by name 
app.get('/genres/:genreName', (req, res) => {
    Genres.findOne({ GenreName: req.params.genreName })
        .then((genre) => {
            res.json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
    //res.send(" Successful Get method with Movie genres data by Movie Title");
});


//Return data about a director by director name
app.get('/directors/:directorName', (req, res) => {
    Directors.findOne({ DirectorName: req.params.directorName })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
    //res.send(" Successful Get method with Movie Director data by Movie Title");
});

/* 
--Add User with this format:--
{
    ID: Integer,        
    UserName: String,
    UserPassword: String,
    UserEmail: String,
    UserBirthday: Date
}
*/
//Register new user 
app.post('/users', async (req, res) => {
    await Users.findOne({ UserName: req.body.UserName })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.UserName + 'already exists');
            } else {
                Users
                    .create({
                        UserName: req.body.UserName,
                        UserPassword: req.body.UserPassword,
                        UserEmail: req.body.UserEmail,
                        UserBirthday: req.body.UserBirthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Get a list of users 
app.get('/users', (req, res) => {
    Users.find()
        .then(function (users) {
            res.status(201).json(users);

        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//Get a single user data
app.get('/users/:UserName', (req, res) => {
    Users.findOne({ UserName: req.params.UserName })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error:" + err);
        });
});


// Update user information
app.put('/users/:UserName', (req, res) => {
    Users.findOneAndUpdate({ UserName: req.params.UserName }, {
        $set: {
            UserName: req.body.UserName,
            UserPassword: req.body.UserPassword,
            UserEmail: req.body.UserEmail,
            UserBirthday: req.body.UserBirthday
        }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        })
    //    res.send('Successful PUT request updating username');
});

//Adding a movie to list of favorites for user
app.post('/users/:UserName/allMovies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ UserName: req.params.UserName }, {
        $push: { UserFavoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
    // res.send('Successful POST request adding user favorite movie');
});

//Removes a movie from the list of favorites
app.delete('/users/:UserName/allMovies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ UserName: req.params.UserName }, {
        $pull: { UserFavoriteMovies: req.params.MovieID }
    },
        { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err);
        });
    // res.send('Successful POST request adding user favorite movie');
});


// Deregister user 
app.delete('/users/:UserName', (req, res) => {
    Users.findOneAndDelete({ UserName: req.params.UserName })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.UserName + ' was not found');
            } else {
                res.status(200).send(req.params.UserName + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    //     res.send('Successful Deregistering user by username');
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});