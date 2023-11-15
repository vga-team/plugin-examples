/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
  // #region these would be passed in by the vis host
  checkIfDataProviderRegisteredDelegate;
  queryDataDelegate;
  // #endregion

  data;

  /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
  obtainHeaderCallback = () => `Data Fetcher`;

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
              Data provider registered: 
              <b>
                  ${
                    this.checkIfDataProviderRegisteredDelegate("demo")
                      ? "true"
                      : "false"
                  }
              </b>
          </span>
          <hr/>
          <button onclick="this?.getRootNode()?.host?.queryData()">Query Data</button>
          <hr/>
          <span>${this.data ?? ""}</span>
      `;
  }

  async queryData() {
    /**
     * A data source should starts with a data type identifier and a colon,
     * which is used for the vis host to determine which registerd data provider should be used to handle the query.
     * Then it should be followed by the main part of the data source, which might usually be a URL.
     * An example of a data source could be like: `"sqlite:path/to/file"`.
     */
    const dataSource = "demo:mock/data/source";

    /**
     * The query object can be anything depending on the data provider.
     * For example, a SQL data provider might use a string of SQL query and a NoSQL data provider might use a custom object.
     */
    const queryObject = {
      note: "This qeury object is fake.",
    };

    this.data = await this.queryDataDelegate(dataSource, queryObject);
    this.renderUI();
  }
}
