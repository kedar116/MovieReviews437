import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { Model } from "../model";
import { Movie } from 'server/models';

@customElement('add-movie-view')
class AddMovieViewElement extends LitElement {
  @property({ type: String }) movieName = '';
  @state() movie = { name: '', rating: '', img: '', reviews: '' };
  
  async _handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const newReview = {
      name: formData.get('name') as string,
      rating: parseFloat(formData.get('rating') as string),
      img: formData.get('img') as string,
      reviews: formData.get('reviews') as string,
    };

    // Save the review to the backend
    await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });

    // Navigate to the home view after saving
    window.location.href = '/';
  }

  render() {
    return html`
      <div class="entry">
        <h1>Add a New Movie Review</h1>
        <form @submit=${this._handleSubmit}>
          <label for="name">Movie Name:</label>
          <input type="text" id="name" name="name" required>
          
          <label for="rating">Rating:</label>
          <input type="number" id="rating" name="rating" min="0" max="10" step="0.1" required>

          <label for="img">Image URL:</label>
          <input type="text" id="img" name="img" required>

          <label for="reviews">User Review:</label>
          <textarea id="reviews" name="reviews" rows="4" cols="50" required></textarea>
          
          <input type="submit" value="Submit">
        </form>
      </div>
    `;
  }

  static styles = css`
    .entry {
      width: 50%;
      margin: 0 auto;
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

    .entry input[type="submit"] {
      width: auto;
      padding: 8px 20px;
      margin-top: 10px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }

    .entry input[type="submit"]:hover {
      background-color: #0056b3;
    }
  `;
}

define({ 'add-movie-view': AddMovieViewElement });
