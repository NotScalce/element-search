import { html, fixture, expect } from '@open-wc/testing';
import "../element-search.js";

describe("elementSearch test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <element-search
        title="title"
      ></element-search>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
