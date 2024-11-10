import { DDDSuper } from "@haxtheweb/d-d-d";
import { css, LitElement } from "lit";
import "./element-search.js";

class JsonAnalyzer extends DDDSuper(LitElement){
    static get styles(){
        return css`
            :host{
                display: block;
            }
            .map`
    }

    static get properties() {
        return{
            url: { type: String }
        };
    }

    constructor(){
        super();
        this.url = 'https://haxtheweb.org/site.json';
    }

    render(){
        if(this.url == ''){this.url = 'https://haxtheweb.org/site.json';}
        else if (!this.url || !this.url.endsWith('site.json')) {this.url+='site.json';}

        return html`
            <h2>${this.title}</h2>
            <div class="searchInput">
                <input id="input" placeholder="Enter search or web address" @input="${this.inputChanged}" />
                <button @click="${this.handleSearch}" class="analyzeButton">Analyze</button>
            </div>
    `;
  } 

  handleSearch() {
    if (this.value) {
      this.updateResults(this.value);
    }
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://haxtheweb.org${value}`)
      .then(d => d.ok ? d.json() : {})
      .then(data => {
        if (data.collection) {
          this.items = data.collection.items.slice(0, 6);
        }
        this.loading = false;
      });
  }

  static get tag() {
    return 'element-search';
  }

  static get tag() {
    return 'element-search';
  }
    //global elements tag
}