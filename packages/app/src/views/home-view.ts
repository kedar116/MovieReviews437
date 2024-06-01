import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { View } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { Movie } from 'server/models';

export class HomeViewElement extends View<Model, Msg> {
  @state()
  movies: Movie[] = [];

  constructor() {
    super("blazing:model");
    this.fetchMovies();
  }

  async fetchMovies() {
    const response = await fetch('/api/movies');
    this.movies = await response.json();
  }

  render() {
    return html`
      <section class="movie-list">
        ${this.movies.map(
          movie => html`
            <section class="movie">
              <h2>${movie.name}</h2>
              <h3>${movie.rating}/10</h3>
              <img src="${movie.img}" height="200" width="200">
              <br>
              <a href="/reviews/${movie.name}">Go to Reviews</a>
            </section>
          `
        )}
      </section>
    `;
  }

  static styles = css`
    /* Your CSS styles here */
    h1 {
    background-color: var(--color-background-title);
    color:  var(--color-font-title);
    text-align: center;
    font-size: 28px;
    font-style: bold;
    border: var(--color-title-border);
    font-family: var(--display-font);
    background-size: 10px;
    margin-left: var(--leftright-margins);
    margin-right: var(--leftright-margins);
    }

    h2{
    background-color: var(--color--background-header);
    color: var(--color-font-title);
    font-size: var(--font-size-large);
    font-style: bold;
    border: var(--color-title-border);
    font-family: var(--display-font);
    margin-top: 1em;
    margin-bottom: 0.5em;
    margin-left: var(--leftright-margins);
    margin-right: var(--leftright-margins);
    }

    h3{
    color: var(--color-font-ratings);
    font-size: var(--font-size-large);
    font-style: bold;
    margin-bottom: 1em;
    margin-left: var(--leftright-margins);
    margin-right: var(--leftright-margins);
    }
    
    a{
        color: var(--color-background-links);
        font-size: 18px;
        font-style: bold;
        margin-left: var(--leftright-margins);
        margin-right: var(--leftright-margins);
    }

    body{
        font-family: var(--body-font);
        font-weight: var(--font-weight-light);
        font-size: small;
        font-style: italic;
        margin-left: var(--leftright-margins);
        margin-right: var(--leftright-margins);
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: var(--color-background-title)
    }
    
    .logo-container, .navigation, .user-info {
        display: flex;
        align-items: center;
    }
    
    .navigation ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }
    
    .navigation li {
        margin-left: 20px;
    }
    
    .navigation a {
        text-decoration: none;
        color: var(--color-font-title);
        font-weight: var(--font-weight-bold);
    }
    
    .logo {
        height: 50px;
        margin-right: 10px;
    }
    
    .app-name {
        margin-left: 15em;
        font-size: var(--font-size-large);
        font-weight: var(--font-weight-bold);
        color: var(--color-font-title);
    }
    
    .user-info .avatar {
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
    }
    
    .user-name {
        margin-right: 10px;
        color: var(--color-font-title);
        font-size: var(--font-size-medium);
    }

    .page {
        --page-grid-columns: 6;
        --page-grid-gap: var(--size-spacing-large);
        display: grid;
        grid-template-columns:
        [start] repeat(var(--page-grid-columns), 1fr) [end];
        padding: 0 calc(0.5 * var(--page-grid-gap));
        gap: var(--page-grid-gap);
        align-items: baseline;
        }
        
    .reviews{
        font-size: var(--font-size-medium);
    }
    /* .page > main {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: start / span 4;
    }
         */
        
    .page > header {
    grid-column: start / end;
    }
    .page > main {
    grid-column: span 5;
    }


    table {
        width: 100%;
        border-collapse: collapse;
    }

    table th, table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd; /* Add borders between rows */
    }

    table th {
        background-color: #f2f2f2; /* Light gray background for header row */
    }

    table tr:nth-child(even) {
        background-color: #f2f2f2; /* Alternate row background color */
    }

    table tr:hover {
        background-color: #ddd; /* Highlight row on hover */
    }

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

define({ 'home-view': HomeViewElement });
