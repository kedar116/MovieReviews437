import { html, css, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { View } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Review } from 'server/models';
import resetCSS from "../css/reset";

export class DisplayViewElement extends View<Model, Msg> {
 
    @property({ type: String }) movieName = '';

    @state()
    get reviews(): Review[] {
      return this.model.reviews || [];
    }
  
    constructor() {
      super("blazing:model");
      console.log("MovieReviewsViewElement constructor called");
    }
  
    connectedCallback() {
      super.connectedCallback();
      console.log("Fetching reviews for movie:", this.movieName);
      this.dispatchMessage([
        "reviews/fetch", 
        { 
          movieName: this.movieName, 
          onSuccess: (reviews: Review[]) => {
            console.log("Fetched reviews:", reviews);
          }, 
          onFailure: (error: Error) => console.error("Failed to fetch reviews:", error) 
        }
      ]);
    }
  
    render(): TemplateResult {
      const renderItem = (review: Review) => {
        const {user, review: reviewText, rating, year, director } = review;
        const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8'];
        const randomColor=colors[Math.floor(Math.random() * colors.length)];

        return html`
          <div class="review" style="background-color: ${randomColor};">
            <h2>(${year})</h2>
            <h2>${user}</h2>
            <p>${reviewText}</p>
            <p>Rating: ${rating}/10</p>
            <p>Director: ${director}
          </div>
        `;
      };
  
      console.log("Rendering reviews for movie:", this.movieName, this.reviews);

      return html`
        <main class="page">
          <header>
            <h2>Reviews for ${this.movieName}</h2>
          </header>
          <div class="review-list">
            ${this.reviews.map(renderItem)}
          </div>
          <div class="button-container">
            <a href='/app'><button class="fancy-button">Go back to movies</button></a>
            <a href='/app/add-review'><button class="fancy-button">Click to Add a Review</button></a>
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
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--size-spacing-large);
            gap: var(--size-spacing-large);
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
          .review-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: var(--size-spacing-large);
            width: 100%;
          }
          .review {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: var(--size-spacing-medium);
            text-align: center;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .review:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }
          .review h2 {
            font-size: 24px;
            color: #343a40;
            margin: 10px 0;
          }
          .review p {
            font-size: 18px;
            color: #333;
            margin: 10px 0;
          }
          .review .rating {
            font-size: 20px;
            color: #ffc107;
            margin: 10px 0;
          }
          .button-container {
            display: flex;
            justify-content: center;
            gap: var(--size-spacing-large);
          }
          .fancy-button {
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #ffffff;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .fancy-button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
          }
          .fancy-button:active {
            background-color: #004494;
          }
        `
      ];
    }
  
  
define({ 'display-view': DisplayViewElement });
