import {html, css } from 'lit';
import { define, Form, History, View } from '@calpoly/mustang';
import {  state } from 'lit/decorators.js';
import { Msg } from "../messages";
import { Model } from "../model";
import { Review } from 'server/models';
import resetCSS from "../css/reset";

export class AddReviewViewElement extends View<Model, Msg> {

  @state()
  get reviews(): Review[] {
    return this.model.reviews || [];
  }

  static uses=define({
    "mu-form": Form.Element,
  })


  constructor() {
    super("blazing:model");
    // this.fetchMovies();
    
  }



  render() {
    // const{
    //   movieName,review,rating,year,director
    // } = this.review || ({} as Review);
    console.log("Review",this.reviews);
    console.log(this.reviews)

    const renderDisplayOrForm = () =>{

      return html`
        <mu-form
        .init=${this.reviews}
        @mu-form:submit=${this._handleSubmit}>
        
        <label for="movieName">Movie Name:</label>
        <br>
        <input type="text" id="movieName" name="movieName" required>
        <label for="review">Review:</label>
        <br>
        <textarea id="review" name="review" required></textarea>
        <label for="rating">Rating:</label>
        <br>
        <input type="number" id="rating" name="rating" min="0" max="10" required>
        <label for="year">Year:</label>
        <br>
        <input type="number" id="year" name="year">
        <label for="director">Director:</label>
        <br>
        <input type="text" id="director" name="director">
       
        </mu-form>
  
    `;
    }
    console.log("Review",this.reviews);
    console.log(this.reviews)

    return html`
    <main class="page">
      ${renderDisplayOrForm()}
    </main>
  `
  ;

    
  }

  static styles = [
    resetCSS,
    css`
      :host {
        display: contents;
      }
      main.page {
        display: flex;
        justify-content: center;
        padding: var(--size-spacing-large);
        background: linear-gradient(to right, #f8f9fa, #e9ecef);
        min-height: 75vh;
      }
      mu-form {
        background-color: lightgrey;
        padding: var(--size-spacing-small);
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 1000px;
        width: 100%;
        display: grid;
        gap: var(--size-spacing-medium);
      }
      .form-group {
        margin-bottom: var(--size-spacing-small);
      }
      label {
        display: block;
        margin-bottom: var(--size-spacing-small);
        font-weight: bold;
        color: #333;
        font-size: 18px;
      }
      input[type="text"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: var(--size-spacing-medium);
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 18px;
        background-color: #f8f9fa;
      }
      textarea {
        resize: horizontal;
        min-height: 150px;
      }
      .button-container {
        display: flex;
        justify-content: space-between;
      }
      .fancy-button {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        background-color: #007bff;
        color: #fff;
        font-size: 18px;
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


  _handleSubmit(event: Form.SubmitEvent<Review>) {
    console.log("Submitting form", event);
    if (this.reviews) {
      console.log("entered if statement");
      let r = event.detail as Review;
      console.log("My review is ",r);
      const review=[];
      review.push(r);
      this.dispatchMessage([
        "reviews/add",
        {
          review,
          onSuccess: () => {
            History.dispatch(this, "history/navigate", {
              href: `/app`
            });
          },
          onFailure: (err) => {
            console.log("Error saving review", err);
          }
        }
      ]);
    }
  }
}


    

define({ 'add-review-view': AddReviewViewElement });
