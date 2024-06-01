// server/routes/movies.ts
import express from 'express';
import movieService from '../services/movie-svc';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;
