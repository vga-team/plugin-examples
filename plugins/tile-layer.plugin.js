/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
  // #region these would be passed in by the vis host
  leaflet;
  addMapLayerDelegate;
  // #endregion

  // #region these are the props passed from the config file
  layerName;
  layerType;
  active;
  urlTemplate;
  options;
  // #endregion

  /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
  obtainHeaderCallback = () => `Tile Layer`;

  /** This would be called when the vis host is loaded at the first time. */
  hostFirstLoadedCallback() {
    const tileLayer = this.leaflet?.tileLayer(this.urlTemplate, this.options);
    this.addMapLayerDelegate?.(
      tileLayer,
      this.layerName,
      this.layerType,
      this.active
    );
  }
}
