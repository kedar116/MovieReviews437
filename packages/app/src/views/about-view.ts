import { define, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class AboutViewElement extends View<Model,Msg> {
  static styles = css`
    h1 {
      font-family: 'Roboto', sans-serif;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-family: 'Roboto', sans-serif;
      font-size: 1.5rem;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <h1>This is the about page</h1>
      <h3><a href="/app">Go back to home</a></h3>
    `;
  }
}

define({ "about-view": AboutViewElement });