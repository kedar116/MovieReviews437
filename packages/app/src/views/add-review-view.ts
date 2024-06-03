import { LitElement, html, css } from 'lit';
import { define, View } from '@calpoly/mustang';
import { property, state } from 'lit/decorators.js';
import { Msg } from "../messages";
import { Model } from "../model";
import { Review } from 'server/models';

export class AddReviewViewElement extends View<Model, Msg> {
  @property({ type: String }) movieName = '';
  @state() user = ''; // To be updated with the profile username
  @property({ type: String }) review = '';
  @property({ type: Number }) rating = 0;
  @property({ type: Number }) year = new Date().getFullYear();
  @property({ type: String }) director = '';

  connectedCallback() {
    super.connectedCallback();
    this.user = this.model.profile?.id || 'anonymous';
    console.log(this.user);
  } 
 

  async handleSubmit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as Review;
    data.user = this.user;  // Ensure user is set
    console.log(data.user);
    console.log(data);

    this.dispatchMessage([
      "reviews/add",
      {
        review: data,
        onSuccess: () => {
          this.dispatchEvent(new CustomEvent('review-added', { bubbles: true, composed: true }));
          // Redirect to home view
          this.navigate('/app');
        },
        onFailure: (err: Error) => {
          console.error('Failed to add review:', err);
        }
      }
    ]);
  }

  navigate(href: string) {
    const event = new CustomEvent('navigate', { detail: { href } });
    window.dispatchEvent(event);
  }


  render() {
    return html`
      <form class="entry" @submit="${this.handleSubmit}">
        <label for="movieName">Movie Name:</label>
        <input type="text" id="movieName" name="movieName" required>
        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>
        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="0" max="10" required>
        <label for="year">Year:</label>
        <input type="number" id="year" name="year" value="${this.year}">
        <label for="director">Director:</label>
        <input type="text" id="director" name="director">
        <button type="submit">Submit</button>
      </form>
    `;
  }

  static styles = css`
    .entry {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
    }

    .entry h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .entry form {
      display: flex;
      flex-direction: column;
    }

    .entry label {
      margin-bottom: 10px;
    }

    .entry input[type="text"],
    .entry input[type="number"],
    .entry textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    .entry button[type="submit"] {
      width: auto;
      padding: 8px 20px;
      margin-top: 10px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }

    .entry button[type="submit"]:hover {
      background-color: #0056b3;
    }
  `;
}

define({ 'add-review-view': AddReviewViewElement });
