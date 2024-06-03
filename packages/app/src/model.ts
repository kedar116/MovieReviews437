// @ts-ignore
import { Profile } from "server/models";
// @ts-ignore
import { Movie } from "./server/models/Movie";
// @ts-ignore
import { Review } from "./server/models/Review";

export interface Model {

  profile?: Profile;
  movies?: Movie[];
  reviews?: Review[];
}

export const init: Model = { };