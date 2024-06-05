// server/routes/reviews.ts
import express from 'express';
import reviewService from '../services/review-svc';
import movieService from '../services/movie-svc';
import {Movie, MovieDocument} from '../models/movie';
import {Review} from '../models/review';




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
    const {movieName}=req.params;
    const reviews = await reviewService.getReviewsByMovie(movieName);
    if(reviews){
      res.json(reviews);}
    else{
      res.status(404).json({ message: "Reviews not found" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

router.post('/', async (req, res) => {
  console.log('Received request to add review:', req.body);
  try {
    // Check if the movieName exists in the review database

    const review = await reviewService.addReview(req.body);
    const movie = await movieService.getMovieByName(req.body.movieName);

    if (movie) {
      // Movie exists, update the movie document
      const update: UpdateQuery<MovieDocument> = {
        $push: { reviews: review._id },
        $inc: { reviewCount: 1 },
        $set: { rating: (movie.rating * movie.reviewCount + review.rating) / (movie.reviewCount + 1) } // Update the average rating
      };
     const updatedMovie= await movieService.updateMovie(req.body.movieName, update);
     res.status(201).json(updatedMovie);

    } else {
      // Movie does not exist, create a new movie document
      const newMovie = {
        name: req.body.movieName,
        img: req.body.img || '', // Handle the image separately if needed
        rating: req.body.rating,
        reviews: [review._id],
        reviewCount: 1
      };
    const createdMovie= await movieService.createMovie(newMovie as MovieDocument);
      res.status(201).json(createdMovie);
    }
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});




export default router;
