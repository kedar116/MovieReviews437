import{d as c,r as u,s as d,x as m,i as f,e as h,a as g}from"./lit-element-7259OEMM.js";import{n as p}from"./property-xHh8v826.js";var _=Object.defineProperty,v=(n,e,s,i)=>{for(var r=void 0,o=n.length-1,l;o>=0;o--)(l=n[o])&&(r=l(e,s,r)||r);return r&&_(e,s,r),r};c({"restful-form":u.FormElement});const a=class a extends d{constructor(){super(...arguments),this.message=""}render(){return m`
      <restful-form
        new
        .init=${{username:"",password:""}}
        src="/auth/login"
        @mu-rest-form:created=${this._handleSuccess}
        @mu-rest-form:error=${this._handleError}>
        <slot></slot>
      </restful-form>
      <p class="error">
        ${this.message?"Invalid Username or Password":""}
      </p>
      <pre>${this.message}</pre>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}_handleSuccess(e){const s=e.detail,{token:i}=s.created,r=this.next||"/";console.log("Login successful",s,r),h.relay(e,"auth:message",["auth/signin",{token:i,redirect:r}])}_handleError(e){const{error:s}=e.detail;console.log("Login failed",e.detail),this.message=s.toString()}};a.styles=f`
    .error {
      color: firebrick;
    }
  `;let t=a;v([p()],t.prototype,"message");c({"mu-auth":g.Provider,"login-form":t});
