/** Custom libraries can be imported and used inside a plugin implementation. */
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * A valid plugin file needs to be an ES module and export a default class that extends `HTMLElement`.
 * Basically, it should be ready to be loaded as a [web component](https://developer.mozilla.org/en-US/docs/web/web_components).
 * The inner content of the HTML element would be shown as the plugin's UI.
 */
export default class extends HTMLElement {
  /** This is a mandatory method to be implemented that returns the header of the plugin to be shown. */
  obtainHeaderCallback = () => `D3.js Demo`;

  constructor() {
    super();
    const renderRoot = this.attachShadow({ mode: "open" });
    this.useD3ToRenderSomeContent(renderRoot);
  }

  useD3ToRenderSomeContent(renderRoot) {
    // code taken from: https://observablehq.com/@d3/smooth-zooming
    const height = 500;
    const width = 500;
    const radius = 6;
    const step = 12;
    const theta = Math.PI * (3 - Math.sqrt(5));
    const data = Array.from({ length: 2000 }, (_, i) => {
      const r = step * Math.sqrt((i += 0.5)),
        a = theta * i;
      return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
    });

    let currentTransform = [width / 2, height / 2, height];

    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / 360));

    function transition() {
      const d = data[Math.floor(Math.random() * data.length)];
      const i = d3.interpolateZoom(currentTransform, [...d, radius * 2 + 1]);

      g.transition()
        .delay(250)
        .duration(i.duration)
        .attrTween(
          "transform",
          () => (t) => transform((currentTransform = i(t)))
        )
        .on("end", transition);
    }

    function transform([x, y, r]) {
      return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `;
    }

    svg.style("height", "100%").style("width", "100%");
    renderRoot.append(svg.call(transition).node());
  }
}
