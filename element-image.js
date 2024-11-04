import { LitElement, html, css } from "lit";

export class ElementImage extends LitElement {

    constructor() {
      super();
      this.title = '';
      this.source = '';
      this.description = '';
    }
  
    static get properties() {
      return {
          source: { type: String },
          title: { type: String },
          description: { type: String },
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
            <img src="${this.source}" />
            <div>${this.title}</div>
            <div class="description">${this.description}</div>
        </div>
        `;
      }
      static get tag() {
        return "element-image";
      }
    }

customElements.define(ElementImage.tag, ElementImage);