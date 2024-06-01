// server/services/movie-svc.ts
import { Schema, model, Document } from 'mongoose';
import { Movie,MovieDocument } from '../models/movie';
import { ReviewDocument } from '../models/Review';
import { UpdateQuery } from 'mongoose';

const movieSchema = new Schema<MovieDocument>({
  name: { type: String, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  reviewCount: { type: Number, default: 0 }
});

export const MovieModel = model<MovieDocument>('Movie', movieSchema);

async function getAllMovies(): Promise<MovieDocument[]> {
  return MovieModel.find().populate('reviews').exec();
}

async function getMovieByName(name: string): Promise<MovieDocument | null> {
  return MovieModel.findOne({ name }).populate('reviews').exec();
}

async function createMovie(movie: MovieDocument): Promise<MovieDocument> {
  const newMovie = new MovieModel(movie);
  return newMovie.save();
}

async function updateMovie(name: string, update: UpdateQuery<MovieDocument>): Promise<MovieDocument | null> {
    return MovieModel.findOneAndUpdate({ name }, update, { new: true }).exec();
  }

export default { getAllMovies, getMovieByName, createMovie, updateMovie };
