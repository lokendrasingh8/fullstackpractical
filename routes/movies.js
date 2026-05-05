const express = require('express');
const router = express.Router();
const Movie = require('../Movie/model');

router.get('/', async (req, res) => {
try {
    const movies = await Movie.find();
    res.render('movies/index', { movies });
} catch (err) {
    res.status(500).send(err.message);
}
});

router.get('/new', (req, res) => {
res.render('movies/new');
});

router.post('/', async (req, res) => {
try {
    const movie = new Movie(req.body);
    await movie.save();
    res.redirect('/movies');
} catch (err) {
    res.render('movies/new', { error: err.message, movie: req.body });
}
});


router.get('/:id', async (req, res) => {
try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.render('movies/show', { movie });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.render('movies/edit', { movie });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    movie.description = req.body.description;
    movie.genre = req.body.genre;
    movie.releaseYear = req.body.releaseYear;
    movie.director = req.body.director;

    await movie.save();
    res.redirect(`/movies/${movie._id}`);
  } catch (err) {
    const movie = await Movie.findById(req.params.id);
    res.render('movies/edit', { error: err.message, movie: { ...movie.toObject(), ...req.body } });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/movies');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;