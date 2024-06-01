// server/services/review-svc.ts
import { Schema, model } from 'mongoose';
import { ReviewDocument } from '../models/Review';

const reviewSchema = new Schema<ReviewDocument>({
  movieName: { type: String, required: true },
  user: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
  director: { type: String }
});

export const ReviewModel = model<ReviewDocument>('Review', reviewSchema);

async function getAllReviews(): Promise<ReviewDocument[]> {
  return ReviewModel.find().exec();
}

async function getReviewsByMovie(movieName: string): Promise<ReviewDocument[]> {
  return ReviewModel.find({ movieName }).exec();
}

async function addReview(review: ReviewDocument): Promise<ReviewDocument> {
  const newReview = new ReviewModel(review);
  return newReview.save();
}

export default { getAllReviews, getReviewsByMovie, addReview };
