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

router.get('/:moviename', async (req, res) => {
  try {
    const {moviename}=req.params;
    console.log(`Fetching movie with name: ${moviename}`);
    const movie = await movieService.getMovieByName(moviename);
    if (movie) {
      console.log(`Movie found: ${JSON.stringify(movie)}`);
      res.json(movie);
    } else {
      console.log(`Movie not found: ${name}`);
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

router.post('/', async (req, res) => {
  console.log('Received request to create movie:', req.body);
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.put('/:name', async (req, res) => {
  try {
    const {name} = req.params;
    const movie = await movieService.updateMovie(name, req.body);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default router;
