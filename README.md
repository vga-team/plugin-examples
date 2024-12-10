# plugin-examples

Examples of implementing VGA plugins as well as a minimal example of creating a VGA app.

## Background Knowledge

### Plugins Implementation

A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
The inner content of the HTML element would be shown as the plugin's UI.

A set of APIs are provided by the VGA core and can be used by plugins. Take a look at [here](https://github.com/vga-team/core/blob/main/src/utils/plugin.ts) to learn more.

### Load A Plugin

To load a plugin, defining it in the `imports` property and add its config into the `plugins` property of vis host config is required. The `props` of a plugin config object is for passing any plugin specified properties.

In this example repo, a `config.json` file is used and it would be load into the `config` property of the vis host.

## File Structure

- `index.html` is the entry point of the project.
- `vga-core.js` is the library to be imported by `index.html`. After imported, a `<vga-core>` HTML tag can be used and it will accept a property `config`.
- `config.json` is a sample config file that is fetched by a script from `index.html` and loaded into the `gwf-core` element.
- `plugins/` is a directory that contians demo plugins.
  - `data-fetcher.plugin.js` is a sample plugin that fetch and display the data from the data provider.
  - `data-provider.plugin.js` is a sample plugin that registered as a data provider. When the data is queried, it mocks some waiting time and returns an array of number.
  - `shared-state.plugin.js` is a sample plugin that has a shared value across plugins. When the shared value is updated, all the instances of this plugin would be updated with the new value.
  - `tile-layer.plugin.js` is a sample plugin that adds a map layer into the vis. It also shows how the props from the config file is passed in and used.
  - `d3.plugin.js` is a sample plugin that shows how to import an external library to implement advanced features.

## How to Start

Just host the project directory using any HTTP server as a static site and then access it using the browser.

If changes of the code are not applied after refreshing the page, disabling the cache in the HTTP server config might be helpful. For example, if NPM `http-server` is used as the dev server, add `-c-1` to set the cache time to -1 second.

```sh
npx http-server -c-1
```
