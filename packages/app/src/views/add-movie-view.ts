import { html, css } from 'lit';
import { define, View } from '@calpoly/mustang';
import { Model } from "../model";
import { Msg } from "../messages";


export class AddMovieViewElement extends View<Model, Msg> {

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

    render() {
      return html`
        <h1>Hi</h1>
      `;
    }
  
    
}

define({ 'add-movie-view': AddMovieViewElement });
