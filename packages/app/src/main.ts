import { Auth, History, Store, Switch, define } from "@calpoly/mustang";
// @ts-ignore
import { Msg } from "./messages";
import { html } from "lit";
import { Model, init } from "./model";
// @ts-ignore
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { AboutViewElement } from "./views/about-view";
import { HomeViewElement } from "./views/home-view";
import {MovieReviewsViewElement} from "./views/movie-reviews-view";
// import {AddMovieViewElement} from "./views/add-movie-view"
import { BlazingHeaderElement } from "./components/blazing-header";
import {AddReviewViewElement} from "./views/add-review-view";

const routes = [
  
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/about",
    view: () => html`
      <about-view></about-view>
    `
  },
  {
    path: "app/add-movie",
    view: () => html`<add-movie-view></add-movie-view>`
  },
  // {
  //   path: "app/reviews/:movieName",
  //   view: (params) => html`<movie-reviews-view movieName=${params.movieName}></movie-reviews-view>`
  // },
  // {
  //   path: "app/add-review/:movieName",
  //   view: (params) => html`<add-review-view movieName=${params.movieName}></add-review-view>`
  // },
  {
    path: "/app",
    view: () => html`
    <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];


define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },

  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history");
    }
  },
  "blazing-header": BlazingHeaderElement,
  "profile-view": ProfileViewElement,
  "about-view": AboutViewElement,
  "home-view": HomeViewElement,
  "movie-reviews-view": MovieReviewsViewElement,
  "add-review-view": AddReviewViewElement,
  // "add-movie-view": AddMovieViewElement
  
});