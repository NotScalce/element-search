import { LitElement, html, css } from 'lit';
import "./element-image.js";
import { ifDefined } from 'lit/directives/if-defined.js';
export class ElementSearch extends LitElement {


  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
      url: { type: String }
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
    this.value = " ";
    this.title = '';
    this.loading = false;
    this.items = [];
    this.url = '';
  }

  getImgSrc(item) {
    const baseUrl = this.url.endsWith("/") ? this.url : `${this.url}/`;
  
    if (item.files && item.files.length > 0) {
      const imageFile = item.files.find(file => file.type === "image");
      if (imageFile && imageFile.fullUrl) {
        return `${baseUrl}${imageFile.fullUrl.replace(/^\//, '')}`;
      }
    }
    return item.imageUrl ? item.imageUrl : "https://via.placeholder.com/200";
  }

  dateToString(date) {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
  }

  render() {
    if(this.value == ''){this.value = 'https://haxtheweb.org/site.json';}
    else if (!this.value || !this.value.endsWith('site.json')) {this.value+='site.json';}

    return html`
    <h2>${this.title}</h2>
      <div class="searchInput">
        <input id="input" placeholder="Enter search or web address" @input="${this.inputChanged}" />
        <button @click="${this.handleSearch}" class="analyzeButton">Analyze</button>
      </div>
    <div class="results">
      ${this.items.map((item, index) => html`
        <a href='${this.value}${item.slug}' target="_blank" class="container">
        <element-image
          title="${item.title}"
          description="${item.description}"
          imageSrc='${ifDefined(this.getImgSrc(item))}' 
          dateUpdated='${this.dateToString(item.metadata.updated)}'
          pageLink='${this.value}${item.slug}'
          pageHtml='${this.value}${item.location}'
          readTime='${item.metadata.readTime}'
        ></element-image></a>
      `)}
    </div>
    `;
  }

  // For image source put url + fullUrl

  handleSearch() {
    this.value = this.shadowRoot.querySelector('#input').value;
    if (this.value) {
      this.updateResults(this.value);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`${this.value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data) {
        console.log(data)
        this.items = [];
        this.items = data.items;
        this.loading = false;
      }
      });
  }

  static get tag() {
    return 'element-search';
  }

}
globalThis.customElements.define(ElementSearch.tag, ElementSearch);