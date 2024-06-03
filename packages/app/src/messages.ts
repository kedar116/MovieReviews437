// @ts-ignore
import { Profile } from "server/models";
// @ts-ignore
import { Movie } from "./server/models/Movie";
// @ts-ignore
import { Review } from "./server/models/Review";

export type Msg =
  | ["profile/select", { id: string }]
  | [
    "profile/save",
    {
      id: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["movies/fetch"]
  | [
      "movies/add",
      {
        movie: Movie;
        onSuccess?: (movie: Movie) => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "reviews/fetch",
      {
        movieName: string;
        onSuccess?: (reviews: Review[]) => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "reviews/add",
      {
        review: Review;
        onSuccess?: (review: Review) => void;
        onFailure?: (err: Error) => void;
      }
    ];
 