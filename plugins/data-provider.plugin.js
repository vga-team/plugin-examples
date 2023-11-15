/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
  // #region these would be passed in by the vis host
  notifyLoadingDelegate;
  // #endregion

  /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
  obtainHeaderCallback = () => `Data Provider`;

  /** For a data provider plugin, this should be implemented and return a list of data identifiers (type of data) that can be handled by this plugin. */
  obtainDataProviderIdentifiersCallback = () => ["demo"];

  /**
   * For a data provider plugin, this should be implemented.
   * It would be called when another plugin tries to query data for data types that registered by this plugin.
   */
  queryDataCallback = async (_identifier, _dataSource, _queryObject) => {
    // A plugin can ask the vis host to show a loading prompt by calling `notifyLoadingDelegate`,
    // which returns a callback that can be called when the time consuming task is finished.
    const EndLoadingDelegate = this.notifyLoadingDelegate?.();
    await this.timeKiller(2000);
    EndLoadingDelegate?.();
    return [1, 2, 3, 4, 5];
  };

  async timeKiller(timeout) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, timeout)
    );
  }
}
