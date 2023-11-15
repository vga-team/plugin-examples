/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
  // #region these would be passed in by the vis host
  #sharedStates;
  get sharedStates() {
    return this.#sharedStates;
  }
  set sharedStates(value) {
    this.#sharedStates = value;
    this.renderUI();
  }

  updateSharedStatesDelegate;
  // #endregion

  /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
  obtainHeaderCallback = () => `Shared State`;

  /** This would be called when the vis host is loaded at the first time. */
  hostFirstLoadedCallback() {
    this.renderUI();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  renderUI() {
    this.shadowRoot.innerHTML = /* html */ `
          <span>
              The shared value is: 
              <b>${this.sharedStates["demo.value"]}</b>
          </span>
          <hr/>
          <input type="text" placeholder="enter anything here..." />
          <br/>
          <button>Upate shared value</button>
      `;
    this.shadowRoot.querySelector("button")?.addEventListener("click", () => {
      const value = this.shadowRoot.querySelector("input")?.value;
      this.updateSharedStatesDelegate?.({
        ...this.sharedStates,
        "demo.value": value,
      });
    });
  }
}
