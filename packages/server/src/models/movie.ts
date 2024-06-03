// server/models/movie.ts
import { Review } from './review';
import { Document } from 'mongoose';

export interface Movie {
  name: string;
  img: string;
  rating: number;
  reviews: Review[];
  reviewCount: number;
}

export interface MovieDocument extends Movie, Document {}
