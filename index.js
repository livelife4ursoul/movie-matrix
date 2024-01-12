const express = require('express');

const morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Harry Potter',
        author: 'J.k. Rowling'
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

app.listen(8080, () => {
    console.log('Your app is listening.');
});