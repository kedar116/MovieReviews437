import { LitElement, html, css, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { View } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Movie } from 'server/models';
import resetCSS from "../css/reset";

export class RankingsViewElement extends View<Model, Msg> {
  @state()
  get movies(): Movie[] {
    return this.model.movies || [];
  }

  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Fetching movies for rankings...");
    this.dispatchMessage(["movies/fetch"]);
  }

  render(): TemplateResult {
    const sortedMovies = [...this.movies].sort((a, b) => b.rating - a.rating);
    
    const renderItem = (movie: Movie, index: number) => {
      const { name, rating } = movie;
      const roundedRating = rating.toFixed(2);

      return html`
        <tr>
          <td>${index + 1}.</td>
          <td>${name}</td>
          <td>${roundedRating}/10</td>
        </tr>
      `;
    };

    return html`
      <section class="rankings">
        <h1>Top Movies</h1>
        <table>
          <tr>
            <th>Rank</th>
            <th>Movies</th>
            <th>Ratings</th>
          </tr>
          ${sortedMovies.map(renderItem)}
        </table>
      </section>
      <h2><a href='/app'>Home</a></h2>
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
        padding: var(--size-spacing-medium);
      }
      header {
        text-align: center;
        font-size: 36px; /* Larger heading font size */
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
      .table-container {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      table {
        width: 100%;
        max-width: 800px;
        border-collapse: collapse;
        font-size: 18px; /* Larger table font size */
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #dddddd;
      }
      th {
        background-color: #007bff;
        color: #ffffff;
        font-size: 20px; /* Larger font size for table headers */
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #f1f1f1;
      }
    `
  ];
}
define({ 'rankings-view': RankingsViewElement });
