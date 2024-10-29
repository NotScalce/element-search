import { LitElement, html, css } from 'lit';
import "./element-image.js";
export class ElementSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
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
        display: flex;
        flex-wrap: wrap;
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
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
        overflow: hidden;
        transition: transform 0.3s ease, background-color 0.3s ease;
        background-color: white; 
        text-decoration: none; 
        margin: 4px;
      }
      .container:hover {
        margin: 4px;
        transform: scale(1.1);
        background-color: lightblue; 
      }
      .searchInput {
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>
      <div class="searchInput">
        <input id="input" placeholder="Enter search or web address" @input="${this.inputChanged}" />
        <button>Analyze</button>
      </div>
    <div class="results">
      ${this.items.map((item, index) => html`
      <a href="${item.links[0].href}" target="_blank" class="container">
        <element-image
          source="${item.links[0].href}"
          title="${item.data[0].title}"
        ></element-image></a>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => { //change to input search
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