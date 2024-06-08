import{a as b,s as D,x as s,i as c,d as p,f as W,b as B,V as h,h as I,O as E,e as N,c as V,g as ee,_ as te}from"./lit-element-7259OEMM.js";import{n as d}from"./property-xHh8v826.js";const re={};function ie(i,t,a){switch(i[0]){case"profile/save":ae(i[1],a).then(r=>{var e,o;t(n=>({...n,profile:r})),(o=(e=i[1]).onSuccess)==null||o.call(e)}).catch(r=>{var e,o;(o=(e=i[1]).onFailure)==null||o.call(e,r)});break;case"profile/select":oe(i[1],a).then(r=>t(e=>({...e,profile:r})));break;case"movies/fetch":ne(a).then(r=>{console.log("i get this : ",r),t(e=>({...e,movies:r}))});break;case"movies/add":se(i[1].movie,a).then(r=>{var e,o;t(n=>({...n,movies:[...n.movies||[],r]})),(o=(e=i[1]).onSuccess)==null||o.call(e,r)}).catch(r=>{var e,o;(o=(e=i[1]).onFailure)==null||o.call(e,r)});break;case"reviews/fetch":le(i[1],a).then(r=>{var e,o;t(n=>({...n,reviews:r})),(o=(e=i[1]).onSuccess)==null||o.call(e,r)}).catch(r=>{var e,o;(o=(e=i[1]).onFailure)==null||o.call(e,r)});break;case"reviews/add":ce(i[1],a).then(r=>{var e,o;t(n=>({...n,reviews:[...n.reviews||[],r]})),(o=(e=i[1]).onSuccess)==null||o.call(e,r)}).catch(r=>{var e,o;(o=(e=i[1]).onFailure)==null||o.call(e,r)});break}}function ae(i,t){return fetch(`/api/profiles/${i.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...b.headers(t)},body:JSON.stringify(i.profile)}).then(a=>{if(a.status===200)return a.json();throw new Error(`Failed to save profile for ${i.id}`)}).then(a=>{if(a)return a})}function oe(i,t){return fetch(`/api/profiles/${i.id}`,{headers:b.headers(t)}).then(a=>{if(a.status===200)return a.json();console.log("Checkpoint",a.body)}).then(a=>{if(a)return console.log("Profile:",a),a})}function ne(i){return console.log("PLEASEE"),fetch("/api/movies",{headers:b.headers(i)}).then(t=>{if(t.status!==200)throw"Failed to load movies";return t.json()}).then(t=>{if(t)return console.log("Movie",t),t})}function se(i,t){console.log("MOVIE",i.movie),console.log(i.movie.name);const a={name:i.movie.name,img:i.movie.img,rating:i.movie.rating,reviewCount:i.movie.reviewCount,reviews:i.movie.reviews,user:t.username};return console.log("WELL2",a),fetch("/api/movies",{method:"POST",headers:{"Content-Type":"application/json",...b.headers(t)},body:JSON.stringify(a)}).then(r=>{if(r.status!==201)throw"Failed to add movie";return r.json()}).then(r=>{if(r)return console.log("Added Movie:",r),r})}function le(i,t){return console.log(i),console.log("Fetching reviews for movie",i.movieName),fetch(`/api/reviews/${i.movieName}`,{headers:b.headers(t)}).then(a=>{if(a.status!==200)throw"Failed to load reviews";return a.json()}).then(a=>{if(a)return console.log("Reviews",a),a})}function ce(i,t){console.log("REVIEW",i.review);const a={movieName:i.review[0].movieName,review:i.review[0].review,rating:i.review[0].rating,year:i.review[0].year,director:i.review[0].director,user:t.username};return console.log("WELL:",a),fetch("/api/reviews",{method:"POST",headers:{"Content-Type":"application/json",...b.headers(t)},body:JSON.stringify(a)}).then(r=>{if(console.log("API response is ",r),r.status===201)return r.json();throw new Error("Failed to save review")})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(i){return d({...i,state:!0,attribute:!1})}var de=Object.defineProperty,L=(i,t,a,r)=>{for(var e=void 0,o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=n(t,a,e)||e);return e&&de(t,a,e),e};const A=class A extends D{constructor(){super(...arguments),this.color="white"}render(){return s`
      <div
        class="avatar"
        style="
        ${this.color?`--avatar-backgroundColor: ${this.color};`:""}
        ${this.src?`background-image: url('${this.src}');`:""}
      ">
        ${this.src?"":this.initial||""}
      </div>
    `}};A.styles=c`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;let u=A;L([d()],u.prototype,"color");L([d()],u.prototype,"src");L([d()],u.prototype,"initial");const x=c`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;var pe=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,w=(i,t,a,r)=>{for(var e=r>1?void 0:r?fe(t,a):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=(r?n(t,a,e):n(e))||e);return r&&e&&pe(t,a,e),e};const K=c`
  slot[name="avatar"] {
    display: block;
    grid-row: 1 / span 4;
  }
  nav {
    display: contents;
    text-align: right;
  }
  nav > * {
    grid-column: controls;
  }
`,U=class U extends D{render(){return s`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
          <dt>Nickname</dt>
          <dd><slot name="nickname"></slot></dd>
          <dt>Home City</dt>
        </dl>
      </section>
    `}};U.styles=[x,K,c`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
      }
      dl {
        display: grid;
        grid-column: key / end;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: key;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: value;
      }
      ::slotted(ul) {
        list-style: none;
        display: flex;
        gap: var(--size-spacing-medium);
      }
    `];let C=U;w([d()],C.prototype,"username",2);const S=class S extends D{render(){return s`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input
              name="avatar"
              type="file"
              @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Nickname</span>
            <input name="nickname" />
          </label>
          <label>
            <span>Color</span>
            <input type="color" name="color" />
          </label>
        </mu-form>
      </section>
    `}_handleAvatarSelected(t){const r=t.target.files[0];new Promise((o,n)=>{const l=new FileReader;l.onload=()=>o(l.result),l.onerror=f=>n(f),l.readAsDataURL(r)}).then(o=>{this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:o}))})}};S.uses=p({"mu-form":W.Element,"input-array":B.Element}),S.styles=[x,K,c`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `];let $=S;w([d()],$.prototype,"username",2);w([d({attribute:!1})],$.prototype,"init",2);const R=class R extends h{constructor(){super("blazing:model"),this.edit=!1,this.id="",this.addEventListener("profile:new-avatar",t=>{this.newAvatar=t.detail})}get profile(){return this.model.profile}attributeChangedCallback(t,a,r){super.attributeChangedCallback(t,a,r),t==="user-id"&&a!==r&&r&&(console.log("Profiler Page:",r),this.dispatchMessage(["profile/select",{id:r}]))}render(){const{color:t,avatar:a,name:r,id:e,nickname:o}=this.profile||{},n=(r||o||e||"?").slice(0,1),l=s`
      <profile-avatar
        slot="avatar"
        color=${t}
        src=${this.newAvatar||a}
        initial=${n}></profile-avatar>
    `;return this.edit?s`
          <profile-editor
            username=${e}
            .init=${this.profile}
            @mu-form:submit=${f=>this._handleSubmit(f)}>
            ${l}
          </profile-editor>
        `:s`
          <profile-viewer username=${e}>
            ${l}
            <span slot="name">${r}</span>
            <span slot="userid">${e}</span>
            <span slot="nickname">${o}</span>
          </profile-viewer>
        `}_handleSubmit(t){console.log("Handling submit of mu-form");const a=this.newAvatar?{...t.detail,avatar:this.newAvatar}:t.detail;this.dispatchMessage(["profile/save",{id:this.id,profile:a,onSuccess:()=>I.dispatch(this,"history/navigate",{href:`/app/profile/${this.id}`}),onFailure:r=>console.log("ERROR:",r)}])}};R.uses=p({"profile-viewer":C,"profile-editor":$,"profile-avatar":u}),R.styles=[x];let v=R;w([d({type:Boolean,reflect:!0})],v.prototype,"edit",2);w([d({attribute:"id",reflect:!0})],v.prototype,"id",2);w([g()],v.prototype,"profile",1);w([g()],v.prototype,"newAvatar",2);const Y=class Y extends h{render(){return s`
      <h1>This is the about page</h1>
      <h3><a href="/app">Go back to home</a></h3>
    `}};Y.styles=c`
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
  `;let _=Y;p({"about-view":_});var he=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,T=(i,t,a,r)=>{for(var e=r>1?void 0:r?ge(t,a):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=(r?n(t,a,e):n(e))||e);return r&&e&&he(t,a,e),e};const q=class q extends h{constructor(){super("blazing:model"),this.username="anonymous",this.authenticated=!1,this._authObserver=new E(this,"blazing:auth")}get movies(){return this.model.movies||[]}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.username!==this.username?(this.username=t.username,this.authenticated=!0,console.log("Fetching movies..."),this.dispatchMessage(["movies/fetch"])):t||(this.authenticated=!1,this.username="anonymous")})}render(){if(!this.authenticated)return s`
        <main class="page">
          <div class="login-message">
            <h1>You must log in to view this content.</h1>
            <a href="login.html" class="signin" @click=${ue}>Sign in</a>
          </div>
        </main>
      `;const t=["#f28b82","#fbbc04","#fff475","#ccff90","#a7ffeb","#cbf0f8","#aecbfa","#d7aefb","#fdcfe8"],a=r=>{const{name:e,img:o,rating:n,reviews:l,reviewCount:f}=r,j=n.toFixed(2),Z=t[Math.floor(Math.random()*t.length)];return console.log("This is it",r,e,o,n,l),s`
        <div class="movie" style="background-color: ${Z};">
          <h2>${e}</h2>
          <img src="${o}" alt="${e}" class="movie-image" />
          <p>Rating: ${j}/10</p> <!-- Display the rounded rating -->
          <p>Reviews: ${f}</p>
          <a href="/app/display/${e}">Go to Reviews</a>
        </div>
      `};return console.log("Rendering movies:",this.movies),s`
      <main class="page">
        <header>
          <h2>Movie List</h2>
        </header>
        <div class="movie-list">
          ${this.movies.map(a)}
        </div>
      </main>
    `}};q.styles=[x,c`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-template-columns: 1fr;
        padding: var(--size-spacing-small) var(--size-spacing-medium);
        gap: var(--size-spacing-medium);
        background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      header {
        text-align: center;
        font-size: 32px; /* Increased font size */
        font-weight: bold;
        margin-bottom: 20px;
        color: #343a40;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
      .movie-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Increased min width of cards */
        gap: var(--size-spacing-large);
      }
      .movie {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: var(--size-spacing-large); /* Increased padding */
        text-align: center;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-size: 18px; /* Increased font size */
      }
      .movie:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
      .movie-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 15px; /* Increased margin */
        transition: transform 0.3s ease;
      }
      .movie-image:hover {
        transform: scale(1.05);
      }
      h2 {
        font-size: 26px; /* Increased font size */
        color: #343a40;
        margin: 15px 0; /* Increased margin */
      }
      .rating {
        font-size: 22px; /* Increased font size */
        color: #ffc107;
        margin: 10px 0;
      }
      .review-count {
        font-size: 20px; /* Increased font size */
        color: #777;
        margin: 10px 0;
      }
      .review-link {
        display: inline-block;
        padding: 12px 25px; /* Increased padding */
        background-color: #007bff;
        color: #ffffff;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.3s ease;
        font-size: 18px; /* Increased font size */
      }
      .review-link:hover {
        background-color: #0056b3;
        transform: scale(1.05);
      }
    `];let m=q;T([g()],m.prototype,"movies",1);T([d()],m.prototype,"username",2);T([g()],m.prototype,"authenticated",2);function ue(i){N.relay(i,"auth:message",["auth/login"])}p({"home-view":m});var ve=Object.defineProperty,me=Object.getOwnPropertyDescriptor,Q=(i,t,a,r)=>{for(var e=r>1?void 0:r?me(t,a):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=(r?n(t,a,e):n(e))||e);return r&&e&&ve(t,a,e),e};const G=class G extends h{constructor(){super("blazing:model"),this.movieName="",console.log("MovieReviewsViewElement constructor called")}get reviews(){return this.model.reviews||[]}connectedCallback(){super.connectedCallback(),console.log("Fetching reviews for movie:",this.movieName),this.dispatchMessage(["reviews/fetch",{movieName:this.movieName,onSuccess:t=>{console.log("Fetched reviews:",t)},onFailure:t=>console.error("Failed to fetch reviews:",t)}])}render(){const t=a=>{const{user:r,review:e,rating:o,year:n,director:l}=a,f=["#f28b82","#fbbc04","#fff475","#ccff90","#a7ffeb","#cbf0f8","#aecbfa","#d7aefb","#fdcfe8"],j=f[Math.floor(Math.random()*f.length)];return s`
          <div class="review" style="background-color: ${j};">
            <h2>(${n})</h2>
            <h2>${r}</h2>
            <p>${e}</p>
            <p>Rating: ${o}/10</p>
            <p>Director: ${l}
          </div>
        `};return console.log("Rendering reviews for movie:",this.movieName,this.reviews),s`
        <main class="page">
          <header>
            <h2>Reviews for ${this.movieName}</h2>
          </header>
          <div class="review-list">
            ${this.reviews.map(t)}
          </div>
          <div class="button-container">
            <a href='/app'><button class="fancy-button">Go back to movies</button></a>
            <a href='/app/add-review'><button class="fancy-button">Click to Add a Review</button></a>
          </div>
        </main>
      `}};G.styles=[x,c`
          :host {
            display: contents;
          }
          main.page {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--size-spacing-large);
            gap: var(--size-spacing-large);
            background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          header {
            text-align: center;
            font-size: 32px; /* Increased font size */
            font-weight: bold;
            margin-bottom: 20px;
            color: #343a40;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          }
          .review-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: var(--size-spacing-large);
            width: 100%;
          }
          .review {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: var(--size-spacing-medium);
            text-align: center;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .review:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }
          .review h2 {
            font-size: 24px;
            color: #343a40;
            margin: 10px 0;
          }
          .review p {
            font-size: 18px;
            color: #333;
            margin: 10px 0;
          }
          .review .rating {
            font-size: 20px;
            color: #ffc107;
            margin: 10px 0;
          }
          .button-container {
            display: flex;
            justify-content: center;
            gap: var(--size-spacing-large);
          }
          .fancy-button {
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #ffffff;
            font-size: 20px;
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
        `];let y=G;Q([d({type:String})],y.prototype,"movieName",2);Q([g()],y.prototype,"reviews",1);p({"display-view":y});const H=class H extends h{render(){return s`
        <h1>Hi</h1>
      `}};H.styles=c`
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
`;let P=H;p({"add-movie-view":P});var be=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,X=(i,t,a,r)=>{for(var e=r>1?void 0:r?xe(t,a):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=(r?n(t,a,e):n(e))||e);return r&&e&&be(t,a,e),e};const F=class F extends h{constructor(){super("blazing:model"),this.username="anonymous",this._authObserver=new E(this,"blazing:auth")}get profile(){return this.model.profile}connectedCallback(){super.connectedCallback(),this._authObserver.observe(({user:t})=>{t&&t.username!==this.username?(this.username=t.username,this.dispatchMessage(["profile/select",{id:this.username}])):t||(this.username="anonymous")})}render(){const{avatar:t,name:a,nickname:r,id:e,color:o}=this.profile||{},n=(r||a||e||"?").slice(0,1),l=`/app/profile/${e}/edit`;return console.log("Rendering header for Profile:",this.profile),s`
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
          ${this.username!=="anonymous"?s`
            <drop-down>  
              <a href="#" slot="actuator">
                <slot name="greeting">Hello, ${this.username}</slot>
              </a>
              <ul>
                <li>
                  <profile-avatar
                    color=${o}
                    src=${t}
                    initial="${n}"></profile-avatar>
                </li>
                <li><h3>${a||r||e}</h3></li>
                <li>
                  <label @change=${we}>
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                  </label>
                </li>
                <li>
                  <a href=${l}>Edit Profile</a>
                </li>
                <li>
                  <a href="#" class="signout" @click=${ye}>Sign out</a>
                </li>
              </ul>
            </drop-down>
          `:s`
            <a href="login.html" class="signin" @click=${$e}>Sign in</a>
          `}
        </div>
      </header>
    `}};F.uses=p({"drop-down":V.Element,"profile-avatar":u}),F.styles=c`
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
  `;let k=F;X([d()],k.prototype,"username",2);X([g()],k.prototype,"profile",1);function we(i){const a=i.target.checked;N.relay(i,"dark-mode",{checked:a})}function ye(i){N.relay(i,"auth:message",["auth/signout"])}function $e(i){N.relay(i,"auth:message",["auth/login"])}var ke=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Oe=(i,t,a,r)=>{for(var e=ze(t,a),o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=n(t,a,e)||e);return e&&ke(t,a,e),e};const M=class M extends h{get reviews(){return this.model.reviews||[]}constructor(){super("blazing:model")}render(){console.log("Review",this.reviews),console.log(this.reviews);const t=()=>s`
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
  
    `;return console.log("Review",this.reviews),console.log(this.reviews),s`
    <main class="page">
      ${t()}
    </main>
  `}_handleSubmit(t){if(console.log("Submitting form",t),this.reviews){console.log("entered if statement");let a=t.detail;console.log("My review is ",a);const r=[];r.push(a),this.dispatchMessage(["reviews/add",{review:r,onSuccess:()=>{I.dispatch(this,"history/navigate",{href:"/app"})},onFailure:e=>{console.log("Error saving review",e)}}])}}};M.uses=p({"mu-form":W.Element}),M.styles=[x,c`
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
    `];let z=M;Oe([g()],z.prototype,"reviews");p({"add-review-view":z});var Ce=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,Pe=(i,t,a,r)=>{for(var e=_e(t,a),o=i.length-1,n;o>=0;o--)(n=i[o])&&(e=n(t,a,e)||e);return e&&Ce(t,a,e),e};const J=class J extends h{get movies(){return this.model.movies||[]}constructor(){super("blazing:model")}connectedCallback(){super.connectedCallback(),console.log("Fetching movies for rankings..."),this.dispatchMessage(["movies/fetch"])}render(){const t=[...this.movies].sort((r,e)=>e.rating-r.rating),a=(r,e)=>{const{name:o,rating:n}=r,l=n.toFixed(2);return s`
        <tr>
          <td>${e+1}.</td>
          <td>${o}</td>
          <td>${l}/10</td>
        </tr>
      `};return s`
      <section class="rankings">
        <h1>Top Movies</h1>
        <table>
          <tr>
            <th>Rank</th>
            <th>Movies</th>
            <th>Ratings</th>
          </tr>
          ${t.map(a)}
        </table>
      </section>
      <h2><a href='/app'>Home</a></h2>
    `}};J.styles=[x,c`
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
    `];let O=J;Pe([g()],O.prototype,"movies");p({"rankings-view":O});const Se=[{path:"/app/profile/:id",view:i=>s`
      <profile-view user-id=${i.id}></profile-view>
    `},{path:"/app/about",view:()=>s`
      <about-view></about-view>
    `},{path:"/app/add-movie",view:()=>s`<add-movie-view></add-movie-view>`},{path:"/app/display/:movieName",view:i=>s`<display-view movieName=${i.movieName}></display-view>`},{path:"/app/add-review",view:()=>s`
      <add-review-view></add-review-view>
    `},{path:"/app/rankings",view:()=>s`
      <rankings-view></rankings-view>
    `},{path:"/app",view:()=>s`
    <home-view></home-view>
    `},{path:"/",redirect:"/app"}];p({"mu-auth":b.Provider,"mu-history":I.Provider,"mu-store":class extends ee.Provider{constructor(){super(ie,re,"blazing:auth")}},"mu-switch":class extends te.Element{constructor(){super(Se,"blazing:history","blazing:auth")}},"blazing-header":k,"profile-view":v,"about-view":_,"home-view":m,"display-view":y,"add-review-view":z,"add-movie-view":P,"rankings-view":O});function Re(i,t){i.classList.toggle("dark-mode",t)}document.body.addEventListener("dark-mode",i=>Re(i.currentTarget,i.detail.checked));
