const express = require('express'),
    morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Almost Famous',
        director: 'Cameron Crowe'
    },
    {
        title: 'Bohemian Rhapsody',
        director: 'Bryan Singer'
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Wizard of Oz',
        director: 'Victor Fleming'
    },
    {
        title: 'The Big Lebowski',
        director: ['Joel Coen', 'Ethan Coen']
    },
    {
        title: 'A Very Long Engagement',
        director: 'Jean-Pierre Jeunet'
    },
    {
        title: 'The Hunger Games',
        director: 'Gary Ross'
    },
    {
        title: 'The Matrix',
        director: ['Lana Wachowski', 'Lilly Wachowski']
    },
    {
        title: 'This is 40',
        director: 'Judd Apatow'
    },
    {
        title: 'Inception',
        director: 'Christopher Nolan'
    }


];

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Matrix!');
});

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening.');
});