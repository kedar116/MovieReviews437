// server/routes/reviews.ts
import express from 'express';
import reviewService from '../services/review-svc';
import movieService from '../services/movie-svc';
import {Movie, MovieDocument} from '../models/movie';

import { UpdateQuery } from 'mongoose';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  });


router.get('/:movieName', async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByMovie(req.params.movieName);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

router.post('/', async (req, res) => {
  console.log('Received request to add review:', req.body);
    try {
      const review = await reviewService.addReview(req.body);
      const update: UpdateQuery<MovieDocument> = {
        $push: { reviews: review._id },
        $inc: { reviewCount: 1 }
      };
      await movieService.updateMovie(req.body.movieName, update);
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  });

export default router;
