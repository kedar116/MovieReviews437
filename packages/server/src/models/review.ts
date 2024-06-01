// server/models/review.ts
import { Document } from 'mongoose';

export interface Review {
  movieName: string;
  user: string;
  review: string;
  rating: number;
  year: number;
  director?: string;
}

export interface ReviewDocument extends Review, Document {}
