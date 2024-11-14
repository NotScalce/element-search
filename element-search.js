import { LitElement, html, css } from 'lit';
import "./element-image.js";
export class ElementSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
      jsonUrl: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        justify-content: center;
        align-items: center;
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: 0.5s all ease-in-out;
      }

      details {
        margin: 16px;
        padding: 16px;
        background-color: blue;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }
      .container {
        overflow: scroll;
        transition: transform 0.3s ease, background-color 0.3s ease;
        background-color: white; 
        text-decoration: none; 
        margin: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
      }
      .container:hover {
        margin: 4px;
        transform: scale(1.1);
        background-color: lightblue; 
      }
      .searchInput {
        align-items: center;
        display: flex;
      }
      #input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        display: block;
        border-radius: 8px;
      }
      
      .analyzeButton {background-image: linear-gradient(to right, #2b5876 0%, #4e4376  51%, #2b5876  100%)}
         .analyzeButton {
            margin: 20px;
            padding: 15px 45px;
            text-align: center;
            text-transform: uppercase;
            transition: 0.5s;
            background-size: 200% auto;
            color: white;            
            box-shadow: 0 0 20px #eee;
            border-radius: 10px;
            display: block;
          }
          .analyzeButton:hover {
            background-position: right center; /* change the direction of the change here */
            color: #fff;
            text-decoration: none;
          }
         
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
    this.jsonUrl = '';
  }

  render() {
    if(this.url == ''){this.url = 'https://haxtheweb.org/site.json';}
    else if (!this.url || !this.url.endsWith('site.json')) {this.url+='site.json';}

    return html`
    <h2>${this.title}</h2>
      <div class="searchInput">
        <input id="input" placeholder="Enter search or web address" @input="${this.inputChanged}" />
        <button @click="${this.handleSearch}" class="analyzeButton">Analyze</button>
      </div>
    <div class="results">
      ${this.items.map((item, index) => html`
      <a href="${item.links[0].href}" target="_blank" class="container">
        <element-image
          source="${item.links[0].href}"
          title="${item.data[0].title}"
          description="${item.data[0].description}"
        ></element-image></a>
      `)}
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
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }
      });
  }

  static get tag() {
    return 'element-search';
  }

}
globalThis.customElements.define(ElementSearch.tag, ElementSearch);