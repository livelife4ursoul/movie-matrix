const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/matrixDB');

const express = require('express'),
    morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Matrix!');
});

app.use(express.static('public'));

//Get all movies
app.get('/movies', async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

//Get list of movies by director
app.get('/movies/directors/:directorName', async (req, res) => {
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
app.get('/movies/genres/:genreName', async (req, res) => {
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
app.get('/movies/:Title', async (req, res) => {
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
app.get('/directors/:directorName', async (req, res) => {
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
app.get('/genres/:genreName', async (req, res) => {
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
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
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

//Get all users
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get user by username
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Update user's info by Username
app.put('/users/:Username', async (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, 
    {
      $push: { TopMovies: req.params.MovieID }
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

//Delete movie from user's TopMovies List
app.delete('/users/:Username/TopMovies/:MovieID', async (req, res) => {
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
app.delete('/users/:Username', async (req, res) => {
    await Users.fineOneAndRemove({ Username: req.params.Username })
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

app.listen(8080, () => {
    console.log('Your app is listening.');
});


// let movies = [
//     {
//         title: 'Almost Famous',
//         description: 'A high-school boy in the early 1970s is given the chance to write a story for Rolling Stone magazine about an up-and-coming rock band as he accompanies them on their concert tour.',
//         director: 'Cameron Crowe',
//         release: '2000',
//         genre: ['Adventure', 'Comedy', 'Music', 'Drama'],
//         imageURL: 'https://www.imdb.com/title/tt0181875/mediaviewer/rm1955203584/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Bohemian Rhapsody',
//         description: 'The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).',
//         director: 'Bryan Singer',
//         release: '2018',
//         genre: ['Biography', 'Drama', 'Music'],
//         imageURL: 'https://www.imdb.com/title/tt1727824/mediaviewer/rm2666152448/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Pulp Fiction',
//         description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
//         director: 'Quentin Tarantino',
//         release: '1994',
//         genre: ['Crime', 'Drama'],
//         imageURL: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Wizard of Oz',
//         description: 'Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others wishes.',
//         director: 'Victor Fleming',
//         release: '1939',
//         genre: ['Adventure', 'Family', 'Fantasy'],
//         imageURL: 'https://www.imdb.com/title/tt0032138/mediaviewer/rm730953472/?ref_=tt_ov_i'
//     },
//     {
//         title: 'The Big Lebowski',
//         description: 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.',
//         director: [
//             'Joel Coen',
//             'Ethan Coen'
//         ],
//         release: '1998',
//         genre: ['Comedy', 'Drama'],
//         imageURL: 'https://www.imdb.com/title/tt0118715/mediaviewer/rm1793404928/?ref_=tt_ov_i'
//     },
//     {
//         title: 'A Very Long Engagement',
//         description: 'Tells the story of a young woman\'s relentless search for her fiancé, who has disappeared from the trenches of the Somme during World War One.',
//         director: 'Jean-Pierre Jeunet',
//         release: '2004',
//         genre: ['Drama', 'Mystery', 'Romance'],
//         imageURL: 'https://www.imdb.com/title/tt0344510/mediaviewer/rm2147360512/?ref_=tt_ov_i'
//     },
//     {
//         title: 'The Hunger Games',
//         description: 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
//         director: 'Gary Ross',
//         release: '2012',
//         genre: ['Action', 'Adventure', 'SciFi'],
//         imageURL: 'https://www.imdb.com/title/tt1392170/mediaviewer/rm2868031744/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Kill Bill: The Whole Bloody Affair',
//         description: 'The Bride must kill her ex-boss and lover Bill who betrayed her at her wedding rehearsal, shot her in the head and took away her unborn daughter. But first, she must make the other four members of the Deadly Viper Assassination Squad suffer.',
//         director: 'Quentin Tarantino',
//         release: '2006',
//         genre: ['Action', 'Crime', 'Thriller'],
//         imageURL: 'https://www.imdb.com/title/tt6019206/mediaviewer/rm1256460032/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Chicago',
//         description: 'Two death-row murderesses develop a fierce rivalry while competing for publicity, celebrity, and a sleazy lawyer\'s attention.',
//         director: 'Rob Marshall',
//         release: '2002',
//         genre: ['Comedy', 'Crime', 'Musical'],
//         imageURL: 'https://www.imdb.com/title/tt0299658/mediaviewer/rm2369407488/?ref_=tt_ov_i'
//     },
//     {
//         title: 'Mary Poppins Returns',
//         description: 'A few decades after her original visit, Mary Poppins, the magical nanny, returns to help the Banks siblings and Michael\'s children through a difficult time in their lives.',
//         director: 'Rob Marshall',
//         release: '2018',
//         genre: ['Adventure', 'Comedy', 'Family', 'Musical'],
//         imageURL: 'https://www.imdb.com/title/tt5028340/mediaviewer/rm3193139200/?ref_=tt_ov_i'
//     }


// ];
