import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { define, View } from '@calpoly/mustang';
import { Model } from "../model";
import { Msg } from "../messages";
import { Movie } from 'server/models';

export class AddMovieViewElement extends View<Model, Msg> {

    @property({ type: String }) movieName = '';
    @property({ type: String }) img = '';
    @property({ type: Number }) rating = 0;
  
    async handleSubmit(e: Event) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
  
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        this.dispatchEvent(new CustomEvent('movie-added', { bubbles: true, composed: true }));
      }
    }
  
    render() {
      return html`
        <form @submit="${this.handleSubmit}">
          <label for="movieName">Movie Name:</label>
          <input type="text" id="movieName" name="name" required>
          <label for="img">Image URL:</label>
          <input type="text" id="img" name="img" required>
          <label for="rating">Rating:</label>
          <input type="number" id="rating" name="rating" min="0" max="10" required>
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
    .entry input[type="number"] {
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

define({ 'add-movie-view': AddMovieViewElement });
