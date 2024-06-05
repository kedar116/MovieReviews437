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
import {DisplayViewElement} from "./views/display-view";
import {AddMovieViewElement} from "./views/add-movie-view"
import { BlazingHeaderElement } from "./components/blazing-header";
import {AddReviewViewElement} from "./views/add-review-view";
import { RankingsViewElement } from "./views/rankings-view";

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
    path: "/app/add-movie",
    view: () => html`<add-movie-view></add-movie-view>`
  },
  
  {
    path: "/app/display/:movieName",
    view: (params:Switch.Params) => html`<display-view movieName=${params.movieName}></display-view>`
  },
  {
    path: "/app/add-review",
    view: () => html`
      <add-review-view></add-review-view>
    `
  },
  {
    path: "/app/rankings",
    view: () => html`
      <rankings-view></rankings-view>
    `
  },
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
      super(routes, "blazing:history","blazing:auth");
    }
  },
  "blazing-header": BlazingHeaderElement,
  "profile-view": ProfileViewElement,
  "about-view": AboutViewElement,
  "home-view": HomeViewElement,
  "display-view": DisplayViewElement,
  "add-review-view": AddReviewViewElement,
  "add-movie-view": AddMovieViewElement,
  "rankings-view": RankingsViewElement,
  
});