const mongoose = require('mongoose');
const Models = require('./models.js');

//Models
const Movies = Models.Movie;
const Users = Models.User;

//MongoDB Connection using Mongoose
mongoose.connect('mongodb://localhost:27017/matrixDB');

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

const app = express();

//Log requests to server
app.use(morgan('common'));

//Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

//CORS Enabled
const cors = require('cors');

//CORS limiting domain access
let allowedOrigins = ['http://localhost8080', 'http://testsite.com'];

app.use(cors({
    origin: (origin, callback) => {
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
            return callback(new Error(message ), false);
        }
        return callback(null, true);
    }
}));

//Input Validation
const { check, validationResult } = require('express-validator');

//Import auth.js
let auth = require('./auth')(app);

//Require passport authentication
const passport = require('passport');
require('./passport');

//Sends files requested to public folder
app.use(express.static('public'));

//Welcome Screen
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Matrix!');
});

//Get all movies
app.get('/movies', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

//Get list of movies by director
app.get('/movies/directors/:directorName', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    await Movies.find({ 'Director.Name': req.params.directorName})
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get list of movies by genre
app.get('/movies/genres/:genreName', passport.authenticate('jwt', 
{session: false }), async (req, res) => {
    await Movies.find({ 'Genre.Name' : req.params.genreName})
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get movie by title
app.get('/movies/:Title', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    await Movies.findOne({ Title: req.params.Title})
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get info about a director by name
app.get('/directors/:directorName', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    await Movies.findOne({ 'Director.Name' : req.params.directorName})
        .then((movies) => {
            res.status(201).json(movies.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get info about a genre by name
app.get('/genres/:genreName', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    await Movies.findOne({ 'Genre.Name' : req.params.genreName})
        .then((movies) => {
            res.status(201).json(movies.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Add a user
app.post('/users', [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
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

//Update user's info by Username
app.put('/users/:Username', [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appead to be valid').isEmail()
], passport.authenticate('jwt', { session: false }), async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: error.array() });
    }
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Add movie to user's TopMovies List
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    //CONDITION TO CHECK PERMISSION
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    //END OF PERMISSION CHECK
    await Users.findOneAndUpdate({ Username: req.params.Username }, 
    {
      $push: { TopMovies: req.params.MovieID }
    },
    { new: true })
    //Makes sure updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Delete movie from user's TopMovies List
app.delete('/users/:Username/TopMovies/:MovieID', passport.authenticate('jwt', 
{ session: false }), async (req, res) => {
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ Username: req.params.Username },
    {
        $pull: { TopMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.erroo(err);
        res.status(500).send('Error: ' + err);
    });
});

//Delete user by Username
app.delete('/users/:Username', passport.authenticate('jwt',
{ session: false }), async (req, res) => {
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found.');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});