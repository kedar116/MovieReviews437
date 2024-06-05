import { LitElement, html, css } from 'lit';
import { define, Form, History, View } from '@calpoly/mustang';
import { property, state } from 'lit/decorators.js';
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
        <input type="text" id="movieName" name="movieName" required>
        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>
        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" min="0" max="10" required>
        <label for="year">Year:</label>
        <input type="number" id="year" name="year">
        <label for="director">Director:</label>
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
        padding: var(--size-spacing-medium);
      }
      mu-form {
        background-color: #fff;
        padding: var(--size-spacing-large);
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 100%;
      }
      .form-group {
        margin-bottom: var(--size-spacing-medium);
      }
      label {
        display: block;
        margin-bottom: var(--size-spacing-small);
        font-weight: bold;
        color: #333;
      }
      input[type="text"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: var(--size-spacing-small);
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }
      textarea {
        resize: vertical;
      }
      button[type="submit"] {
        width: 100%;
        padding: var(--size-spacing-small);
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      button[type="submit"]:hover {
        background-color: #0056b3;
      }
      button[type="submit"]:active {
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
