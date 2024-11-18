import { LitElement, html, css } from "lit";

export class ElementImage extends LitElement {

    constructor() {
      super();
      this.title = '';
      this.imageSrc = '';
      this.description = '';
    }
  
    static get properties() {
      return {
        imageSrc: { type: String, Reflect: true },
        title: { type: String },
        description: { type: String },
        dateUpdated: { type: String },
        pageLink: { type: String },
        pageHtml: { type: String },
        readTime: { type: String },
      };
    }

    static get styles() {
        return [css`
        
    
        .image {
        display: inline-block;
        }
    
        .image div {
        max-width: 200px;
        font-size: 16px;
        font-weight: bold;
        }
    
        .image img {
        display: block;
        width: 200px;
        height: 200px;
        }
        .description {
          font-size: 14px;
          margin-top: 4px;
        }
        `];
      }
    
      render() {
        return html`
          <div class="image">
            <img src="${this.item}" alt="${this.title}" />
            <div>${this.title}</div>
            <div class="description">${this.description}</div>
            ${this.dateUpdated
              ? html`<div class="date">Updated: ${this.dateUpdated}</div>`
              : ""}
            ${this.readTime
              ? html`<div class="read-time">Read Time: ${this.readTime}</div>`
              : ""}
            <a href="${this.pageLink}" target="_blank">View Page</a>
            <a href="${this.pageHtml}" target="_blank">View HTML</a>
          </div>
        `;
      }
      static get tag() {
        return "element-image";
      }
    }

customElements.define(ElementImage.tag, ElementImage);