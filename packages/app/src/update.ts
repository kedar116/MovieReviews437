import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Profile } from "server/models";
//@ts-ignore
import { Movie } from "./server/models/Movie";
//@ts-ignore
import { Review } from "./server/models/Review";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => {
          apply((model) => ({ ...model, profile }));
          message[1].onSuccess?.();
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;

    case "movies/fetch":
      fetchMovies()
        .then((movies) => {
          apply((model) => ({ ...model, movies }));
          message[1].onSuccess?.();
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "movies/add":
      addMovie(message[1].movie)
        .then((movie) => {
          apply((model) => ({ ...model, movies: [...(model.movies || []), movie] }));
          message[1].onSuccess?.(movie);
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "reviews/fetch":
      fetchReviews(message[1].movieName)
        .then((reviews) => {
          apply((model) => ({ ...model, reviews }));
          message[1].onSuccess?.(reviews);
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "reviews/add":
      addReview(message[1].review)
        .then((review) => {
          apply((model) => ({ ...model, reviews: [...(model.reviews || []), review] }));
          message[1].onSuccess?.(review);
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function saveProfile(
  msg: {
    userid: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(
  msg: { userid: string },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

function fetchMovies(): Promise<Movie[]> {
  return fetch("/api/movies")
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error fetching movies:", err);
      return [];
    });
}

function addMovie(movie: Movie): Promise<Movie> {
  return fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error adding movie:", err);
      throw err;
    });
}

function fetchReviews(movieName: string): Promise<Review[]> {
  return fetch(`/api/reviews/${movieName}`)
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error fetching reviews:", err);
      return [];
    });
}

function addReview(review: Review): Promise<Review> {
  return fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error adding review:", err);
      throw err;
    });
}
