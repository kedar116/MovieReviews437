import { LitElement, css, html } from "lit";
import { Auth, Dropdown, define } from "@calpoly/mustang";
import { Events, Observer, View } from "@calpoly/mustang";

import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { ProfileAvatarElement } from "./profile-avatar";

export class BlazingHeaderElement extends View<Model, Msg> {

  static uses = define({
    "drop-down": Dropdown.Element,
    "profile-avatar": ProfileAvatarElement
  });

  @property()
  username = "anonymous";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.dispatchMessage([
          "profile/select",
          { id: this.username }
        ]);
      } else if (!user) {
        this.username = "anonymous";
      }
    });
  }

  

  render() {
    const { avatar, name, nickname, id, color } =
      this.profile || {};
    const initial = (nickname || name || id || "?").slice(
      0,
      1
    );
    const editProfileHref = `/app/profile/${id}/edit`;
    console.log("Rendering header for Profile:", this.profile);
    return html`
      <header>
        <div class="logo-container">
          <img src="logo.png" alt="The Movie Finder  Logo" class="logo">
          <span class="app-name">The Cinema Critic</span>
        </div>
        <nav class="navigation">
        <ul>
          <li><a href="/app">Home</a></li>
          <li><a href="/app/about">About</a></li>
          <li><a href="/app/add-review">Add Review</a></li>
          <li><a href="/app/rankings">Rankings</a></li>
        </ul>
      </nav>
        <div class="custom">
          <h1>Your Profile</h1>
          ${this.username !== "anonymous" ? html`
            <drop-down>  
              <a href="#" slot="actuator">
                <slot name="greeting">Hello, ${this.username}</slot>
              </a>
              <ul>
                <li>
                  <profile-avatar
                    color=${color}
                    src=${avatar}
                    initial="${initial}"></profile-avatar>
                </li>
                <li><h3>${name || nickname || id}</h3></li>
                <li>
                  <label @change=${toggleDarkMode}>
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                  </label>
                </li>
                <li>
                  <a href=${editProfileHref}>Edit Profile</a>
                </li>
                <li>
                  <a href="#" class="signout" @click=${signOutUser}>Sign out</a>
                </li>
              </ul>
            </drop-down>
          ` : html`
            <a href="login.html" class="signin" @click=${signInUser}>Sign in</a>
          `}
        </div>
      </header>
    `;
  }

  static styles = css`
    /* Header styles */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: var(--color-background-title);
        width: 100%;
        box-sizing: border-box; 
    }

    .logo-container, .user-info {
        display: flex;
        align-items: center;
    }

    .logo {
        height: 50px;
        margin-right: 10px;
    }

    .app-name {
        font-size: 23px;
        font-weight: var(--font-weight-bold);
        color: var(--color-font-title);
        margin-left: 400px; 
    }

    .navigation {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        margin: 0 20px;
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
        font-size: 18px;
    }

    .user-info {
        display: flex;
        align-items: center;
    }

    .user-info .avatar {
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
    }

    .custom {
        grid-column: start / end;
        margin: 0 calc(-0.5 * var(--page-grid-gap));
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
    }

    .custom a[href] {
        color: var(--color-link);
        font-weight: var(--font-weight-bold);
        font-size: 16px;
    }

    .signout {
        color: black;
        font-weight: var(--font-weight-bold);
    }

    .signout:hover {
        color: #ff0000;
    }

    .signin {
        color: black;
        font-weight: var(--font-weight-bold);
    }

    .signin:hover {
        color: #007bff;
    }

    .user-name {
        margin-right: 10px;
        color: var(--color-font-title);
        font-size: var(--font-size-medium);
    }

    :host {
        display: block;
        width: 100%;
    }

    * {
        margin: 0;
        box-sizing: border-box;
    }

    h1 {
        background-color: var(--color-background-title);
        color: var(--color-font-title);
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        border: var(--color-title-border);
        font-family: var(--display-font);
        background-size: 10px;
        margin-left: var(--leftright-margins);
        margin-right: var(--leftright-margins);
    }

    .custom ul {
        list-style: none;
        padding: var(--size-spacing-medium);
    }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;
  Events.relay(ev, "dark-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

function signInUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/login"]);
}
