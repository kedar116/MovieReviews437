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
      // fetchMovies()
      //   .then((movies) => {
      //     apply((model) => ({ ...model, movies }));
      //     message[1].onSuccess?.();
      //   })
      //   .catch((error: Error) => {
      //     message[1].onFailure?.(error);
      //   });
      // break;
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

    // case "reviews/fetch":
    //   fetchReviews(message[1].movieName)
    //     .then((reviews) => {
    //       apply((model) => ({ ...model, reviews }));
    //       message[1].onSuccess?.(reviews);
    //     })
    //     .catch((error: Error) => {
    //       message[1].onFailure?.(error);
    //     });
    //   break;

    // case "reviews/add":
    //   console.log("reached here")
    //   addReview(message[1],user)
    //     .then((review) => {
    //       console.log("TRYING: ",review)
          
    //       apply((model) => ({ ...model, reviews: [...(model.reviews || []), review] 
    //       }));
    //       message[1].onSuccess?.(review);
    //       console.log("review is ",review);
    //       console.log("model is ",model);
    //       return model;
    //     })
    //     .catch((error: Error) => {
    //       message[1].onFailure?.(error);
    //     });
    //   break;

    case "reviews/add":
    addReview(message[1], user)
    .then((review) => {
      // Update model with the new review
      apply((model) => ({ ...model, reviews: [...(model.reviews || []), review] }));
      message[1].onSuccess?.(review);

      const movieName = review.movieName;
      if (!movieName) {
        console.error("Movie name is undefined");
        throw new Error("Movie name is undefined");
      }

      console.log("Fetching movie by name:", movieName);

      // Fetch the movie by name to check if it exists
      fetchMovieByName({ movieName }, user)
        .then((movie) => {
          if (movie) {
            // Movie exists, update it
            const update: UpdateQuery<Movie> = {
              $push: { reviews: review._id },
              $inc: { reviewCount: 1 }
            };
            updateMovie({ movieName, update }, user)
              .then((updatedMovie) => {
                apply((model) => ({
                  ...model,
                  movies: (model.movies || []).map(m => m.name === updatedMovie.name ? updatedMovie : m)
                }));
              });
          } else {

            console.log("I reached the else block, so I'm creating a new movie");
            // Movie doesn't exist, create a new one
            const newMovie = {
              name: review.movieName,
              img: "sample_image",  // Assuming you have a way to get the image URL
              rating: review.rating,
              reviews: [review._id],
              reviewCount: 1
            };
            console.log(review.movieName);
            console.log("My new movie entry is",newMovie);
            addMovie({ movie: newMovie }, user)
              .then((createdMovie) => {
                apply((model) => ({ ...model, movies: [...(model.movies || []), createdMovie] }));
              });
          }
        })
        .catch((error: Error) => {
          console.error("Failed to fetch or update movie:", error);
        });
    })
    .catch((error: Error) => {
      message[1].onFailure?.(error);
    });
  break;

    
        // default:
        //   const unhandled: never = message[0];
        //   throw new Error(`Unhandled Auth message "${unhandled}"`);

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
      return undefined;
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

function fetchMovieByName(
  
  msg: {movieName: string}, 
  user: Auth.User) 
  
  {
  return fetch(`/api/movies/${msg.movieName}`, {
    headers: Auth.headers(user)
  })
  .then((response: Response) => {
    if (response.status === 404) {
      return null;
    }
    if (response.status !== 200)
      throw `Failed to load movie with name ${msg.movieName}`;
    return response.json();
  })
  .then((json: unknown) => {
    if (json) {
      console.log("Movie:", json);
      return json as Movie;
    }
  });
}

function updateMovie(
  msg: {movieName: string, update: UpdateQuery<Movie>},
  user: Auth.User
){
  return fetch(`/api/movies/${msg.movieName}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" ,
    ...Auth.headers(user)
  },
    body: JSON.stringify(update)
  })
  .then((response: Response) => {
    if (response.status !== 200)
      throw `Failed to update movie with name ${msg.movieName}`;
    return response.json();
  })
  .then((json: unknown) => {
    if (json) {
      console.log("Updated Movie:", json);
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


function fetchReviews(movieName: string,user: Auth.User): Promise<Review[]> {
  return fetch(`/api/reviews/${movieName}`,{headers: Auth.headers(user)})
    .then((response) => response.json())
    .catch((err) => {
      console.error("Error fetching reviews:", err);
      return [];
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