import { LitElement, html, css, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, define } from '@calpoly/mustang';
import { View } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Movie } from 'server/models';
import resetCSS from "../css/reset";

export class HomeViewElement extends View<Model, Msg> {
  @state()
  get movies(): Movie[] {
    return this.model.movies || [];
  }



  constructor() {
    super("blazing:model");
    // this.fetchMovies();
    
  }

//   async fetchMovies() {
//     try {
//         const response = await fetch('/api/movies',, {
//             method: 'GET', // or 'POST', 'PUT', etc.
//             headers: Auth.headers(Auth.AuthenticatedUser),
//           });
//         console.log("ERROR : ",response)
//         this.movies = await response.json();
        
//     } catch (error) {
//         console.log("I TRIED")
//         console.log()
//     }

    
//   }

connectedCallback() {
    super.connectedCallback();
    console.log("Fetching movies...");
    this.dispatchMessage(["movies/fetch"]);
    
    console.log("Hi");  
    
  }

  render(): TemplateResult {
    const renderItem = (movie: Movie) => {
      const { name, img, rating, reviews } = movie;
      console.log("This is it",movie,name,img,rating,reviews);

      return html`
        <div class="movie">
          <h2>${name}</h2>
          <img src="${img}" alt="${name}" class="movie-image" />
          <p>Rating: ${rating}/10</p>
          
          <a href="/app/reviews/${name}">Go to Reviews</a>
        </div>
      `;
    };

    console.log("Rendering movies:", this.movies);
    return html`
      <main class="page">
        <header>
          <h2>Movie List</h2>
        </header>
        <div class="movie-list">
          ${this.movies.map(renderItem)}
        </div>
      </main>
    `;
  }

  static styles = [
    resetCSS,
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-template-columns: 1fr;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
        gap: var(--size-spacing-medium);
        background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      header {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
      .movie-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--size-spacing-large);
      }
      .movie {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: var(--size-spacing-medium);
        text-align: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .movie:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
      .movie-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 10px;
        transition: transform 0.3s ease;
      }
      .movie-image:hover {
        transform: scale(1.05);
      }
      h2 {
        font-size: 22px;
        color: #343a40;
        margin: 10px 0;
      }
      .rating {
        font-size: 18px;
        color: #ffc107;
        margin: 10px 0;
      }
      .review-link {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }
      .review-link:hover {
        background-color: #0056b3;
        transform: scale(1.05);
      }
    `
  ];
}

define({ 'home-view': HomeViewElement });
