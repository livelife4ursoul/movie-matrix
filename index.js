const express = require('express'),
    morgan = require('morgan');

const app = express();

let movies = [
    {
        title: 'Almost Famous',
        description: 'A high-school boy in the early 1970s is given the chance to write a story for Rolling Stone magazine about an up-and-coming rock band as he accompanies them on their concert tour.',
        director: 'Cameron Crowe',
        release: '2000',
        genre: ['Adventure', 'Comedy', 'Music', 'Drama'],
        imageURL: 'https://www.imdb.com/title/tt0181875/mediaviewer/rm1955203584/?ref_=tt_ov_i'
    },
    {
        title: 'Bohemian Rhapsody',
        description: 'The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).',
        director: 'Bryan Singer',
        release: '2018',
        genre: ['Biography', 'Drama', 'Music'],
        imageURL: 'https://www.imdb.com/title/tt1727824/mediaviewer/rm2666152448/?ref_=tt_ov_i'
    },
    {
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        director: 'Quentin Tarantino',
        release: '1994',
        genre: ['Crime', 'Drama'],
        imageURL: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i'
    },
    {
        title: 'Wizard of Oz',
        description: 'Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others wishes.',
        director: 'Victor Fleming',
        release: '1939',
        genre: ['Adventure', 'Family', 'Fantasy'],
        imageURL: 'https://www.imdb.com/title/tt0032138/mediaviewer/rm730953472/?ref_=tt_ov_i'
    },
    {
        title: 'The Big Lebowski',
        description: 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.',
        director: [
            'Joel Coen',
            'Ethan Coen'
        ],
        release: '1998',
        genre: ['Comedy', 'Drama'],
        imageURL: 'https://www.imdb.com/title/tt0118715/mediaviewer/rm1793404928/?ref_=tt_ov_i'
    },
    {
        title: 'A Very Long Engagement',
        description: 'Tells the story of a young woman\'s relentless search for her fiancé, who has disappeared from the trenches of the Somme during World War One.',
        director: 'Jean-Pierre Jeunet',
        release: '2004',
        genre: ['Drama', 'Mystery', 'Romance'],
        imageURL: 'https://www.imdb.com/title/tt0344510/mediaviewer/rm2147360512/?ref_=tt_ov_i'
    },
    {
        title: 'The Hunger Games',
        description: 'Katniss Everdeen voluntarily takes her younger sister\'s place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.',
        director: 'Gary Ross',
        release: '2012',
        genre: ['Action', 'Adventure', 'SciFi'],
        imageURL: 'https://www.imdb.com/title/tt1392170/mediaviewer/rm2868031744/?ref_=tt_ov_i'
    },
    {
        title: 'Kill Bill: The Whole Bloody Affair',
        description: 'The Bride must kill her ex-boss and lover Bill who betrayed her at her wedding rehearsal, shot her in the head and took away her unborn daughter. But first, she must make the other four members of the Deadly Viper Assassination Squad suffer.',
        director: 'Quentin Tarantino',
        release: '2006',
        genre: ['Action', 'Crime', 'Thriller'],
        imageURL: 'https://www.imdb.com/title/tt6019206/mediaviewer/rm1256460032/?ref_=tt_ov_i'
    },
    {
        title: 'Chicago',
        description: 'Two death-row murderesses develop a fierce rivalry while competing for publicity, celebrity, and a sleazy lawyer\'s attention.',
        director: 'Rob Marshall',
        release: '2002',
        genre: ['Comedy', 'Crime', 'Musical'],
        imageURL: 'https://www.imdb.com/title/tt0299658/mediaviewer/rm2369407488/?ref_=tt_ov_i'
    },
    {
        title: 'Mary Poppins Returns',
        description: 'A few decades after her original visit, Mary Poppins, the magical nanny, returns to help the Banks siblings and Michael\'s children through a difficult time in their lives.',
        director: 'Rob Marshall',
        release: '2018',
        genre: ['Adventure', 'Comedy', 'Family', 'Musical'],
        imageURL: 'https://www.imdb.com/title/tt5028340/mediaviewer/rm3193139200/?ref_=tt_ov_i'
    }


];

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Matrix!');
});

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/directors/:director', (req, res) => {
    res.send('Successful GET request returning list of movies by director')
});

app.get('/movies/genres/:genre', (req, res) => {
    res.send('Successful GET request returning list of movies by genre')
});

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => { return movie.title === req.params.title}));
});

app.get('/directors/:director', (req, res) => {
    res.send('Successful GET request returning data about a director')
});

app.get('/genres/:genre', (req, res) => {
    res.send('Successful GET request returning data about a genre')
});

app.post('/users', (req, res) => {
    res.send('Successful POST request allowing user to register a new account')
});

app.put('/users/:userName', (req, res) => {
    res.send('Successful PUT request allowing user to update their info')
});

app.put('/users/:userName/topMovies/:movieID', (req, res) => {
    res.send('Successful PUT request allowing user to add movie to their favorite movies list')
});

app.delete('/users/:userName/topMovies/:movieID', (req, res) => {
    res.send('Successful DELETE request allowing user to delete movie from their favorite movies list')
});

app.delete('/users/:userName', (req, res) => {
    res.send('Successful DELETE request allowing user to delete their profile')
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening.');
});