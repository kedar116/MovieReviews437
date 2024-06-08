import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Profile } from "server/models";
//@ts-ignore
import { Movie } from "./server/models/Movie";
//@ts-ignore
import { Review } from "./server/models/Review";
import { model } from "mongoose";
import { UpdateQuery } from "mongoose";

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
    
      fetchMovies(user).then((movies: Movie[] | undefined) =>
        {
          console.log("i get this : ",movies)
          apply((model) => ({ ...model, movies }));
        }

      );
      break;

    case "movies/add":
      addMovie(message[1].movie,user)
        .then((movie) => {
          apply((model) => ({ ...model, movies: [...(model.movies || []), movie] }));
          message[1].onSuccess?.(movie);
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "reviews/fetch":
      fetchReviews(message[1],user)
        .then((reviews) => {
          apply((model) => ({ ...model, reviews }));
          message[1].onSuccess?.(reviews);
        })
        .catch((error: Error) => {
          message[1].onFailure?.(error);
        });
      break;

    case "reviews/add":
    addReview(message[1], user)
    .then((review) => {
      apply((model) => ({ ...model, reviews: [...(model.reviews || []), review] }));
      message[1].onSuccess?.(review);

    })
    .catch((error: Error) => {
      message[1].onFailure?.(error);
    });
  break;

      }
    }

function saveProfile(
  msg: {
    id: string;
    profile: Profile;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
  .then((response: Response) => {
    if (response.status === 200) return response.json();
    else
      throw new Error(
        `Failed to save profile for ${msg.id}`
      );
  })
    .then((json: unknown) => {
      if (json) return json as Profile;
      return undefined;
    });
}

function selectProfile(
  msg: { id: string },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.id}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      console.log("Checkpoint",response.body)
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as Profile;
      }
    });
}

// function fetchMovies(): Promise<Movie[]> {
//   return fetch("/api/movies")
//     .then((response) => response.json())
//     .catch((err) => {
//       console.error("Error fetching movies:", err);
//       return [];
//     });
// }


function fetchMovies(user: Auth.User) {
  console.log("PLEASEE")
  return fetch("/api/movies", {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `Failed to load movies`;
      return response.json();
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Movie",json);
        
        return json as Movie;
      }
    });
}



function addMovie(
  
  msg:{movie: Movie;},
  user: Auth.User

) {

  console.log("MOVIE",msg.movie);
  console.log(msg.movie.name);
  const mydata={
    name: msg.movie.name,
    img:  msg.movie.img,
    rating: msg.movie.rating, 
    reviewCount:msg.movie.reviewCount, 
    reviews: msg.movie.reviews,
    user: user.username
  }

  console.log("WELL2",mydata);
  return fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json",
    ...Auth.headers(user) 
  },
    body: JSON.stringify(mydata)
  })
  .then((response: Response) => {
    if (response.status !== 201)
      throw `Failed to add movie`;
    return response.json();
  })
  .then((json: unknown) => {
    if (json) {
      console.log("Added Movie:", json);
      return json as Movie;
    }
  });
}


function fetchReviews(
  msg: {movieName: string},
  user: Auth.User

){
 
  console.log(msg);
  console.log("Fetching reviews for movie",msg.movieName);
  return fetch(`/api/reviews/${msg.movieName}`,
  {headers: Auth.headers(user)

  })
  .then((response: Response) => {
    if (response.status !== 200)
      throw `Failed to load reviews`;
    return response.json();
  })
  .then((json: unknown) => {
    if (json) {
      console.log("Reviews",json);
      
      return json as Review;
    }
  });
}

function addReview(

  msg: {
    review: Review;
  },
  user: Auth.User
) {
  console.log("REVIEW",msg.review);
  const mydata={
    movieName: msg.review[0].movieName,
    review:  msg.review[0].review,
    rating: msg.review[0].rating, 
    year:msg.review[0].year, 
    director: msg.review[0].director,
    user: user.username
  }
  console.log("WELL:",mydata)
  return fetch(
    `/api/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(user)
      },
      body: JSON.stringify(mydata)
    }
  )
    .then((response: Response) => {
      console.log("API response is ",response);
      if (response.status === 201) return response.json();
      else
        throw new Error(
          `Failed to save review`
        );
    })
  
}