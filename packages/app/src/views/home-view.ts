import { html, css, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Auth, define, Events, Observer } from '@calpoly/mustang';
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

  @property()
  username = "anonymous";

  @state()
  authenticated = false;

  constructor() {
    super("blazing:model");
    this._authObserver = new Observer<Auth.Model>(this, "blazing:auth");
    // this.fetchMovies();
    
  }
  

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.authenticated = true;
        console.log("Fetching movies...");
        this.dispatchMessage(["movies/fetch"]);
      } else if (!user) {
        this.authenticated = false;
        this.username = "anonymous";
      }
    });
  }

  render(): TemplateResult {

    if (!this.authenticated) {
      return html`
        <main class="page">
          <div class="login-message">
            <h1>You must log in to view this content.</h1>
            <a href="login.html" class="signin" @click=${signInUser}>Sign in</a>
          </div>
        </main>
      `;
    }

    const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8'];
    const renderItem = (movie: Movie) => {
      const { name, img, rating, reviews, reviewCount } = movie;
      const roundedRating = rating.toFixed(2); // Round the rating to 2 decimal places
      const randomColor=colors[Math.floor(Math.random() * colors.length)];
      console.log("This is it", movie, name, img, rating, reviews);

      return html`
        <div class="movie" style="background-color: ${randomColor};">
          <h2>${name}</h2>
          <img src="${img}" alt="${name}" class="movie-image" />
          <p>Rating: ${roundedRating}/10</p> <!-- Display the rounded rating -->
          <p>Reviews: ${reviewCount}</p>
          <a href="/app/display/${name}">Go to Reviews</a>
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
        font-size: 32px; /* Increased font size */
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
      .movie-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Increased min width of cards */
        gap: var(--size-spacing-large);
      }
      .movie {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: var(--size-spacing-large); /* Increased padding */
        text-align: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-size: 18px; /* Increased font size */
      }
      .movie:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
      .movie-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 15px; /* Increased margin */
        transition: transform 0.3s ease;
      }
      .movie-image:hover {
        transform: scale(1.05);
      }
      h2 {
        font-size: 26px; /* Increased font size */
        color: #343a40;
        margin: 15px 0; /* Increased margin */
      }
      .rating {
        font-size: 22px; /* Increased font size */
        color: #ffc107;
        margin: 10px 0;
      }
      .review-count {
        font-size: 20px; /* Increased font size */
        color: #777;
        margin: 10px 0;
      }
      .review-link {
        display: inline-block;
        padding: 12px 25px; /* Increased padding */
        background-color: #007bff;
        color: #ffffff;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.3s ease;
        font-size: 18px; /* Increased font size */
      }
      .review-link:hover {
        background-color: #0056b3;
        transform: scale(1.05);
      }
    `
  ];
  _authObserver: Observer<Auth.Model>;
}
function signInUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/login"]);
}

define({ 'home-view': HomeViewElement });
