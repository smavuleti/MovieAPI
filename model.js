const mongoose = require("mongoose");


//Defining Schema for database tables
let genreSchema = mongoose.Schema({
    GenreName: { type: String, required: true },
    GenreDescription: { type: String, required: true },
});

let directorSchema = mongoose.Schema({
    DirectorName: { type: String, required: true },
    MiniBio: { type: String, required: true },
    BirthYear: Date
});


let movieSchema = mongoose.Schema({
    MovieTitle: { type: String, required: true },
    MovieDescription: { type: String, required: true },
    MovieGenre: {
        GenreName: String,
        GenreDescription: String
    },
    MovieDirector: {
        DirectorName: String,
        MiniBio: String
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    UserName: { type: String, required: true },
    UserPassword: { type: String, required: true },
    UserEmail: { type: String },
    UserBirthday: Date,
    UserFavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//Creating Models
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

//Exporting Models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
