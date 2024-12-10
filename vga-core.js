/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = window, Gi = Ve.ShadowRoot && (Ve.ShadyCSS === void 0 || Ve.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yi = Symbol(), po = /* @__PURE__ */ new WeakMap();
let Ao = class {
  constructor(r, s, h) {
    if (this._$cssResult$ = !0, h !== Yi)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = r, this.t = s;
  }
  get styleSheet() {
    let r = this.o;
    const s = this.t;
    if (Gi && r === void 0) {
      const h = s !== void 0 && s.length === 1;
      h && (r = po.get(s)), r === void 0 && ((this.o = r = new CSSStyleSheet()).replaceSync(this.cssText), h && po.set(s, r));
    }
    return r;
  }
  toString() {
    return this.cssText;
  }
};
const ls = (l) => new Ao(typeof l == "string" ? l : l + "", void 0, Yi), Lt = (l, ...r) => {
  const s = l.length === 1 ? l[0] : r.reduce((h, u, _) => h + ((p) => {
    if (p._$cssResult$ === !0)
      return p.cssText;
    if (typeof p == "number")
      return p;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + p + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(u) + l[_ + 1], l[0]);
  return new Ao(s, l, Yi);
}, hs = (l, r) => {
  Gi ? l.adoptedStyleSheets = r.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet) : r.forEach((s) => {
    const h = document.createElement("style"), u = Ve.litNonce;
    u !== void 0 && h.setAttribute("nonce", u), h.textContent = s.cssText, l.appendChild(h);
  });
}, _o = Gi ? (l) => l : (l) => l instanceof CSSStyleSheet ? ((r) => {
  let s = "";
  for (const h of r.cssRules)
    s += h.cssText;
  return ls(s);
})(l) : l;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Di;
const qe = window, mo = qe.trustedTypes, us = mo ? mo.emptyScript : "", go = qe.reactiveElementPolyfillSupport, Vi = { toAttribute(l, r) {
  switch (r) {
    case Boolean:
      l = l ? us : null;
      break;
    case Object:
    case Array:
      l = l == null ? l : JSON.stringify(l);
  }
  return l;
}, fromAttribute(l, r) {
  let s = l;
  switch (r) {
    case Boolean:
      s = l !== null;
      break;
    case Number:
      s = l === null ? null : Number(l);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(l);
      } catch {
        s = null;
      }
  }
  return s;
} }, Co = (l, r) => r !== l && (r == r || l == l), $i = { attribute: !0, type: String, converter: Vi, reflect: !1, hasChanged: Co };
let Ft = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(r) {
    var s;
    this.finalize(), ((s = this.h) !== null && s !== void 0 ? s : this.h = []).push(r);
  }
  static get observedAttributes() {
    this.finalize();
    const r = [];
    return this.elementProperties.forEach((s, h) => {
      const u = this._$Ep(h, s);
      u !== void 0 && (this._$Ev.set(u, h), r.push(u));
    }), r;
  }
  static createProperty(r, s = $i) {
    if (s.state && (s.attribute = !1), this.finalize(), this.elementProperties.set(r, s), !s.noAccessor && !this.prototype.hasOwnProperty(r)) {
      const h = typeof r == "symbol" ? Symbol() : "__" + r, u = this.getPropertyDescriptor(r, h, s);
      u !== void 0 && Object.defineProperty(this.prototype, r, u);
    }
  }
  static getPropertyDescriptor(r, s, h) {
    return { get() {
      return this[s];
    }, set(u) {
      const _ = this[r];
      this[s] = u, this.requestUpdate(r, _, h);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(r) {
    return this.elementProperties.get(r) || $i;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const r = Object.getPrototypeOf(this);
    if (r.finalize(), r.h !== void 0 && (this.h = [...r.h]), this.elementProperties = new Map(r.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const s = this.properties, h = [...Object.getOwnPropertyNames(s), ...Object.getOwnPropertySymbols(s)];
      for (const u of h)
        this.createProperty(u, s[u]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(r) {
    const s = [];
    if (Array.isArray(r)) {
      const h = new Set(r.flat(1 / 0).reverse());
      for (const u of h)
        s.unshift(_o(u));
    } else
      r !== void 0 && s.push(_o(r));
    return s;
  }
  static _$Ep(r, s) {
    const h = s.attribute;
    return h === !1 ? void 0 : typeof h == "string" ? h : typeof r == "string" ? r.toLowerCase() : void 0;
  }
  u() {
    var r;
    this._$E_ = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (r = this.constructor.h) === null || r === void 0 || r.forEach((s) => s(this));
  }
  addController(r) {
    var s, h;
    ((s = this._$ES) !== null && s !== void 0 ? s : this._$ES = []).push(r), this.renderRoot !== void 0 && this.isConnected && ((h = r.hostConnected) === null || h === void 0 || h.call(r));
  }
  removeController(r) {
    var s;
    (s = this._$ES) === null || s === void 0 || s.splice(this._$ES.indexOf(r) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((r, s) => {
      this.hasOwnProperty(s) && (this._$Ei.set(s, this[s]), delete this[s]);
    });
  }
  createRenderRoot() {
    var r;
    const s = (r = this.shadowRoot) !== null && r !== void 0 ? r : this.attachShadow(this.constructor.shadowRootOptions);
    return hs(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var r;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (r = this._$ES) === null || r === void 0 || r.forEach((s) => {
      var h;
      return (h = s.hostConnected) === null || h === void 0 ? void 0 : h.call(s);
    });
  }
  enableUpdating(r) {
  }
  disconnectedCallback() {
    var r;
    (r = this._$ES) === null || r === void 0 || r.forEach((s) => {
      var h;
      return (h = s.hostDisconnected) === null || h === void 0 ? void 0 : h.call(s);
    });
  }
  attributeChangedCallback(r, s, h) {
    this._$AK(r, h);
  }
  _$EO(r, s, h = $i) {
    var u;
    const _ = this.constructor._$Ep(r, h);
    if (_ !== void 0 && h.reflect === !0) {
      const p = (((u = h.converter) === null || u === void 0 ? void 0 : u.toAttribute) !== void 0 ? h.converter : Vi).toAttribute(s, h.type);
      this._$El = r, p == null ? this.removeAttribute(_) : this.setAttribute(_, p), this._$El = null;
    }
  }
  _$AK(r, s) {
    var h;
    const u = this.constructor, _ = u._$Ev.get(r);
    if (_ !== void 0 && this._$El !== _) {
      const p = u.getPropertyOptions(_), B = typeof p.converter == "function" ? { fromAttribute: p.converter } : ((h = p.converter) === null || h === void 0 ? void 0 : h.fromAttribute) !== void 0 ? p.converter : Vi;
      this._$El = _, this[_] = B.fromAttribute(s, p.type), this._$El = null;
    }
  }
  requestUpdate(r, s, h) {
    let u = !0;
    r !== void 0 && (((h = h || this.constructor.getPropertyOptions(r)).hasChanged || Co)(this[r], s) ? (this._$AL.has(r) || this._$AL.set(r, s), h.reflect === !0 && this._$El !== r && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(r, h))) : u = !1), !this.isUpdatePending && u && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (s) {
      Promise.reject(s);
    }
    const r = this.scheduleUpdate();
    return r != null && await r, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((u, _) => this[_] = u), this._$Ei = void 0);
    let s = !1;
    const h = this._$AL;
    try {
      s = this.shouldUpdate(h), s ? (this.willUpdate(h), (r = this._$ES) === null || r === void 0 || r.forEach((u) => {
        var _;
        return (_ = u.hostUpdate) === null || _ === void 0 ? void 0 : _.call(u);
      }), this.update(h)) : this._$Ek();
    } catch (u) {
      throw s = !1, this._$Ek(), u;
    }
    s && this._$AE(h);
  }
  willUpdate(r) {
  }
  _$AE(r) {
    var s;
    (s = this._$ES) === null || s === void 0 || s.forEach((h) => {
      var u;
      return (u = h.hostUpdated) === null || u === void 0 ? void 0 : u.call(h);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(r)), this.updated(r);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(r) {
    return !0;
  }
  update(r) {
    this._$EC !== void 0 && (this._$EC.forEach((s, h) => this._$EO(h, this[h], s)), this._$EC = void 0), this._$Ek();
  }
  updated(r) {
  }
  firstUpdated(r) {
  }
};
Ft.finalized = !0, Ft.elementProperties = /* @__PURE__ */ new Map(), Ft.elementStyles = [], Ft.shadowRootOptions = { mode: "open" }, go == null || go({ ReactiveElement: Ft }), ((Di = qe.reactiveElementVersions) !== null && Di !== void 0 ? Di : qe.reactiveElementVersions = []).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ni;
const je = window, qt = je.trustedTypes, vo = qt ? qt.createPolicy("lit-html", { createHTML: (l) => l }) : void 0, Pt = `lit$${(Math.random() + "").slice(9)}$`, Eo = "?" + Pt, cs = `<${Eo}>`, jt = document, ye = (l = "") => jt.createComment(l), be = (l) => l === null || typeof l != "object" && typeof l != "function", Mo = Array.isArray, ds = (l) => Mo(l) || typeof (l == null ? void 0 : l[Symbol.iterator]) == "function", pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yo = /-->/g, bo = />/g, kt = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wo = /'/g, xo = /"/g, So = /^(?:script|style|textarea|title)$/i, fs = (l) => (r, ...s) => ({ _$litType$: l, strings: r, values: s }), ct = fs(1), Gt = Symbol.for("lit-noChange"), H = Symbol.for("lit-nothing"), Po = /* @__PURE__ */ new WeakMap(), Vt = jt.createTreeWalker(jt, 129, null, !1), ps = (l, r) => {
  const s = l.length - 1, h = [];
  let u, _ = r === 2 ? "<svg>" : "", p = pe;
  for (let v = 0; v < s; v++) {
    const C = l[v];
    let q, b, k = -1, j = 0;
    for (; j < C.length && (p.lastIndex = j, b = p.exec(C), b !== null); )
      j = p.lastIndex, p === pe ? b[1] === "!--" ? p = yo : b[1] !== void 0 ? p = bo : b[2] !== void 0 ? (So.test(b[2]) && (u = RegExp("</" + b[2], "g")), p = kt) : b[3] !== void 0 && (p = kt) : p === kt ? b[0] === ">" ? (p = u ?? pe, k = -1) : b[1] === void 0 ? k = -2 : (k = p.lastIndex - b[2].length, q = b[1], p = b[3] === void 0 ? kt : b[3] === '"' ? xo : wo) : p === xo || p === wo ? p = kt : p === yo || p === bo ? p = pe : (p = kt, u = void 0);
    const Q = p === kt && l[v + 1].startsWith("/>") ? " " : "";
    _ += p === pe ? C + cs : k >= 0 ? (h.push(q), C.slice(0, k) + "$lit$" + C.slice(k) + Pt + Q) : C + Pt + (k === -2 ? (h.push(void 0), v) : Q);
  }
  const B = _ + (l[s] || "<?>") + (r === 2 ? "</svg>" : "");
  if (!Array.isArray(l) || !l.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [vo !== void 0 ? vo.createHTML(B) : B, h];
};
class we {
  constructor({ strings: r, _$litType$: s }, h) {
    let u;
    this.parts = [];
    let _ = 0, p = 0;
    const B = r.length - 1, v = this.parts, [C, q] = ps(r, s);
    if (this.el = we.createElement(C, h), Vt.currentNode = this.el.content, s === 2) {
      const b = this.el.content, k = b.firstChild;
      k.remove(), b.append(...k.childNodes);
    }
    for (; (u = Vt.nextNode()) !== null && v.length < B; ) {
      if (u.nodeType === 1) {
        if (u.hasAttributes()) {
          const b = [];
          for (const k of u.getAttributeNames())
            if (k.endsWith("$lit$") || k.startsWith(Pt)) {
              const j = q[p++];
              if (b.push(k), j !== void 0) {
                const Q = u.getAttribute(j.toLowerCase() + "$lit$").split(Pt), z = /([.?@])?(.*)/.exec(j);
                v.push({ type: 1, index: _, name: z[2], strings: Q, ctor: z[1] === "." ? ms : z[1] === "?" ? vs : z[1] === "@" ? ys : Je });
              } else
                v.push({ type: 6, index: _ });
            }
          for (const k of b)
            u.removeAttribute(k);
        }
        if (So.test(u.tagName)) {
          const b = u.textContent.split(Pt), k = b.length - 1;
          if (k > 0) {
            u.textContent = qt ? qt.emptyScript : "";
            for (let j = 0; j < k; j++)
              u.append(b[j], ye()), Vt.nextNode(), v.push({ type: 2, index: ++_ });
            u.append(b[k], ye());
          }
        }
      } else if (u.nodeType === 8)
        if (u.data === Eo)
          v.push({ type: 2, index: _ });
        else {
          let b = -1;
          for (; (b = u.data.indexOf(Pt, b + 1)) !== -1; )
            v.push({ type: 7, index: _ }), b += Pt.length - 1;
        }
      _++;
    }
  }
  static createElement(r, s) {
    const h = jt.createElement("template");
    return h.innerHTML = r, h;
  }
}
function Yt(l, r, s = l, h) {
  var u, _, p, B;
  if (r === Gt)
    return r;
  let v = h !== void 0 ? (u = s._$Co) === null || u === void 0 ? void 0 : u[h] : s._$Cl;
  const C = be(r) ? void 0 : r._$litDirective$;
  return (v == null ? void 0 : v.constructor) !== C && ((_ = v == null ? void 0 : v._$AO) === null || _ === void 0 || _.call(v, !1), C === void 0 ? v = void 0 : (v = new C(l), v._$AT(l, s, h)), h !== void 0 ? ((p = (B = s)._$Co) !== null && p !== void 0 ? p : B._$Co = [])[h] = v : s._$Cl = v), v !== void 0 && (r = Yt(l, v._$AS(l, r.values), v, h)), r;
}
class _s {
  constructor(r, s) {
    this.u = [], this._$AN = void 0, this._$AD = r, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(r) {
    var s;
    const { el: { content: h }, parts: u } = this._$AD, _ = ((s = r == null ? void 0 : r.creationScope) !== null && s !== void 0 ? s : jt).importNode(h, !0);
    Vt.currentNode = _;
    let p = Vt.nextNode(), B = 0, v = 0, C = u[0];
    for (; C !== void 0; ) {
      if (B === C.index) {
        let q;
        C.type === 2 ? q = new xe(p, p.nextSibling, this, r) : C.type === 1 ? q = new C.ctor(p, C.name, C.strings, this, r) : C.type === 6 && (q = new bs(p, this, r)), this.u.push(q), C = u[++v];
      }
      B !== (C == null ? void 0 : C.index) && (p = Vt.nextNode(), B++);
    }
    return _;
  }
  p(r) {
    let s = 0;
    for (const h of this.u)
      h !== void 0 && (h.strings !== void 0 ? (h._$AI(r, h, s), s += h.strings.length - 2) : h._$AI(r[s])), s++;
  }
}
class xe {
  constructor(r, s, h, u) {
    var _;
    this.type = 2, this._$AH = H, this._$AN = void 0, this._$AA = r, this._$AB = s, this._$AM = h, this.options = u, this._$Cm = (_ = u == null ? void 0 : u.isConnected) === null || _ === void 0 || _;
  }
  get _$AU() {
    var r, s;
    return (s = (r = this._$AM) === null || r === void 0 ? void 0 : r._$AU) !== null && s !== void 0 ? s : this._$Cm;
  }
  get parentNode() {
    let r = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && r.nodeType === 11 && (r = s.parentNode), r;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(r, s = this) {
    r = Yt(this, r, s), be(r) ? r === H || r == null || r === "" ? (this._$AH !== H && this._$AR(), this._$AH = H) : r !== this._$AH && r !== Gt && this.g(r) : r._$litType$ !== void 0 ? this.$(r) : r.nodeType !== void 0 ? this.T(r) : ds(r) ? this.k(r) : this.g(r);
  }
  O(r, s = this._$AB) {
    return this._$AA.parentNode.insertBefore(r, s);
  }
  T(r) {
    this._$AH !== r && (this._$AR(), this._$AH = this.O(r));
  }
  g(r) {
    this._$AH !== H && be(this._$AH) ? this._$AA.nextSibling.data = r : this.T(jt.createTextNode(r)), this._$AH = r;
  }
  $(r) {
    var s;
    const { values: h, _$litType$: u } = r, _ = typeof u == "number" ? this._$AC(r) : (u.el === void 0 && (u.el = we.createElement(u.h, this.options)), u);
    if (((s = this._$AH) === null || s === void 0 ? void 0 : s._$AD) === _)
      this._$AH.p(h);
    else {
      const p = new _s(_, this), B = p.v(this.options);
      p.p(h), this.T(B), this._$AH = p;
    }
  }
  _$AC(r) {
    let s = Po.get(r.strings);
    return s === void 0 && Po.set(r.strings, s = new we(r)), s;
  }
  k(r) {
    Mo(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let h, u = 0;
    for (const _ of r)
      u === s.length ? s.push(h = new xe(this.O(ye()), this.O(ye()), this, this.options)) : h = s[u], h._$AI(_), u++;
    u < s.length && (this._$AR(h && h._$AB.nextSibling, u), s.length = u);
  }
  _$AR(r = this._$AA.nextSibling, s) {
    var h;
    for ((h = this._$AP) === null || h === void 0 || h.call(this, !1, !0, s); r && r !== this._$AB; ) {
      const u = r.nextSibling;
      r.remove(), r = u;
    }
  }
  setConnected(r) {
    var s;
    this._$AM === void 0 && (this._$Cm = r, (s = this._$AP) === null || s === void 0 || s.call(this, r));
  }
}
class Je {
  constructor(r, s, h, u, _) {
    this.type = 1, this._$AH = H, this._$AN = void 0, this.element = r, this.name = s, this._$AM = u, this.options = _, h.length > 2 || h[0] !== "" || h[1] !== "" ? (this._$AH = Array(h.length - 1).fill(new String()), this.strings = h) : this._$AH = H;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(r, s = this, h, u) {
    const _ = this.strings;
    let p = !1;
    if (_ === void 0)
      r = Yt(this, r, s, 0), p = !be(r) || r !== this._$AH && r !== Gt, p && (this._$AH = r);
    else {
      const B = r;
      let v, C;
      for (r = _[0], v = 0; v < _.length - 1; v++)
        C = Yt(this, B[h + v], s, v), C === Gt && (C = this._$AH[v]), p || (p = !be(C) || C !== this._$AH[v]), C === H ? r = H : r !== H && (r += (C ?? "") + _[v + 1]), this._$AH[v] = C;
    }
    p && !u && this.j(r);
  }
  j(r) {
    r === H ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, r ?? "");
  }
}
class ms extends Je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(r) {
    this.element[this.name] = r === H ? void 0 : r;
  }
}
const gs = qt ? qt.emptyScript : "";
class vs extends Je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(r) {
    r && r !== H ? this.element.setAttribute(this.name, gs) : this.element.removeAttribute(this.name);
  }
}
class ys extends Je {
  constructor(r, s, h, u, _) {
    super(r, s, h, u, _), this.type = 5;
  }
  _$AI(r, s = this) {
    var h;
    if ((r = (h = Yt(this, r, s, 0)) !== null && h !== void 0 ? h : H) === Gt)
      return;
    const u = this._$AH, _ = r === H && u !== H || r.capture !== u.capture || r.once !== u.once || r.passive !== u.passive, p = r !== H && (u === H || _);
    _ && this.element.removeEventListener(this.name, this, u), p && this.element.addEventListener(this.name, this, r), this._$AH = r;
  }
  handleEvent(r) {
    var s, h;
    typeof this._$AH == "function" ? this._$AH.call((h = (s = this.options) === null || s === void 0 ? void 0 : s.host) !== null && h !== void 0 ? h : this.element, r) : this._$AH.handleEvent(r);
  }
}
class bs {
  constructor(r, s, h) {
    this.element = r, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = h;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(r) {
    Yt(this, r);
  }
}
const Lo = je.litHtmlPolyfillSupport;
Lo == null || Lo(we, xe), ((Ni = je.litHtmlVersions) !== null && Ni !== void 0 ? Ni : je.litHtmlVersions = []).push("2.6.1");
const ws = (l, r, s) => {
  var h, u;
  const _ = (h = s == null ? void 0 : s.renderBefore) !== null && h !== void 0 ? h : r;
  let p = _._$litPart$;
  if (p === void 0) {
    const B = (u = s == null ? void 0 : s.renderBefore) !== null && u !== void 0 ? u : null;
    _._$litPart$ = p = new xe(r.insertBefore(ye(), B), B, void 0, s ?? {});
  }
  return p._$AI(l), p;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Hi, Wi;
let st = class extends Ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r, s;
    const h = super.createRenderRoot();
    return (r = (s = this.renderOptions).renderBefore) !== null && r !== void 0 || (s.renderBefore = h.firstChild), h;
  }
  update(r) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(r), this._$Do = ws(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var r;
    super.connectedCallback(), (r = this._$Do) === null || r === void 0 || r.setConnected(!0);
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this._$Do) === null || r === void 0 || r.setConnected(!1);
  }
  render() {
    return Gt;
  }
};
st.finalized = !0, st._$litElement$ = !0, (Hi = globalThis.litElementHydrateSupport) === null || Hi === void 0 || Hi.call(globalThis, { LitElement: st });
const To = globalThis.litElementPolyfillSupport;
To == null || To({ LitElement: st });
((Wi = globalThis.litElementVersions) !== null && Wi !== void 0 ? Wi : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (l) => (r) => typeof r == "function" ? ((s, h) => (customElements.define(s, h), h))(l, r) : ((s, h) => {
  const { kind: u, elements: _ } = h;
  return { kind: u, elements: _, finisher(p) {
    customElements.define(s, p);
  } };
})(l, r);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xs = (l, r) => r.kind === "method" && r.descriptor && !("value" in r.descriptor) ? { ...r, finisher(s) {
  s.createProperty(r.key, l);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: r.key, initializer() {
  typeof r.initializer == "function" && (this[r.key] = r.initializer.call(this));
}, finisher(s) {
  s.createProperty(r.key, l);
} };
function $(l) {
  return (r, s) => s !== void 0 ? ((h, u, _) => {
    u.constructor.createProperty(_, h);
  })(l, r, s) : xs(l, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ps(l) {
  return $({ ...l, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ui;
((Ui = window.HTMLSlotElement) === null || Ui === void 0 ? void 0 : Ui.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ls = (l) => l.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ts = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, As = (l) => (...r) => ({ _$litDirective$: l, values: r });
class Cs {
  constructor(r) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(r, s, h) {
    this._$Ct = r, this._$AM = s, this._$Ci = h;
  }
  _$AS(r, s) {
    return this.update(r, s);
  }
  update(r, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = (l, r) => {
  var s, h;
  const u = l._$AN;
  if (u === void 0)
    return !1;
  for (const _ of u)
    (h = (s = _)._$AO) === null || h === void 0 || h.call(s, r, !1), ve(_, r);
  return !0;
}, Ge = (l) => {
  let r, s;
  do {
    if ((r = l._$AM) === void 0)
      break;
    s = r._$AN, s.delete(l), l = r;
  } while ((s == null ? void 0 : s.size) === 0);
}, ko = (l) => {
  for (let r; r = l._$AM; l = r) {
    let s = r._$AN;
    if (s === void 0)
      r._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(l))
      break;
    s.add(l), Ss(r);
  }
};
function Es(l) {
  this._$AN !== void 0 ? (Ge(this), this._$AM = l, ko(this)) : this._$AM = l;
}
function Ms(l, r = !1, s = 0) {
  const h = this._$AH, u = this._$AN;
  if (u !== void 0 && u.size !== 0)
    if (r)
      if (Array.isArray(h))
        for (let _ = s; _ < h.length; _++)
          ve(h[_], !1), Ge(h[_]);
      else
        h != null && (ve(h, !1), Ge(h));
    else
      ve(this, l);
}
const Ss = (l) => {
  var r, s, h, u;
  l.type == Ts.CHILD && ((r = (h = l)._$AP) !== null && r !== void 0 || (h._$AP = Ms), (s = (u = l)._$AQ) !== null && s !== void 0 || (u._$AQ = Es));
};
class ks extends Cs {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(r, s, h) {
    super._$AT(r, s, h), ko(this), this.isConnected = r._$AU;
  }
  _$AO(r, s = !0) {
    var h, u;
    r !== this.isConnected && (this.isConnected = r, r ? (h = this.reconnected) === null || h === void 0 || h.call(this) : (u = this.disconnected) === null || u === void 0 || u.call(this)), s && (ve(this, r), Ge(this));
  }
  setValue(r) {
    if (Ls(this._$Ct))
      this._$Ct._$AI(r, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = r, this._$Ct._$AI(s, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = () => new zs();
class zs {
}
const Fi = /* @__PURE__ */ new WeakMap(), me = As(class extends ks {
  render(l) {
    return H;
  }
  update(l, [r]) {
    var s;
    const h = r !== this.Y;
    return h && this.Y !== void 0 && this.rt(void 0), (h || this.lt !== this.ct) && (this.Y = r, this.dt = (s = l.options) === null || s === void 0 ? void 0 : s.host, this.rt(this.ct = l.element)), H;
  }
  rt(l) {
    var r;
    if (typeof this.Y == "function") {
      const s = (r = this.dt) !== null && r !== void 0 ? r : globalThis;
      let h = Fi.get(s);
      h === void 0 && (h = /* @__PURE__ */ new WeakMap(), Fi.set(s, h)), h.get(this.Y) !== void 0 && this.Y.call(this.dt, void 0), h.set(this.Y, l), l !== void 0 && this.Y.call(this.dt, l);
    } else
      this.Y.value = l;
  }
  get lt() {
    var l, r, s;
    return typeof this.Y == "function" ? (r = Fi.get((l = this.dt) !== null && l !== void 0 ? l : globalThis)) === null || r === void 0 ? void 0 : r.get(this.Y) : (s = this.Y) === null || s === void 0 ? void 0 : s.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function zo(l, r, s) {
  return l ? r() : s == null ? void 0 : s();
}
var Os = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Is(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var qi = { exports: {} };
/* @preserve
 * Leaflet 1.9.3, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(l, r) {
  (function(s, h) {
    h(r);
  })(Os, function(s) {
    var h = "1.9.3";
    function u(t) {
      var e, i, n, o;
      for (i = 1, n = arguments.length; i < n; i++) {
        o = arguments[i];
        for (e in o)
          t[e] = o[e];
      }
      return t;
    }
    var _ = Object.create || function() {
      function t() {
      }
      return function(e) {
        return t.prototype = e, new t();
      };
    }();
    function p(t, e) {
      var i = Array.prototype.slice;
      if (t.bind)
        return t.bind.apply(t, i.call(arguments, 1));
      var n = i.call(arguments, 2);
      return function() {
        return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
      };
    }
    var B = 0;
    function v(t) {
      return "_leaflet_id" in t || (t._leaflet_id = ++B), t._leaflet_id;
    }
    function C(t, e, i) {
      var n, o, a, c;
      return c = function() {
        n = !1, o && (a.apply(i, o), o = !1);
      }, a = function() {
        n ? o = arguments : (t.apply(i, arguments), setTimeout(c, e), n = !0);
      }, a;
    }
    function q(t, e, i) {
      var n = e[1], o = e[0], a = n - o;
      return t === n && i ? t : ((t - o) % a + a) % a + o;
    }
    function b() {
      return !1;
    }
    function k(t, e) {
      if (e === !1)
        return t;
      var i = Math.pow(10, e === void 0 ? 6 : e);
      return Math.round(t * i) / i;
    }
    function j(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
    }
    function Q(t) {
      return j(t).split(/\s+/);
    }
    function z(t, e) {
      Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? _(t.options) : {});
      for (var i in e)
        t.options[i] = e[i];
      return t.options;
    }
    function Ki(t, e, i) {
      var n = [];
      for (var o in t)
        n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
      return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
    }
    var Zo = /\{ *([\w_ -]+) *\}/g;
    function Ji(t, e) {
      return t.replace(Zo, function(i, n) {
        var o = e[n];
        if (o === void 0)
          throw new Error("No value provided for variable " + i);
        return typeof o == "function" && (o = o(e)), o;
      });
    }
    var nt = Array.isArray || function(t) {
      return Object.prototype.toString.call(t) === "[object Array]";
    };
    function ei(t, e) {
      for (var i = 0; i < t.length; i++)
        if (t[i] === e)
          return i;
      return -1;
    }
    var Le = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function ii(t) {
      return window["webkit" + t] || window["moz" + t] || window["ms" + t];
    }
    var Qi = 0;
    function Xi(t) {
      var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - Qi));
      return Qi = e + i, window.setTimeout(t, i);
    }
    var ni = window.requestAnimationFrame || ii("RequestAnimationFrame") || Xi, tn = window.cancelAnimationFrame || ii("CancelAnimationFrame") || ii("CancelRequestAnimationFrame") || function(t) {
      window.clearTimeout(t);
    };
    function G(t, e, i) {
      if (i && ni === Xi)
        t.call(e);
      else
        return ni.call(window, p(t, e));
    }
    function X(t) {
      t && tn.call(window, t);
    }
    var Bo = {
      __proto__: null,
      extend: u,
      create: _,
      bind: p,
      get lastId() {
        return B;
      },
      stamp: v,
      throttle: C,
      wrapNum: q,
      falseFn: b,
      formatNum: k,
      trim: j,
      splitWords: Q,
      setOptions: z,
      getParamString: Ki,
      template: Ji,
      isArray: nt,
      indexOf: ei,
      emptyImageUrl: Le,
      requestFn: ni,
      cancelFn: tn,
      requestAnimFrame: G,
      cancelAnimFrame: X
    };
    function dt() {
    }
    dt.extend = function(t) {
      var e = function() {
        z(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, i = e.__super__ = this.prototype, n = _(i);
      n.constructor = e, e.prototype = n;
      for (var o in this)
        Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (e[o] = this[o]);
      return t.statics && u(e, t.statics), t.includes && (Ro(t.includes), u.apply(null, [n].concat(t.includes))), u(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? _(i.options) : {}, u(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
        if (!this._initHooksCalled) {
          i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var a = 0, c = n._initHooks.length; a < c; a++)
            n._initHooks[a].call(this);
        }
      }, e;
    }, dt.include = function(t) {
      var e = this.prototype.options;
      return u(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
    }, dt.mergeOptions = function(t) {
      return u(this.prototype.options, t), this;
    }, dt.addInitHook = function(t) {
      var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
        this[t].apply(this, e);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
    };
    function Ro(t) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        t = nt(t) ? t : [t];
        for (var e = 0; e < t.length; e++)
          t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var J = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e);
        else {
          t = Q(t);
          for (var o = 0, a = t.length; o < a; o++)
            this._on(t[o], e, i);
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(t, e, i) {
        if (!arguments.length)
          delete this._events;
        else if (typeof t == "object")
          for (var n in t)
            this._off(n, t[n], e);
        else {
          t = Q(t);
          for (var o = arguments.length === 1, a = 0, c = t.length; a < c; a++)
            o ? this._off(t[a]) : this._off(t[a], e, i);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(t, e, i, n) {
        if (typeof e != "function") {
          console.warn("wrong listener type: " + typeof e);
          return;
        }
        if (this._listens(t, e, i) === !1) {
          i === this && (i = void 0);
          var o = { fn: e, ctx: i };
          n && (o.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(o);
        }
      },
      _off: function(t, e, i) {
        var n, o, a;
        if (this._events && (n = this._events[t], !!n)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (o = 0, a = n.length; o < a; o++)
                n[o].fn = b;
            delete this._events[t];
            return;
          }
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          var c = this._listens(t, e, i);
          if (c !== !1) {
            var d = n[c];
            this._firingCount && (d.fn = b, this._events[t] = n = n.slice()), n.splice(c, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(t, e, i) {
        if (!this.listens(t, i))
          return this;
        var n = u({}, e, {
          type: t,
          target: this,
          sourceTarget: e && e.sourceTarget || this
        });
        if (this._events) {
          var o = this._events[t];
          if (o) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var a = 0, c = o.length; a < c; a++) {
              var d = o[a], f = d.fn;
              d.once && this.off(t, f, d.ctx), f.call(d.ctx || this, n);
            }
            this._firingCount--;
          }
        }
        return i && this._propagateEvent(n), this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(t, e, i, n) {
        typeof t != "string" && console.warn('"string" type argument expected');
        var o = e;
        typeof e != "function" && (n = !!e, o = void 0, i = void 0);
        var a = this._events && this._events[t];
        if (a && a.length && this._listens(t, o, i) !== !1)
          return !0;
        if (n) {
          for (var c in this._eventParents)
            if (this._eventParents[c].listens(t, e, i, n))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(t, e, i) {
        if (!this._events)
          return !1;
        var n = this._events[t] || [];
        if (!e)
          return !!n.length;
        i === this && (i = void 0);
        for (var o = 0, a = n.length; o < a; o++)
          if (n[o].fn === e && n[o].ctx === i)
            return o;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(t, e, i) {
        if (typeof t == "object")
          for (var n in t)
            this._on(n, t[n], e, !0);
        else {
          t = Q(t);
          for (var o = 0, a = t.length; o < a; o++)
            this._on(t[o], e, i, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[v(t)] = t, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[v(t)], this;
      },
      _propagateEvent: function(t) {
        for (var e in this._eventParents)
          this._eventParents[e].fire(t.type, u({
            layer: t.target,
            propagatedFrom: t.target
          }, t), !0);
      }
    };
    J.addEventListener = J.on, J.removeEventListener = J.clearAllEventListeners = J.off, J.addOneTimeEventListener = J.once, J.fireEvent = J.fire, J.hasEventListeners = J.listens;
    var Xt = dt.extend(J);
    function P(t, e, i) {
      this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
    }
    var en = Math.trunc || function(t) {
      return t > 0 ? Math.floor(t) : Math.ceil(t);
    };
    P.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new P(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(t) {
        return this.clone()._add(x(t));
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(t) {
        return this.clone()._subtract(x(t));
      },
      _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(t) {
        return this.clone()._divideBy(t);
      },
      _divideBy: function(t) {
        return this.x /= t, this.y /= t, this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(t) {
        return this.clone()._multiplyBy(t);
      },
      _multiplyBy: function(t) {
        return this.x *= t, this.y *= t, this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(t) {
        return new P(this.x * t.x, this.y * t.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(t) {
        return new P(this.x / t.x, this.y / t.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        return this.x = en(this.x), this.y = en(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(t) {
        t = x(t);
        var e = t.x - this.x, i = t.y - this.y;
        return Math.sqrt(e * e + i * i);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(t) {
        return t = x(t), t.x === this.x && t.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(t) {
        return t = x(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + k(this.x) + ", " + k(this.y) + ")";
      }
    };
    function x(t, e, i) {
      return t instanceof P ? t : nt(t) ? new P(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new P(t.x, t.y) : new P(t, e, i);
    }
    function R(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    R.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e, i;
        if (!t)
          return this;
        if (t instanceof P || typeof t[0] == "number" || "x" in t)
          e = i = x(t);
        else if (t = Y(t), e = t.min, i = t.max, !e || !i)
          return this;
        return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(t) {
        return x(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return x(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return x(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        var e, i;
        return typeof t[0] == "number" || t instanceof P ? t = x(t) : t = Y(t), t instanceof R ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(t) {
        t = Y(t);
        var e = this.min, i = this.max, n = t.min, o = t.max, a = o.x >= e.x && n.x <= i.x, c = o.y >= e.y && n.y <= i.y;
        return a && c;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(t) {
        t = Y(t);
        var e = this.min, i = this.max, n = t.min, o = t.max, a = o.x > e.x && n.x < i.x, c = o.y > e.y && n.y < i.y;
        return a && c;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, o = Math.abs(e.y - i.y) * t;
        return Y(
          x(e.x - n, e.y - o),
          x(i.x + n, i.y + o)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(t) {
        return t ? (t = Y(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
      }
    };
    function Y(t, e) {
      return !t || t instanceof R ? t : new R(t, e);
    }
    function K(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
          this.extend(i[n]);
    }
    K.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(t) {
        var e = this._southWest, i = this._northEast, n, o;
        if (t instanceof O)
          n = t, o = t;
        else if (t instanceof K) {
          if (n = t._southWest, o = t._northEast, !n || !o)
            return this;
        } else
          return t ? this.extend(I(t) || F(t)) : this;
        return !e && !i ? (this._southWest = new O(n.lat, n.lng), this._northEast = new O(o.lat, o.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(o.lat, i.lat), i.lng = Math.max(o.lng, i.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(t) {
        var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, o = Math.abs(e.lng - i.lng) * t;
        return new K(
          new O(e.lat - n, e.lng - o),
          new O(i.lat + n, i.lng + o)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new O(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new O(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new O(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(t) {
        typeof t[0] == "number" || t instanceof O || "lat" in t ? t = I(t) : t = F(t);
        var e = this._southWest, i = this._northEast, n, o;
        return t instanceof K ? (n = t.getSouthWest(), o = t.getNorthEast()) : n = o = t, n.lat >= e.lat && o.lat <= i.lat && n.lng >= e.lng && o.lng <= i.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(t) {
        t = F(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), a = o.lat >= e.lat && n.lat <= i.lat, c = o.lng >= e.lng && n.lng <= i.lng;
        return a && c;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(t) {
        t = F(t);
        var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), a = o.lat > e.lat && n.lat < i.lat, c = o.lng > e.lng && n.lng < i.lng;
        return a && c;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        return t ? (t = F(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function F(t, e) {
      return t instanceof K ? t : new K(t, e);
    }
    function O(t, e, i) {
      if (isNaN(t) || isNaN(e))
        throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
      this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
    }
    O.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(t, e) {
        if (!t)
          return !1;
        t = I(t);
        var i = Math.max(
          Math.abs(this.lat - t.lat),
          Math.abs(this.lng - t.lng)
        );
        return i <= (e === void 0 ? 1e-9 : e);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(t) {
        return "LatLng(" + k(this.lat, t) + ", " + k(this.lng, t) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(t) {
        return yt.distance(this, I(t));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return yt.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(t) {
        var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
        return F(
          [this.lat - e, this.lng - i],
          [this.lat + e, this.lng + i]
        );
      },
      clone: function() {
        return new O(this.lat, this.lng, this.alt);
      }
    };
    function I(t, e, i) {
      return t instanceof O ? t : nt(t) && typeof t[0] != "object" ? t.length === 3 ? new O(t[0], t[1], t[2]) : t.length === 2 ? new O(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new O(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new O(t, e, i);
    }
    var ft = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(t, e) {
        var i = this.projection.project(t), n = this.scale(e);
        return this.transformation._transform(i, n);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(t, e) {
        var i = this.scale(e), n = this.transformation.untransform(t, i);
        return this.projection.unproject(n);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(t) {
        return this.projection.project(t);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(t) {
        return this.projection.unproject(t);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(t) {
        return 256 * Math.pow(2, t);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(t) {
        return Math.log(t / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(t) {
        if (this.infinite)
          return null;
        var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), o = this.transformation.transform(e.max, i);
        return new R(n, o);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: !1,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(t) {
        var e = this.wrapLng ? q(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? q(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
        return new O(i, e, n);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(t) {
        var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, o = e.lng - i.lng;
        if (n === 0 && o === 0)
          return t;
        var a = t.getSouthWest(), c = t.getNorthEast(), d = new O(a.lat - n, a.lng - o), f = new O(c.lat - n, c.lng - o);
        return new K(d, f);
      }
    }, yt = u({}, ft, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(t, e) {
        var i = Math.PI / 180, n = t.lat * i, o = e.lat * i, a = Math.sin((e.lat - t.lat) * i / 2), c = Math.sin((e.lng - t.lng) * i / 2), d = a * a + Math.cos(n) * Math.cos(o) * c * c, f = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
        return this.R * f;
      }
    }), nn = 6378137, oi = {
      R: nn,
      MAX_LATITUDE: 85.0511287798,
      project: function(t) {
        var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), o = Math.sin(n * e);
        return new P(
          this.R * t.lng * e,
          this.R * Math.log((1 + o) / (1 - o)) / 2
        );
      },
      unproject: function(t) {
        var e = 180 / Math.PI;
        return new O(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
          t.x * e / this.R
        );
      },
      bounds: function() {
        var t = nn * Math.PI;
        return new R([-t, -t], [t, t]);
      }()
    };
    function ri(t, e, i, n) {
      if (nt(t)) {
        this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
        return;
      }
      this._a = t, this._b = e, this._c = i, this._d = n;
    }
    ri.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(t, e) {
        return this._transform(t.clone(), e);
      },
      // destructive transform (faster)
      _transform: function(t, e) {
        return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(t, e) {
        return e = e || 1, new P(
          (t.x / e - this._b) / this._a,
          (t.y / e - this._d) / this._c
        );
      }
    };
    function te(t, e, i, n) {
      return new ri(t, e, i, n);
    }
    var si = u({}, yt, {
      code: "EPSG:3857",
      projection: oi,
      transformation: function() {
        var t = 0.5 / (Math.PI * oi.R);
        return te(t, 0.5, -t, 0.5);
      }()
    }), Do = u({}, si, {
      code: "EPSG:900913"
    });
    function on(t) {
      return document.createElementNS("http://www.w3.org/2000/svg", t);
    }
    function rn(t, e) {
      var i = "", n, o, a, c, d, f;
      for (n = 0, a = t.length; n < a; n++) {
        for (d = t[n], o = 0, c = d.length; o < c; o++)
          f = d[o], i += (o ? "L" : "M") + f.x + " " + f.y;
        i += e ? y.svg ? "z" : "x" : "";
      }
      return i || "M0 0";
    }
    var ai = document.documentElement.style, Te = "ActiveXObject" in window, $o = Te && !document.addEventListener, sn = "msLaunchUri" in navigator && !("documentMode" in document), li = at("webkit"), an = at("android"), ln = at("android 2") || at("android 3"), No = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ho = an && at("Google") && No < 537 && !("AudioNode" in window), hi = !!window.opera, hn = !sn && at("chrome"), un = at("gecko") && !li && !hi && !Te, Wo = !hn && at("safari"), cn = at("phantom"), dn = "OTransition" in ai, Uo = navigator.platform.indexOf("Win") === 0, fn = Te && "transition" in ai, ui = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !ln, pn = "MozPerspective" in ai, Fo = !window.L_DISABLE_3D && (fn || ui || pn) && !dn && !cn, ee = typeof orientation < "u" || at("mobile"), Vo = ee && li, qo = ee && ui, _n = !window.PointerEvent && window.MSPointerEvent, mn = !!(window.PointerEvent || _n), gn = "ontouchstart" in window || !!window.TouchEvent, jo = !window.L_NO_TOUCH && (gn || mn), Go = ee && hi, Yo = ee && un, Ko = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Jo = function() {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", b, e), window.removeEventListener("testPassiveEventSupport", b, e);
      } catch {
      }
      return t;
    }(), Qo = function() {
      return !!document.createElement("canvas").getContext;
    }(), ci = !!(document.createElementNS && on("svg").createSVGRect), Xo = !!ci && function() {
      var t = document.createElement("div");
      return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), tr = !ci && function() {
      try {
        var t = document.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var e = t.firstChild;
        return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
      } catch {
        return !1;
      }
    }(), er = navigator.platform.indexOf("Mac") === 0, ir = navigator.platform.indexOf("Linux") === 0;
    function at(t) {
      return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
    }
    var y = {
      ie: Te,
      ielt9: $o,
      edge: sn,
      webkit: li,
      android: an,
      android23: ln,
      androidStock: Ho,
      opera: hi,
      chrome: hn,
      gecko: un,
      safari: Wo,
      phantom: cn,
      opera12: dn,
      win: Uo,
      ie3d: fn,
      webkit3d: ui,
      gecko3d: pn,
      any3d: Fo,
      mobile: ee,
      mobileWebkit: Vo,
      mobileWebkit3d: qo,
      msPointer: _n,
      pointer: mn,
      touch: jo,
      touchNative: gn,
      mobileOpera: Go,
      mobileGecko: Yo,
      retina: Ko,
      passiveEvents: Jo,
      canvas: Qo,
      svg: ci,
      vml: tr,
      inlineSvg: Xo,
      mac: er,
      linux: ir
    }, vn = y.msPointer ? "MSPointerDown" : "pointerdown", yn = y.msPointer ? "MSPointerMove" : "pointermove", bn = y.msPointer ? "MSPointerUp" : "pointerup", wn = y.msPointer ? "MSPointerCancel" : "pointercancel", di = {
      touchstart: vn,
      touchmove: yn,
      touchend: bn,
      touchcancel: wn
    }, xn = {
      touchstart: lr,
      touchmove: Ae,
      touchend: Ae,
      touchcancel: Ae
    }, Zt = {}, Pn = !1;
    function nr(t, e, i) {
      return e === "touchstart" && ar(), xn[e] ? (i = xn[e].bind(this, i), t.addEventListener(di[e], i, !1), i) : (console.warn("wrong event specified:", e), b);
    }
    function or(t, e, i) {
      if (!di[e]) {
        console.warn("wrong event specified:", e);
        return;
      }
      t.removeEventListener(di[e], i, !1);
    }
    function rr(t) {
      Zt[t.pointerId] = t;
    }
    function sr(t) {
      Zt[t.pointerId] && (Zt[t.pointerId] = t);
    }
    function Ln(t) {
      delete Zt[t.pointerId];
    }
    function ar() {
      Pn || (document.addEventListener(vn, rr, !0), document.addEventListener(yn, sr, !0), document.addEventListener(bn, Ln, !0), document.addEventListener(wn, Ln, !0), Pn = !0);
    }
    function Ae(t, e) {
      if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
        e.touches = [];
        for (var i in Zt)
          e.touches.push(Zt[i]);
        e.changedTouches = [e], t(e);
      }
    }
    function lr(t, e) {
      e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && V(e), Ae(t, e);
    }
    function hr(t) {
      var e = {}, i, n;
      for (n in t)
        i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
      return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
    }
    var ur = 200;
    function cr(t, e) {
      t.addEventListener("dblclick", e);
      var i = 0, n;
      function o(a) {
        if (a.detail !== 1) {
          n = a.detail;
          return;
        }
        if (!(a.pointerType === "mouse" || a.sourceCapabilities && !a.sourceCapabilities.firesTouchEvents)) {
          var c = Mn(a);
          if (!(c.some(function(f) {
            return f instanceof HTMLLabelElement && f.attributes.for;
          }) && !c.some(function(f) {
            return f instanceof HTMLInputElement || f instanceof HTMLSelectElement;
          }))) {
            var d = Date.now();
            d - i <= ur ? (n++, n === 2 && e(hr(a))) : n = 1, i = d;
          }
        }
      }
      return t.addEventListener("click", o), {
        dblclick: e,
        simDblclick: o
      };
    }
    function dr(t, e) {
      t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
    }
    var fi = Me(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), ie = Me(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Tn = ie === "webkitTransition" || ie === "OTransition" ? ie + "End" : "transitionend";
    function An(t) {
      return typeof t == "string" ? document.getElementById(t) : t;
    }
    function ne(t, e) {
      var i = t.style[e] || t.currentStyle && t.currentStyle[e];
      if ((!i || i === "auto") && document.defaultView) {
        var n = document.defaultView.getComputedStyle(t, null);
        i = n ? n[e] : null;
      }
      return i === "auto" ? null : i;
    }
    function S(t, e, i) {
      var n = document.createElement(t);
      return n.className = e || "", i && i.appendChild(n), n;
    }
    function D(t) {
      var e = t.parentNode;
      e && e.removeChild(t);
    }
    function Ce(t) {
      for (; t.firstChild; )
        t.removeChild(t.firstChild);
    }
    function Bt(t) {
      var e = t.parentNode;
      e && e.lastChild !== t && e.appendChild(t);
    }
    function Rt(t) {
      var e = t.parentNode;
      e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
    }
    function pi(t, e) {
      if (t.classList !== void 0)
        return t.classList.contains(e);
      var i = Ee(t);
      return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
    }
    function A(t, e) {
      if (t.classList !== void 0)
        for (var i = Q(e), n = 0, o = i.length; n < o; n++)
          t.classList.add(i[n]);
      else if (!pi(t, e)) {
        var a = Ee(t);
        _i(t, (a ? a + " " : "") + e);
      }
    }
    function N(t, e) {
      t.classList !== void 0 ? t.classList.remove(e) : _i(t, j((" " + Ee(t) + " ").replace(" " + e + " ", " ")));
    }
    function _i(t, e) {
      t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
    }
    function Ee(t) {
      return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
    }
    function tt(t, e) {
      "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && fr(t, e);
    }
    function fr(t, e) {
      var i = !1, n = "DXImageTransform.Microsoft.Alpha";
      try {
        i = t.filters.item(n);
      } catch {
        if (e === 1)
          return;
      }
      e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
    }
    function Me(t) {
      for (var e = document.documentElement.style, i = 0; i < t.length; i++)
        if (t[i] in e)
          return t[i];
      return !1;
    }
    function Tt(t, e, i) {
      var n = e || new P(0, 0);
      t.style[fi] = (y.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
    }
    function W(t, e) {
      t._leaflet_pos = e, y.any3d ? Tt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
    }
    function At(t) {
      return t._leaflet_pos || new P(0, 0);
    }
    var oe, re, mi;
    if ("onselectstart" in document)
      oe = function() {
        T(window, "selectstart", V);
      }, re = function() {
        Z(window, "selectstart", V);
      };
    else {
      var se = Me(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      oe = function() {
        if (se) {
          var t = document.documentElement.style;
          mi = t[se], t[se] = "none";
        }
      }, re = function() {
        se && (document.documentElement.style[se] = mi, mi = void 0);
      };
    }
    function gi() {
      T(window, "dragstart", V);
    }
    function vi() {
      Z(window, "dragstart", V);
    }
    var Se, yi;
    function bi(t) {
      for (; t.tabIndex === -1; )
        t = t.parentNode;
      t.style && (ke(), Se = t, yi = t.style.outline, t.style.outline = "none", T(window, "keydown", ke));
    }
    function ke() {
      Se && (Se.style.outline = yi, Se = void 0, yi = void 0, Z(window, "keydown", ke));
    }
    function Cn(t) {
      do
        t = t.parentNode;
      while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
      return t;
    }
    function wi(t) {
      var e = t.getBoundingClientRect();
      return {
        x: e.width / t.offsetWidth || 1,
        y: e.height / t.offsetHeight || 1,
        boundingClientRect: e
      };
    }
    var pr = {
      __proto__: null,
      TRANSFORM: fi,
      TRANSITION: ie,
      TRANSITION_END: Tn,
      get: An,
      getStyle: ne,
      create: S,
      remove: D,
      empty: Ce,
      toFront: Bt,
      toBack: Rt,
      hasClass: pi,
      addClass: A,
      removeClass: N,
      setClass: _i,
      getClass: Ee,
      setOpacity: tt,
      testProp: Me,
      setTransform: Tt,
      setPosition: W,
      getPosition: At,
      get disableTextSelection() {
        return oe;
      },
      get enableTextSelection() {
        return re;
      },
      disableImageDrag: gi,
      enableImageDrag: vi,
      preventOutline: bi,
      restoreOutline: ke,
      getSizedParentNode: Cn,
      getScale: wi
    };
    function T(t, e, i, n) {
      if (e && typeof e == "object")
        for (var o in e)
          Pi(t, o, e[o], i);
      else {
        e = Q(e);
        for (var a = 0, c = e.length; a < c; a++)
          Pi(t, e[a], i, n);
      }
      return this;
    }
    var lt = "_leaflet_events";
    function Z(t, e, i, n) {
      if (arguments.length === 1)
        En(t), delete t[lt];
      else if (e && typeof e == "object")
        for (var o in e)
          Li(t, o, e[o], i);
      else if (e = Q(e), arguments.length === 2)
        En(t, function(d) {
          return ei(e, d) !== -1;
        });
      else
        for (var a = 0, c = e.length; a < c; a++)
          Li(t, e[a], i, n);
      return this;
    }
    function En(t, e) {
      for (var i in t[lt]) {
        var n = i.split(/\d/)[0];
        (!e || e(n)) && Li(t, n, null, null, i);
      }
    }
    var xi = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function Pi(t, e, i, n) {
      var o = e + v(i) + (n ? "_" + v(n) : "");
      if (t[lt] && t[lt][o])
        return this;
      var a = function(d) {
        return i.call(n || t, d || window.event);
      }, c = a;
      !y.touchNative && y.pointer && e.indexOf("touch") === 0 ? a = nr(t, e, a) : y.touch && e === "dblclick" ? a = cr(t, a) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(xi[e] || e, a, y.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (a = function(d) {
        d = d || window.event, Ai(t, d) && c(d);
      }, t.addEventListener(xi[e], a, !1)) : t.addEventListener(e, c, !1) : t.attachEvent("on" + e, a), t[lt] = t[lt] || {}, t[lt][o] = a;
    }
    function Li(t, e, i, n, o) {
      o = o || e + v(i) + (n ? "_" + v(n) : "");
      var a = t[lt] && t[lt][o];
      if (!a)
        return this;
      !y.touchNative && y.pointer && e.indexOf("touch") === 0 ? or(t, e, a) : y.touch && e === "dblclick" ? dr(t, a) : "removeEventListener" in t ? t.removeEventListener(xi[e] || e, a, !1) : t.detachEvent("on" + e, a), t[lt][o] = null;
    }
    function Ct(t) {
      return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
    }
    function Ti(t) {
      return Pi(t, "wheel", Ct), this;
    }
    function ae(t) {
      return T(t, "mousedown touchstart dblclick contextmenu", Ct), t._leaflet_disable_click = !0, this;
    }
    function V(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
    }
    function Et(t) {
      return V(t), Ct(t), this;
    }
    function Mn(t) {
      if (t.composedPath)
        return t.composedPath();
      for (var e = [], i = t.target; i; )
        e.push(i), i = i.parentNode;
      return e;
    }
    function Sn(t, e) {
      if (!e)
        return new P(t.clientX, t.clientY);
      var i = wi(e), n = i.boundingClientRect;
      return new P(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (t.clientX - n.left) / i.x - e.clientLeft,
        (t.clientY - n.top) / i.y - e.clientTop
      );
    }
    var _r = y.linux && y.chrome ? window.devicePixelRatio : y.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function kn(t) {
      return y.edge ? t.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        t.deltaY && t.deltaMode === 0 ? -t.deltaY / _r : (
          // Pixels
          t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : (
            // Lines
            t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : (
              // Pages
              t.deltaX || t.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : (
                    // Legacy Moz lines
                    t.detail ? t.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function Ai(t, e) {
      var i = e.relatedTarget;
      if (!i)
        return !0;
      try {
        for (; i && i !== t; )
          i = i.parentNode;
      } catch {
        return !1;
      }
      return i !== t;
    }
    var mr = {
      __proto__: null,
      on: T,
      off: Z,
      stopPropagation: Ct,
      disableScrollPropagation: Ti,
      disableClickPropagation: ae,
      preventDefault: V,
      stop: Et,
      getPropagationPath: Mn,
      getMousePosition: Sn,
      getWheelDelta: kn,
      isExternalTarget: Ai,
      addListener: T,
      removeListener: Z
    }, zn = Xt.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(t, e, i, n) {
        this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(n || 0.5, 0.2), this._startPos = At(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = G(this._animate, this), this._step();
      },
      _step: function(t) {
        var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
        e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(t, e) {
        var i = this._startPos.add(this._offset.multiplyBy(t));
        e && i._round(), W(this._el, i), this.fire("step");
      },
      _complete: function() {
        X(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      }
    }), M = Xt.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: si,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: !0,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: !0,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: !0,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: !0
      },
      initialize: function(t, e) {
        e = z(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = p(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(I(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ie && y.any3d && !y.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), T(this._proxy, Tn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(t, e, i) {
        if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(I(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
          i.animate !== void 0 && (i.zoom = u({ animate: i.animate }, i.zoom), i.pan = u({ animate: i.animate, duration: i.duration }, i.pan));
          var n = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
          if (n)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(t, e) {
        return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(t, e) {
        return t = t || (y.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(t, e) {
        return t = t || (y.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(t, e, i) {
        var n = this.getZoomScale(e), o = this.getSize().divideBy(2), a = t instanceof P ? t : this.latLngToContainerPoint(t), c = a.subtract(o).multiplyBy(1 - 1 / n), d = this.containerPointToLatLng(o.add(c));
        return this.setView(d, e, { zoom: i });
      },
      _getBoundsCenterZoom: function(t, e) {
        e = e || {}, t = t.getBounds ? t.getBounds() : F(t);
        var i = x(e.paddingTopLeft || e.padding || [0, 0]), n = x(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, i.add(n));
        if (o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o, o === 1 / 0)
          return {
            center: t.getCenter(),
            zoom: o
          };
        var a = n.subtract(i).divideBy(2), c = this.project(t.getSouthWest(), o), d = this.project(t.getNorthEast(), o), f = this.unproject(c.add(d).divideBy(2).add(a), o);
        return {
          center: f,
          zoom: o
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(t, e) {
        if (t = F(t), !t.isValid())
          throw new Error("Bounds are not valid.");
        var i = this._getBoundsCenterZoom(t, e);
        return this.setView(i.center, i.zoom, e);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(t) {
        return this.fitBounds([[-90, -180], [90, 180]], t);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(t, e) {
        return this.setView(t, this._zoom, { pan: e });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(t, e) {
        if (t = x(t).round(), e = e || {}, !t.x && !t.y)
          return this.fire("moveend");
        if (e.animate !== !0 && !this.getSize().contains(t))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new zn(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
          A(this._mapPane, "leaflet-pan-anim");
          var i = this._getMapPanePos().subtract(t).round();
          this._panAnim.run(this._mapPane, i, e.duration || 0.25, e.easeLinearity);
        } else
          this._rawPanBy(t), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(t, e, i) {
        if (i = i || {}, i.animate === !1 || !y.any3d)
          return this.setView(t, e, i);
        this._stop();
        var n = this.project(this.getCenter()), o = this.project(t), a = this.getSize(), c = this._zoom;
        t = I(t), e = e === void 0 ? c : e;
        var d = Math.max(a.x, a.y), f = d * this.getZoomScale(c, e), m = o.distanceTo(n) || 1, g = 1.42, w = g * g;
        function E(U) {
          var Fe = U ? -1 : 1, os = U ? f : d, rs = f * f - d * d + Fe * w * w * m * m, ss = 2 * os * w * m, Ri = rs / ss, fo = Math.sqrt(Ri * Ri + 1) - Ri, as = fo < 1e-9 ? -18 : Math.log(fo);
          return as;
        }
        function it(U) {
          return (Math.exp(U) - Math.exp(-U)) / 2;
        }
        function St(U) {
          return (Math.exp(U) + Math.exp(-U)) / 2;
        }
        function Ue(U) {
          return it(U) / St(U);
        }
        var xt = E(0);
        function Bi(U) {
          return d * (St(xt) / St(xt + g * U));
        }
        function ts(U) {
          return d * (St(xt) * Ue(xt + g * U) - it(xt)) / w;
        }
        function es(U) {
          return 1 - Math.pow(1 - U, 1.5);
        }
        var is = Date.now(), uo = (E(1) - xt) / g, ns = i.duration ? 1e3 * i.duration : 1e3 * uo * 0.8;
        function co() {
          var U = (Date.now() - is) / ns, Fe = es(U) * uo;
          U <= 1 ? (this._flyToFrame = G(co, this), this._move(
            this.unproject(n.add(o.subtract(n).multiplyBy(ts(Fe) / m)), c),
            this.getScaleZoom(d / Bi(Fe), c),
            { flyTo: !0 }
          )) : this._move(t, e)._moveEnd(!0);
        }
        return this._moveStart(!0, i.noMoveStart), co.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(t, e) {
        var i = this._getBoundsCenterZoom(t, e);
        return this.flyTo(i.center, i.zoom, e);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(t) {
        return t = F(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(t) {
        var e = this.options.minZoom;
        return this.options.minZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(t) {
        var e = this.options.maxZoom;
        return this.options.maxZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(t, e) {
        this._enforcingBounds = !0;
        var i = this.getCenter(), n = this._limitCenter(i, this._zoom, F(t));
        return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(t, e) {
        e = e || {};
        var i = x(e.paddingTopLeft || e.padding || [0, 0]), n = x(e.paddingBottomRight || e.padding || [0, 0]), o = this.project(this.getCenter()), a = this.project(t), c = this.getPixelBounds(), d = Y([c.min.add(i), c.max.subtract(n)]), f = d.getSize();
        if (!d.contains(a)) {
          this._enforcingBounds = !0;
          var m = a.subtract(d.getCenter()), g = d.extend(a).getSize().subtract(f);
          o.x += m.x < 0 ? -g.x : g.x, o.y += m.y < 0 ? -g.y : g.y, this.panTo(this.unproject(o), e), this._enforcingBounds = !1;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(t) {
        if (!this._loaded)
          return this;
        t = u({
          animate: !1,
          pan: !0
        }, t === !0 ? { animate: !0 } : t);
        var e = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var i = this.getSize(), n = e.divideBy(2).round(), o = i.divideBy(2).round(), a = n.subtract(o);
        return !a.x && !a.y ? this : (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(p(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: e,
          newSize: i
        }));
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(t) {
        if (t = this._locateOptions = u({
          timeout: 1e4,
          watch: !1
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, t), !("geolocation" in navigator))
          return this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          }), this;
        var e = p(this._handleGeolocationResponse, this), i = p(this._handleGeolocationError, this);
        return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
      },
      _handleGeolocationError: function(t) {
        if (this._container._leaflet_id) {
          var e = t.code, i = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: e,
            message: "Geolocation error: " + i + "."
          });
        }
      },
      _handleGeolocationResponse: function(t) {
        if (this._container._leaflet_id) {
          var e = t.coords.latitude, i = t.coords.longitude, n = new O(e, i), o = n.toBounds(t.coords.accuracy * 2), a = this._locateOptions;
          if (a.setView) {
            var c = this.getBoundsZoom(o);
            this.setView(n, a.maxZoom ? Math.min(c, a.maxZoom) : c);
          }
          var d = {
            latlng: n,
            bounds: o,
            timestamp: t.timestamp
          };
          for (var f in t.coords)
            typeof t.coords[f] == "number" && (d[f] = t.coords[f]);
          this.fire("locationfound", d);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(t, e) {
        if (!e)
          return this;
        var i = this[t] = new e(this);
        return this._handlers.push(i), this.options[t] && i.enable(), this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
          throw new Error("Map container is being reused by another instance");
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch {
          this._container._leaflet_id = void 0, this._containerId = void 0;
        }
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), D(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (X(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var t;
        for (t in this._layers)
          this._layers[t].remove();
        for (t in this._panes)
          D(this._panes[t]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(t, e) {
        var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = S("div", i, e || this._mapPane);
        return t && (this._panes[t] = n), n;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), i = this.unproject(t.getTopRight());
        return new K(e, i);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(t, e, i) {
        t = F(t), i = x(i || [0, 0]);
        var n = this.getZoom() || 0, o = this.getMinZoom(), a = this.getMaxZoom(), c = t.getNorthWest(), d = t.getSouthEast(), f = this.getSize().subtract(i), m = Y(this.project(d, n), this.project(c, n)).getSize(), g = y.any3d ? this.options.zoomSnap : 1, w = f.x / m.x, E = f.y / m.y, it = e ? Math.max(w, E) : Math.min(w, E);
        return n = this.getScaleZoom(it, n), g && (n = Math.round(n / (g / 100)) * (g / 100), n = e ? Math.ceil(n / g) * g : Math.floor(n / g) * g), Math.max(o, Math.min(a, n));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new P(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(t, e) {
        var i = this._getTopLeftPoint(t, e);
        return new R(i, i.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(t) {
        return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(t) {
        return typeof t == "string" ? this._panes[t] : t;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(t, e) {
        var i = this.options.crs;
        return e = e === void 0 ? this._zoom : e, i.scale(t) / i.scale(e);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(t, e) {
        var i = this.options.crs;
        e = e === void 0 ? this._zoom : e;
        var n = i.zoom(t * i.scale(e));
        return isNaN(n) ? 1 / 0 : n;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(I(t), e);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(t, e) {
        return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(x(t), e);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(t) {
        var e = x(t).add(this.getPixelOrigin());
        return this.unproject(e);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(t) {
        var e = this.project(I(t))._round();
        return e._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(I(t));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(t) {
        return this.options.crs.wrapLatLngBounds(F(t));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(t, e) {
        return this.options.crs.distance(I(t), I(e));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(t) {
        return x(t).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(t) {
        return x(t).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(t) {
        var e = this.containerPointToLayerPoint(x(t));
        return this.layerPointToLatLng(e);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(I(t)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(t) {
        return Sn(t, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      // map initialization methods
      _initContainer: function(t) {
        var e = this._container = An(t);
        if (e) {
          if (e._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else
          throw new Error("Map container not found.");
        T(e, "scroll", this._onScroll, this), this._containerId = v(e);
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && y.any3d, A(t, "leaflet-container" + (y.touch ? " leaflet-touch" : "") + (y.retina ? " leaflet-retina" : "") + (y.ielt9 ? " leaflet-oldie" : "") + (y.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var e = ne(t, "position");
        e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), W(this._mapPane, new P(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (A(t.markerPane, "leaflet-zoom-hide"), A(t.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(t, e, i) {
        W(this._mapPane, new P(0, 0));
        var n = !this._loaded;
        this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
        var o = this._zoom !== e;
        this._moveStart(o, i)._move(t, e)._moveEnd(o), this.fire("viewreset"), n && this.fire("load");
      },
      _moveStart: function(t, e) {
        return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
      },
      _move: function(t, e, i, n) {
        e === void 0 && (e = this._zoom);
        var o = this._zoom !== e;
        return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
      },
      _moveEnd: function(t) {
        return t && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return X(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(t) {
        W(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function() {
        if (!this._loaded)
          throw new Error("Set map center and zoom first.");
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(t) {
        this._targets = {}, this._targets[v(this._container)] = this;
        var e = t ? Z : T;
        e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), y.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        X(this._resizeRequest), this._resizeRequest = G(
          function() {
            this.invalidateSize({ debounceMoveend: !0 });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0, this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function(t, e) {
        for (var i = [], n, o = e === "mouseout" || e === "mouseover", a = t.target || t.srcElement, c = !1; a; ) {
          if (n = this._targets[v(a)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
            c = !0;
            break;
          }
          if (n && n.listens(e, !0) && (o && !Ai(a, t) || (i.push(n), o)) || a === this._container)
            break;
          a = a.parentNode;
        }
        return !i.length && !c && !o && this.listens(e, !0) && (i = [this]), i;
      },
      _isClickDisabled: function(t) {
        for (; t && t !== this._container; ) {
          if (t._leaflet_disable_click)
            return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent: function(t) {
        var e = t.target || t.srcElement;
        if (!(!this._loaded || e._leaflet_disable_events || t.type === "click" && this._isClickDisabled(e))) {
          var i = t.type;
          i === "mousedown" && bi(e), this._fireDOMEvent(t, i);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(t, e, i) {
        if (t.type === "click") {
          var n = u({}, t);
          n.type = "preclick", this._fireDOMEvent(n, n.type, i);
        }
        var o = this._findEventTargets(t, e);
        if (i) {
          for (var a = [], c = 0; c < i.length; c++)
            i[c].listens(e, !0) && a.push(i[c]);
          o = a.concat(o);
        }
        if (o.length) {
          e === "contextmenu" && V(t);
          var d = o[0], f = {
            originalEvent: t
          };
          if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
            var m = d.getLatLng && (!d._radius || d._radius <= 10);
            f.containerPoint = m ? this.latLngToContainerPoint(d.getLatLng()) : this.mouseEventToContainerPoint(t), f.layerPoint = this.containerPointToLayerPoint(f.containerPoint), f.latlng = m ? d.getLatLng() : this.layerPointToLatLng(f.layerPoint);
          }
          for (c = 0; c < o.length; c++)
            if (o[c].fire(e, f, !0), f.originalEvent._stopped || o[c].options.bubblingMouseEvents === !1 && ei(this._mouseEvents, e) !== -1)
              return;
        }
      },
      _draggableMoved: function(t) {
        return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var t = 0, e = this._handlers.length; t < e; t++)
          this._handlers[t].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(t, e) {
        return this._loaded ? t.call(e || this, { target: this }) : this.on("load", t, e), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return At(this._mapPane) || new P(0, 0);
      },
      _moved: function() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint: function(t, e) {
        var i = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
        return i.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(t, e) {
        var i = this.getSize()._divideBy(2);
        return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return this.project(t, e)._subtract(n);
      },
      _latLngBoundsToNewLayerBounds: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return Y([
          this.project(t.getSouthWest(), e)._subtract(n),
          this.project(t.getNorthWest(), e)._subtract(n),
          this.project(t.getSouthEast(), e)._subtract(n),
          this.project(t.getNorthEast(), e)._subtract(n)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(t, e, i) {
        if (!i)
          return t;
        var n = this.project(t, e), o = this.getSize().divideBy(2), a = new R(n.subtract(o), n.add(o)), c = this._getBoundsOffset(a, i, e);
        return Math.abs(c.x) <= 1 && Math.abs(c.y) <= 1 ? t : this.unproject(n.add(c), e);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(t, e) {
        if (!e)
          return t;
        var i = this.getPixelBounds(), n = new R(i.min.add(t), i.max.add(t));
        return t.add(this._getBoundsOffset(n, e));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(t, e, i) {
        var n = Y(
          this.project(e.getNorthEast(), i),
          this.project(e.getSouthWest(), i)
        ), o = n.min.subtract(t.min), a = n.max.subtract(t.max), c = this._rebound(o.x, -a.x), d = this._rebound(o.y, -a.y);
        return new P(c, d);
      },
      _rebound: function(t, e) {
        return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
      },
      _limitZoom: function(t) {
        var e = this.getMinZoom(), i = this.getMaxZoom(), n = y.any3d ? this.options.zoomSnap : 1;
        return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        N(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(t, e) {
        var i = this._getCenterOffset(t)._trunc();
        return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
      },
      _createAnimProxy: function() {
        var t = this._proxy = S("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
          var i = fi, n = this._proxy.style[i];
          Tt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        D(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var t = this.getCenter(), e = this.getZoom();
        Tt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
      },
      _catchTransitionEnd: function(t) {
        this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(t, e, i) {
        if (this._animatingZoom)
          return !0;
        if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var n = this.getZoomScale(e), o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
        return i.animate !== !0 && !this.getSize().contains(o) ? !1 : (G(function() {
          this._moveStart(!0, !1)._animateZoom(t, e, !0);
        }, this), !0);
      },
      _animateZoom: function(t, e, i, n) {
        this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, A(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: t,
          zoom: e,
          noUpdate: n
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(p(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && N(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function gr(t, e) {
      return new M(t, e);
    }
    var ot = dt.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(t) {
        z(this, t);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(t) {
        var e = this._map;
        return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(t) {
        this.remove(), this._map = t;
        var e = this._container = this.onAdd(t), i = this.getPosition(), n = t._controlCorners[i];
        return A(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (D(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(t) {
        this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
      }
    }), le = function(t) {
      return new ot(t);
    };
    M.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(t) {
        return t.addTo(this), this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(t) {
        return t.remove(), this;
      },
      _initControlPos: function() {
        var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = S("div", e + "control-container", this._container);
        function n(o, a) {
          var c = e + o + " " + e + a;
          t[o + a] = S("div", c, i);
        }
        n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
      },
      _clearControlPos: function() {
        for (var t in this._controlCorners)
          D(this._controlCorners[t]);
        D(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var On = ot.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: !0,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: !0,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: !1,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: !1,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(t, e, i, n) {
          return i < n ? -1 : n < i ? 1 : 0;
        }
      },
      initialize: function(t, e, i) {
        z(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1;
        for (var n in t)
          this._addLayer(t[n], n);
        for (n in e)
          this._addLayer(e[n], n, !0);
      },
      onAdd: function(t) {
        this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
        for (var e = 0; e < this._layers.length; e++)
          this._layers[e].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(t) {
        return ot.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var t = 0; t < this._layers.length; t++)
          this._layers[t].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(t, e) {
        return this._addLayer(t, e), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(t, e) {
        return this._addLayer(t, e, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(t) {
        t.off("add remove", this._onLayerChange, this);
        var e = this._getLayer(v(t));
        return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        A(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var t = this._map.getSize().y - (this._container.offsetTop + 50);
        return t < this._section.clientHeight ? (A(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : N(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return N(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var t = "leaflet-control-layers", e = this._container = S("div", t), i = this.options.collapsed;
        e.setAttribute("aria-haspopup", !0), ae(e), Ti(e);
        var n = this._section = S("section", t + "-list");
        i && (this._map.on("click", this.collapse, this), T(e, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var o = this._layersLink = S("a", t + "-toggle", e);
        o.href = "#", o.title = "Layers", o.setAttribute("role", "button"), T(o, {
          keydown: function(a) {
            a.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(a) {
            V(a), this._expandSafely();
          }
        }, this), i || this.expand(), this._baseLayersList = S("div", t + "-base", n), this._separator = S("div", t + "-separator", n), this._overlaysList = S("div", t + "-overlays", n), e.appendChild(n);
      },
      _getLayer: function(t) {
        for (var e = 0; e < this._layers.length; e++)
          if (this._layers[e] && v(this._layers[e].layer) === t)
            return this._layers[e];
      },
      _addLayer: function(t, e, i) {
        this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: t,
          name: e,
          overlay: i
        }), this.options.sortLayers && this._layers.sort(p(function(n, o) {
          return this.options.sortFunction(n.layer, o.layer, n.name, o.name);
        }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        Ce(this._baseLayersList), Ce(this._overlaysList), this._layerControlInputs = [];
        var t, e, i, n, o = 0;
        for (i = 0; i < this._layers.length; i++)
          n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
        return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
      },
      _onLayerChange: function(t) {
        this._handlingClick || this._update();
        var e = this._getLayer(v(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
        i && this._map.fire(i, e);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(t, e) {
        var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", n = document.createElement("div");
        return n.innerHTML = i, n.firstChild;
      },
      _addItem: function(t) {
        var e = document.createElement("label"), i = this._map.hasLayer(t.layer), n;
        t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + v(this), i), this._layerControlInputs.push(n), n.layerId = v(t.layer), T(n, "click", this._onInputClick, this);
        var o = document.createElement("span");
        o.innerHTML = " " + t.name;
        var a = document.createElement("span");
        e.appendChild(a), a.appendChild(n), a.appendChild(o);
        var c = t.overlay ? this._overlaysList : this._baseLayersList;
        return c.appendChild(e), this._checkDisabledLayers(), e;
      },
      _onInputClick: function() {
        var t = this._layerControlInputs, e, i, n = [], o = [];
        this._handlingClick = !0;
        for (var a = t.length - 1; a >= 0; a--)
          e = t[a], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || o.push(i);
        for (a = 0; a < o.length; a++)
          this._map.hasLayer(o[a]) && this._map.removeLayer(o[a]);
        for (a = 0; a < n.length; a++)
          this._map.hasLayer(n[a]) || this._map.addLayer(n[a]);
        this._handlingClick = !1, this._refocusOnMap();
      },
      _checkDisabledLayers: function() {
        for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), o = t.length - 1; o >= 0; o--)
          e = t[o], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var t = this._section;
        T(t, "click", V), this.expand(), setTimeout(function() {
          Z(t, "click", V);
        });
      }
    }), vr = function(t, e, i) {
      return new On(t, e, i);
    }, Ci = ot.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(t) {
        var e = "leaflet-control-zoom", i = S("div", e + " leaflet-bar"), n = this.options;
        return this._zoomInButton = this._createButton(
          n.zoomInText,
          n.zoomInTitle,
          e + "-in",
          i,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          n.zoomOutText,
          n.zoomOutTitle,
          e + "-out",
          i,
          this._zoomOut
        ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i;
      },
      onRemove: function(t) {
        t.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        return this._disabled = !0, this._updateDisabled(), this;
      },
      enable: function() {
        return this._disabled = !1, this._updateDisabled(), this;
      },
      _zoomIn: function(t) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _zoomOut: function(t) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _createButton: function(t, e, i, n, o) {
        var a = S("a", i, n);
        return a.innerHTML = t, a.href = "#", a.title = e, a.setAttribute("role", "button"), a.setAttribute("aria-label", e), ae(a), T(a, "click", Et), T(a, "click", o, this), T(a, "click", this._refocusOnMap, this), a;
      },
      _updateDisabled: function() {
        var t = this._map, e = "leaflet-disabled";
        N(this._zoomInButton, e), N(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (A(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (A(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    M.mergeOptions({
      zoomControl: !0
    }), M.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new Ci(), this.addControl(this.zoomControl));
    });
    var yr = function(t) {
      return new Ci(t);
    }, In = ot.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: !0,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: !0
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(t) {
        var e = "leaflet-control-scale", i = S("div", e), n = this.options;
        return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
      },
      onRemove: function(t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(t, e, i) {
        t.metric && (this._mScale = S("div", e, i)), t.imperial && (this._iScale = S("div", e, i));
      },
      _update: function() {
        var t = this._map, e = t.getSize().y / 2, i = t.distance(
          t.containerPointToLatLng([0, e]),
          t.containerPointToLatLng([this.options.maxWidth, e])
        );
        this._updateScales(i);
      },
      _updateScales: function(t) {
        this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
      },
      _updateMetric: function(t) {
        var e = this._getRoundNum(t), i = e < 1e3 ? e + " m" : e / 1e3 + " km";
        this._updateScale(this._mScale, i, e / t);
      },
      _updateImperial: function(t) {
        var e = t * 3.2808399, i, n, o;
        e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (o = this._getRoundNum(e), this._updateScale(this._iScale, o + " ft", o / e));
      },
      _updateScale: function(t, e, i) {
        t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
      },
      _getRoundNum: function(t) {
        var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
        return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
      }
    }), br = function(t) {
      return new In(t);
    }, wr = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Ei = ot.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (y.inlineSvg ? wr + " " : "") + "Leaflet</a>"
      },
      initialize: function(t) {
        z(this, t), this._attributions = {};
      },
      onAdd: function(t) {
        t.attributionControl = this, this._container = S("div", "leaflet-control-attribution"), ae(this._container);
        for (var e in t._layers)
          t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
        return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
      },
      onRemove: function(t) {
        t.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(t) {
        t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
          this.removeAttribution(t.layer.getAttribution());
        }, this));
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(t) {
        return this.options.prefix = t, this._update(), this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(t) {
        return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(t) {
        return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
      },
      _update: function() {
        if (this._map) {
          var t = [];
          for (var e in this._attributions)
            this._attributions[e] && t.push(e);
          var i = [];
          this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    M.mergeOptions({
      attributionControl: !0
    }), M.addInitHook(function() {
      this.options.attributionControl && new Ei().addTo(this);
    });
    var xr = function(t) {
      return new Ei(t);
    };
    ot.Layers = On, ot.Zoom = Ci, ot.Scale = In, ot.Attribution = Ei, le.layers = vr, le.zoom = yr, le.scale = br, le.attribution = xr;
    var ht = dt.extend({
      initialize: function(t) {
        this._map = t;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    ht.addTo = function(t, e) {
      return t.addHandler(e, this), this;
    };
    var Pr = { Events: J }, Zn = y.touch ? "touchstart mousedown" : "mousedown", bt = Xt.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(t, e, i, n) {
        z(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (T(this._dragStartTarget, Zn, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (bt._dragging === this && this.finishDrag(!0), Z(this._dragStartTarget, Zn, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(t) {
        if (this._enabled && (this._moved = !1, !pi(this._element, "leaflet-zoom-anim"))) {
          if (t.touches && t.touches.length !== 1) {
            bt._dragging === this && this.finishDrag();
            return;
          }
          if (!(bt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (bt._dragging = this, this._preventOutline && bi(this._element), gi(), oe(), !this._moving)) {
            this.fire("down");
            var e = t.touches ? t.touches[0] : t, i = Cn(this._element);
            this._startPoint = new P(e.clientX, e.clientY), this._startPos = At(this._element), this._parentScale = wi(i);
            var n = t.type === "mousedown";
            T(document, n ? "mousemove" : "touchmove", this._onMove, this), T(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(t) {
        if (this._enabled) {
          if (t.touches && t.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new P(e.clientX, e.clientY)._subtract(this._startPoint);
          !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, V(t), this._moved || (this.fire("dragstart"), this._moved = !0, A(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), A(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var t = { originalEvent: this._lastEvent };
        this.fire("predrag", t), W(this._element, this._newPos), this.fire("drag", t);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(t) {
        N(document.body, "leaflet-dragging"), this._lastTarget && (N(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Z(document, "mousemove touchmove", this._onMove, this), Z(document, "mouseup touchend touchcancel", this._onUp, this), vi(), re(), this._moved && this._moving && this.fire("dragend", {
          noInertia: t,
          distance: this._newPos.distanceTo(this._startPos)
        }), this._moving = !1, bt._dragging = !1;
      }
    });
    function Bn(t, e) {
      if (!e || !t.length)
        return t.slice();
      var i = e * e;
      return t = Ar(t, i), t = Tr(t, i), t;
    }
    function Rn(t, e, i) {
      return Math.sqrt(he(t, e, i, !0));
    }
    function Lr(t, e, i) {
      return he(t, e, i);
    }
    function Tr(t, e) {
      var i = t.length, n = typeof Uint8Array != void 0 + "" ? Uint8Array : Array, o = new n(i);
      o[0] = o[i - 1] = 1, Mi(t, o, e, 0, i - 1);
      var a, c = [];
      for (a = 0; a < i; a++)
        o[a] && c.push(t[a]);
      return c;
    }
    function Mi(t, e, i, n, o) {
      var a = 0, c, d, f;
      for (d = n + 1; d <= o - 1; d++)
        f = he(t[d], t[n], t[o], !0), f > a && (c = d, a = f);
      a > i && (e[c] = 1, Mi(t, e, i, n, c), Mi(t, e, i, c, o));
    }
    function Ar(t, e) {
      for (var i = [t[0]], n = 1, o = 0, a = t.length; n < a; n++)
        Cr(t[n], t[o]) > e && (i.push(t[n]), o = n);
      return o < a - 1 && i.push(t[a - 1]), i;
    }
    var Dn;
    function $n(t, e, i, n, o) {
      var a = n ? Dn : Mt(t, i), c = Mt(e, i), d, f, m;
      for (Dn = c; ; ) {
        if (!(a | c))
          return [t, e];
        if (a & c)
          return !1;
        d = a || c, f = ze(t, e, d, i, o), m = Mt(f, i), d === a ? (t = f, a = m) : (e = f, c = m);
      }
    }
    function ze(t, e, i, n, o) {
      var a = e.x - t.x, c = e.y - t.y, d = n.min, f = n.max, m, g;
      return i & 8 ? (m = t.x + a * (f.y - t.y) / c, g = f.y) : i & 4 ? (m = t.x + a * (d.y - t.y) / c, g = d.y) : i & 2 ? (m = f.x, g = t.y + c * (f.x - t.x) / a) : i & 1 && (m = d.x, g = t.y + c * (d.x - t.x) / a), new P(m, g, o);
    }
    function Mt(t, e) {
      var i = 0;
      return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
    }
    function Cr(t, e) {
      var i = e.x - t.x, n = e.y - t.y;
      return i * i + n * n;
    }
    function he(t, e, i, n) {
      var o = e.x, a = e.y, c = i.x - o, d = i.y - a, f = c * c + d * d, m;
      return f > 0 && (m = ((t.x - o) * c + (t.y - a) * d) / f, m > 1 ? (o = i.x, a = i.y) : m > 0 && (o += c * m, a += d * m)), c = t.x - o, d = t.y - a, n ? c * c + d * d : new P(o, a);
    }
    function et(t) {
      return !nt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
    }
    function Nn(t) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), et(t);
    }
    function Hn(t, e) {
      var i, n, o, a, c, d, f, m;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      et(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var g = [];
      for (var w in t)
        g.push(e.project(I(t[w])));
      var E = g.length;
      for (i = 0, n = 0; i < E - 1; i++)
        n += g[i].distanceTo(g[i + 1]) / 2;
      if (n === 0)
        m = g[0];
      else
        for (i = 0, a = 0; i < E - 1; i++)
          if (c = g[i], d = g[i + 1], o = c.distanceTo(d), a += o, a > n) {
            f = (a - n) / o, m = [
              d.x - f * (d.x - c.x),
              d.y - f * (d.y - c.y)
            ];
            break;
          }
      return e.unproject(x(m));
    }
    var Er = {
      __proto__: null,
      simplify: Bn,
      pointToSegmentDistance: Rn,
      closestPointOnSegment: Lr,
      clipSegment: $n,
      _getEdgeIntersection: ze,
      _getBitCode: Mt,
      _sqClosestPointOnSegment: he,
      isFlat: et,
      _flat: Nn,
      polylineCenter: Hn
    };
    function Wn(t, e, i) {
      var n, o = [1, 4, 2, 8], a, c, d, f, m, g, w, E;
      for (a = 0, g = t.length; a < g; a++)
        t[a]._code = Mt(t[a], e);
      for (d = 0; d < 4; d++) {
        for (w = o[d], n = [], a = 0, g = t.length, c = g - 1; a < g; c = a++)
          f = t[a], m = t[c], f._code & w ? m._code & w || (E = ze(m, f, w, e, i), E._code = Mt(E, e), n.push(E)) : (m._code & w && (E = ze(m, f, w, e, i), E._code = Mt(E, e), n.push(E)), n.push(f));
        t = n;
      }
      return t;
    }
    function Un(t, e) {
      var i, n, o, a, c, d, f, m, g;
      if (!t || t.length === 0)
        throw new Error("latlngs not passed");
      et(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
      var w = [];
      for (var E in t)
        w.push(e.project(I(t[E])));
      var it = w.length;
      for (d = f = m = 0, i = 0, n = it - 1; i < it; n = i++)
        o = w[i], a = w[n], c = o.y * a.x - a.y * o.x, f += (o.x + a.x) * c, m += (o.y + a.y) * c, d += c * 3;
      return d === 0 ? g = w[0] : g = [f / d, m / d], e.unproject(x(g));
    }
    var Mr = {
      __proto__: null,
      clipPolygon: Wn,
      polygonCenter: Un
    }, Si = {
      project: function(t) {
        return new P(t.lng, t.lat);
      },
      unproject: function(t) {
        return new O(t.y, t.x);
      },
      bounds: new R([-180, -90], [180, 90])
    }, ki = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new R([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(t) {
        var e = Math.PI / 180, i = this.R, n = t.lat * e, o = this.R_MINOR / i, a = Math.sqrt(1 - o * o), c = a * Math.sin(n), d = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - c) / (1 + c), a / 2);
        return n = -i * Math.log(Math.max(d, 1e-10)), new P(t.lng * e * i, n);
      },
      unproject: function(t) {
        for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, o = Math.sqrt(1 - n * n), a = Math.exp(-t.y / i), c = Math.PI / 2 - 2 * Math.atan(a), d = 0, f = 0.1, m; d < 15 && Math.abs(f) > 1e-7; d++)
          m = o * Math.sin(c), m = Math.pow((1 - m) / (1 + m), o / 2), f = Math.PI / 2 - 2 * Math.atan(a * m) - c, c += f;
        return new O(c * e, t.x * e / i);
      }
    }, Sr = {
      __proto__: null,
      LonLat: Si,
      Mercator: ki,
      SphericalMercator: oi
    }, kr = u({}, yt, {
      code: "EPSG:3395",
      projection: ki,
      transformation: function() {
        var t = 0.5 / (Math.PI * ki.R);
        return te(t, 0.5, -t, 0.5);
      }()
    }), Fn = u({}, yt, {
      code: "EPSG:4326",
      projection: Si,
      transformation: te(1 / 180, 1, -1 / 180, 0.5)
    }), zr = u({}, ft, {
      projection: Si,
      transformation: te(1, 0, -1, 0),
      scale: function(t) {
        return Math.pow(2, t);
      },
      zoom: function(t) {
        return Math.log(t) / Math.LN2;
      },
      distance: function(t, e) {
        var i = e.lng - t.lng, n = e.lat - t.lat;
        return Math.sqrt(i * i + n * n);
      },
      infinite: !0
    });
    ft.Earth = yt, ft.EPSG3395 = kr, ft.EPSG3857 = si, ft.EPSG900913 = Do, ft.EPSG4326 = Fn, ft.Simple = zr;
    var rt = Xt.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: !0
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(t) {
        return t && t.removeLayer(this), this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane);
      },
      addInteractiveTarget: function(t) {
        return this._map._targets[v(t)] = this, this;
      },
      removeInteractiveTarget: function(t) {
        return delete this._map._targets[v(t)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(t) {
        var e = t.target;
        if (e.hasLayer(this)) {
          if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
            var i = this.getEvents();
            e.on(i, this), this.once("remove", function() {
              e.off(i, this);
            }, this);
          }
          this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
        }
      }
    });
    M.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(t) {
        if (!t._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var e = v(t);
        return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(t) {
        var e = v(t);
        return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(t) {
        return v(t) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      _addLayers: function(t) {
        t = t ? nt(t) ? t : [t] : [];
        for (var e = 0, i = t.length; e < i; e++)
          this.addLayer(t[e]);
      },
      _addZoomLimit: function(t) {
        (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[v(t)] = t, this._updateZoomLevels());
      },
      _removeZoomLimit: function(t) {
        var e = v(t);
        this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
        for (var n in this._zoomBoundLayers) {
          var o = this._zoomBoundLayers[n].options;
          t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom), e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom);
        }
        this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Dt = rt.extend({
      initialize: function(t, e) {
        z(this, e), this._layers = {};
        var i, n;
        if (t)
          for (i = 0, n = t.length; i < n; i++)
            this.addLayer(t[i]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(t) {
        var e = this.getLayerId(t);
        return this._layers[e] = t, this._map && this._map.addLayer(t), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(t) {
        var e = t in this._layers ? t : this.getLayerId(t);
        return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(t) {
        var e = typeof t == "number" ? t : this.getLayerId(t);
        return e in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i, n;
        for (i in this._layers)
          n = this._layers[i], n[t] && n[t].apply(n, e);
        return this;
      },
      onAdd: function(t) {
        this.eachLayer(t.addLayer, t);
      },
      onRemove: function(t) {
        this.eachLayer(t.removeLayer, t);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(t, e) {
        for (var i in this._layers)
          t.call(e, this._layers[i]);
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(t) {
        return this._layers[t];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var t = [];
        return this.eachLayer(t.push, t), t;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(t) {
        return this.invoke("setZIndex", t);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(t) {
        return v(t);
      }
    }), Or = function(t, e) {
      return new Dt(t, e);
    }, pt = Dt.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), Dt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Dt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(t) {
        return this.invoke("setStyle", t);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var t = new K();
        for (var e in this._layers) {
          var i = this._layers[e];
          t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
        }
        return t;
      }
    }), Ir = function(t, e) {
      return new pt(t, e);
    }, $t = dt.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1
      },
      initialize: function(t) {
        z(this, t);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(t) {
        return this._createIcon("icon", t);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(t) {
        return this._createIcon("shadow", t);
      },
      _createIcon: function(t, e) {
        var i = this._getIconUrl(t);
        if (!i) {
          if (t === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
        return this._setIconStyles(n, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), n;
      },
      _setIconStyles: function(t, e) {
        var i = this.options, n = i[e + "Size"];
        typeof n == "number" && (n = [n, n]);
        var o = x(n), a = x(e === "shadow" && i.shadowAnchor || i.iconAnchor || o && o.divideBy(2, !0));
        t.className = "leaflet-marker-" + e + " " + (i.className || ""), a && (t.style.marginLeft = -a.x + "px", t.style.marginTop = -a.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
      },
      _createImg: function(t, e) {
        return e = e || document.createElement("img"), e.src = t, e;
      },
      _getIconUrl: function(t) {
        return y.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
      }
    });
    function Zr(t) {
      return new $t(t);
    }
    var ue = $t.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(t) {
        return typeof ue.imagePath != "string" && (ue.imagePath = this._detectIconPath()), (this.options.imagePath || ue.imagePath) + $t.prototype._getIconUrl.call(this, t);
      },
      _stripUrl: function(t) {
        var e = function(i, n, o) {
          var a = n.exec(i);
          return a && a[o];
        };
        return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var t = S("div", "leaflet-default-icon-path", document.body), e = ne(t, "background-image") || ne(t, "backgroundImage");
        if (document.body.removeChild(t), e = this._stripUrl(e), e)
          return e;
        var i = document.querySelector('link[href$="leaflet.css"]');
        return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
      }
    }), Vn = ht.extend({
      initialize: function(t) {
        this._marker = t;
      },
      addHooks: function() {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new bt(t, t, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), A(t, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && N(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(t) {
        var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, o = this._marker.options.autoPanPadding, a = At(e._icon), c = i.getPixelBounds(), d = i.getPixelOrigin(), f = Y(
          c.min._subtract(d).add(o),
          c.max._subtract(d).subtract(o)
        );
        if (!f.contains(a)) {
          var m = x(
            (Math.max(f.max.x, a.x) - f.max.x) / (c.max.x - f.max.x) - (Math.min(f.min.x, a.x) - f.min.x) / (c.min.x - f.min.x),
            (Math.max(f.max.y, a.y) - f.max.y) / (c.max.y - f.max.y) - (Math.min(f.min.y, a.y) - f.min.y) / (c.min.y - f.min.y)
          ).multiplyBy(n);
          i.panBy(m, { animate: !1 }), this._draggable._newPos._add(m), this._draggable._startPos._add(m), W(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = G(this._adjustPan.bind(this, t));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(t) {
        this._marker.options.autoPan && (X(this._panRequest), this._panRequest = G(this._adjustPan.bind(this, t)));
      },
      _onDrag: function(t) {
        var e = this._marker, i = e._shadow, n = At(e._icon), o = e._map.layerPointToLatLng(n);
        i && W(i, n), e._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
      },
      _onDragEnd: function(t) {
        X(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
      }
    }), Oe = rt.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new ue(),
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: !0,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: !1,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !1,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: !0,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: !1,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: !1,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(t, e) {
        z(this, e), this._latlng = I(t);
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
      },
      onRemove: function(t) {
        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = I(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(t) {
        return this.options.zIndexOffset = t, this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(t) {
        return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(t);
        }
        return this;
      },
      _initIcon: function() {
        var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), n = !1;
        i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), A(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && T(i, "focus", this._panOnFocus, this);
        var o = t.icon.createShadow(this._shadow), a = !1;
        o !== this._shadow && (this._removeShadow(), a = !0), o && (A(o, e), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && a && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Z(this._icon, "focus", this._panOnFocus, this), D(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && D(this._shadow), this._shadow = null;
      },
      _setPos: function(t) {
        this._icon && W(this._icon, t), this._shadow && W(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(e);
      },
      _initInteraction: function() {
        if (this.options.interactive && (A(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Vn)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Vn(this), t && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        this._icon && tt(this._icon, t), this._shadow && tt(this._shadow, t);
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var t = this._map;
        if (t) {
          var e = this.options.icon.options, i = e.iconSize ? x(e.iconSize) : x(0, 0), n = e.iconAnchor ? x(e.iconAnchor) : x(0, 0);
          t.panInside(this._latlng, {
            paddingTopLeft: n,
            paddingBottomRight: i.subtract(n)
          });
        }
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function Br(t, e) {
      return new Oe(t, e);
    }
    var wt = rt.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: !0,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: !1,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !0
      },
      beforeAdd: function(t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(t) {
        return z(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project(), this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    }), Ie = wt.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(t, e) {
        z(this, e), this._latlng = I(t), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = I(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(t) {
        return this.options.radius = this._radius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(t) {
        var e = t && t.radius || this._radius;
        return wt.prototype.setStyle.call(this, t), this.setRadius(e), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), n = [t + i, e + i];
        this._pxBounds = new R(this._point.subtract(n), this._point.add(n));
      },
      _update: function() {
        this._map && this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function Rr(t, e) {
      return new Ie(t, e);
    }
    var zi = Ie.extend({
      initialize: function(t, e, i) {
        if (typeof e == "number" && (e = u({}, i, { radius: e })), z(this, e), this._latlng = I(t), isNaN(this.options.radius))
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(t) {
        return this._mRadius = t, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var t = [this._radius, this._radiusY || this._radius];
        return new K(
          this._map.layerPointToLatLng(this._point.subtract(t)),
          this._map.layerPointToLatLng(this._point.add(t))
        );
      },
      setStyle: wt.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
        if (n.distance === yt.distance) {
          var o = Math.PI / 180, a = this._mRadius / yt.R / o, c = i.project([e + a, t]), d = i.project([e - a, t]), f = c.add(d).divideBy(2), m = i.unproject(f).lat, g = Math.acos((Math.cos(a * o) - Math.sin(e * o) * Math.sin(m * o)) / (Math.cos(e * o) * Math.cos(m * o))) / o;
          (isNaN(g) || g === 0) && (g = a / Math.cos(Math.PI / 180 * e)), this._point = f.subtract(i.getPixelOrigin()), this._radius = isNaN(g) ? 0 : f.x - i.project([m, t - g]).x, this._radiusY = f.y - c.y;
        } else {
          var w = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(w).x;
        }
        this._updateBounds();
      }
    });
    function Dr(t, e, i) {
      return new zi(t, e, i);
    }
    var _t = wt.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: !1
      },
      initialize: function(t, e) {
        z(this, e), this._setLatLngs(t);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(t) {
        return this._setLatLngs(t), this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(t) {
        for (var e = 1 / 0, i = null, n = he, o, a, c = 0, d = this._parts.length; c < d; c++)
          for (var f = this._parts[c], m = 1, g = f.length; m < g; m++) {
            o = f[m - 1], a = f[m];
            var w = n(t, o, a, !0);
            w < e && (e = w, i = n(t, o, a));
          }
        return i && (i.distance = Math.sqrt(e)), i;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Hn(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(t, e) {
        return e = e || this._defaultShape(), t = I(t), e.push(t), this._bounds.extend(t), this.redraw();
      },
      _setLatLngs: function(t) {
        this._bounds = new K(), this._latlngs = this._convertLatLngs(t);
      },
      _defaultShape: function() {
        return et(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(t) {
        for (var e = [], i = et(t), n = 0, o = t.length; n < o; n++)
          i ? (e[n] = I(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
        return e;
      },
      _project: function() {
        var t = new R();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
      },
      _updateBounds: function() {
        var t = this._clickTolerance(), e = new P(t, t);
        this._rawPxBounds && (this._pxBounds = new R([
          this._rawPxBounds.min.subtract(e),
          this._rawPxBounds.max.add(e)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(t, e, i) {
        var n = t[0] instanceof O, o = t.length, a, c;
        if (n) {
          for (c = [], a = 0; a < o; a++)
            c[a] = this._map.latLngToLayerPoint(t[a]), i.extend(c[a]);
          e.push(c);
        } else
          for (a = 0; a < o; a++)
            this._projectLatlngs(t[a], e, i);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var t = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var e = this._parts, i, n, o, a, c, d, f;
          for (i = 0, o = 0, a = this._rings.length; i < a; i++)
            for (f = this._rings[i], n = 0, c = f.length; n < c - 1; n++)
              d = $n(f[n], f[n + 1], t, n, !0), d && (e[o] = e[o] || [], e[o].push(d[0]), (d[1] !== f[n + 1] || n === c - 2) && (e[o].push(d[1]), o++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
          t[i] = Bn(t[i], e);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t, e) {
        var i, n, o, a, c, d, f = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (i = 0, a = this._parts.length; i < a; i++)
          for (d = this._parts[i], n = 0, c = d.length, o = c - 1; n < c; o = n++)
            if (!(!e && n === 0) && Rn(t, d[o], d[n]) <= f)
              return !0;
        return !1;
      }
    });
    function $r(t, e) {
      return new _t(t, e);
    }
    _t._flat = Nn;
    var Nt = _t.extend({
      options: {
        fill: !0
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Un(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(t) {
        var e = _t.prototype._convertLatLngs.call(this, t), i = e.length;
        return i >= 2 && e[0] instanceof O && e[0].equals(e[i - 1]) && e.pop(), e;
      },
      _setLatLngs: function(t) {
        _t.prototype._setLatLngs.call(this, t), et(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return et(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var t = this._renderer._bounds, e = this.options.weight, i = new P(e, e);
        if (t = new R(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var n = 0, o = this._rings.length, a; n < o; n++)
            a = Wn(this._rings[n], t, !0), a.length && this._parts.push(a);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(t) {
        var e = !1, i, n, o, a, c, d, f, m;
        if (!this._pxBounds || !this._pxBounds.contains(t))
          return !1;
        for (a = 0, f = this._parts.length; a < f; a++)
          for (i = this._parts[a], c = 0, m = i.length, d = m - 1; c < m; d = c++)
            n = i[c], o = i[d], n.y > t.y != o.y > t.y && t.x < (o.x - n.x) * (t.y - n.y) / (o.y - n.y) + n.x && (e = !e);
        return e || _t.prototype._containsPoint.call(this, t, !0);
      }
    });
    function Nr(t, e) {
      return new Nt(t, e);
    }
    var mt = pt.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(t, e) {
        z(this, e), this._layers = {}, t && this.addData(t);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(t) {
        var e = nt(t) ? t : t.features, i, n, o;
        if (e) {
          for (i = 0, n = e.length; i < n; i++)
            o = e[i], (o.geometries || o.geometry || o.features || o.coordinates) && this.addData(o);
          return this;
        }
        var a = this.options;
        if (a.filter && !a.filter(t))
          return this;
        var c = Ze(t, a);
        return c ? (c.feature = De(t), c.defaultOptions = c.options, this.resetStyle(c), a.onEachFeature && a.onEachFeature(t, c), this.addLayer(c)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(t) {
        return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = u({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(t) {
        return this.eachLayer(function(e) {
          this._setLayerStyle(e, t);
        }, this);
      },
      _setLayerStyle: function(t, e) {
        t.setStyle && (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
      }
    });
    function Ze(t, e) {
      var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, o = [], a = e && e.pointToLayer, c = e && e.coordsToLatLng || Oi, d, f, m, g;
      if (!n && !i)
        return null;
      switch (i.type) {
        case "Point":
          return d = c(n), qn(a, t, d, e);
        case "MultiPoint":
          for (m = 0, g = n.length; m < g; m++)
            d = c(n[m]), o.push(qn(a, t, d, e));
          return new pt(o);
        case "LineString":
        case "MultiLineString":
          return f = Be(n, i.type === "LineString" ? 0 : 1, c), new _t(f, e);
        case "Polygon":
        case "MultiPolygon":
          return f = Be(n, i.type === "Polygon" ? 1 : 2, c), new Nt(f, e);
        case "GeometryCollection":
          for (m = 0, g = i.geometries.length; m < g; m++) {
            var w = Ze({
              geometry: i.geometries[m],
              type: "Feature",
              properties: t.properties
            }, e);
            w && o.push(w);
          }
          return new pt(o);
        case "FeatureCollection":
          for (m = 0, g = i.features.length; m < g; m++) {
            var E = Ze(i.features[m], e);
            E && o.push(E);
          }
          return new pt(o);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function qn(t, e, i, n) {
      return t ? t(e, i) : new Oe(i, n && n.markersInheritOptions && n);
    }
    function Oi(t) {
      return new O(t[1], t[0], t[2]);
    }
    function Be(t, e, i) {
      for (var n = [], o = 0, a = t.length, c; o < a; o++)
        c = e ? Be(t[o], e - 1, i) : (i || Oi)(t[o]), n.push(c);
      return n;
    }
    function Ii(t, e) {
      return t = I(t), t.alt !== void 0 ? [k(t.lng, e), k(t.lat, e), k(t.alt, e)] : [k(t.lng, e), k(t.lat, e)];
    }
    function Re(t, e, i, n) {
      for (var o = [], a = 0, c = t.length; a < c; a++)
        o.push(e ? Re(t[a], et(t[a]) ? 0 : e - 1, i, n) : Ii(t[a], n));
      return !e && i && o.push(o[0].slice()), o;
    }
    function Ht(t, e) {
      return t.feature ? u({}, t.feature, { geometry: e }) : De(e);
    }
    function De(t) {
      return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
        type: "Feature",
        properties: {},
        geometry: t
      };
    }
    var Zi = {
      toGeoJSON: function(t) {
        return Ht(this, {
          type: "Point",
          coordinates: Ii(this.getLatLng(), t)
        });
      }
    };
    Oe.include(Zi), zi.include(Zi), Ie.include(Zi), _t.include({
      toGeoJSON: function(t) {
        var e = !et(this._latlngs), i = Re(this._latlngs, e ? 1 : 0, !1, t);
        return Ht(this, {
          type: (e ? "Multi" : "") + "LineString",
          coordinates: i
        });
      }
    }), Nt.include({
      toGeoJSON: function(t) {
        var e = !et(this._latlngs), i = e && !et(this._latlngs[0]), n = Re(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
        return e || (n = [n]), Ht(this, {
          type: (i ? "Multi" : "") + "Polygon",
          coordinates: n
        });
      }
    }), Dt.include({
      toMultiPoint: function(t) {
        var e = [];
        return this.eachLayer(function(i) {
          e.push(i.toGeoJSON(t).geometry.coordinates);
        }), Ht(this, {
          type: "MultiPoint",
          coordinates: e
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(t) {
        var e = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (e === "MultiPoint")
          return this.toMultiPoint(t);
        var i = e === "GeometryCollection", n = [];
        return this.eachLayer(function(o) {
          if (o.toGeoJSON) {
            var a = o.toGeoJSON(t);
            if (i)
              n.push(a.geometry);
            else {
              var c = De(a);
              c.type === "FeatureCollection" ? n.push.apply(n, c.features) : n.push(c);
            }
          }
        }), i ? Ht(this, {
          geometries: n,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: n
        };
      }
    });
    function jn(t, e) {
      return new mt(t, e);
    }
    var Hr = jn, $e = rt.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(t, e, i) {
        this._url = t, this._bounds = F(e), z(this, i);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (A(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        D(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(t) {
        return this.options.opacity = t, this._image && this._updateOpacity(), this;
      },
      setStyle: function(t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        return this._map && Bt(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && Rt(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(t) {
        return this._bounds = F(t), this._map && this._reset(), this;
      },
      getEvents: function() {
        var t = {
          zoom: this._reset,
          viewreset: this._reset
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var t = this._url.tagName === "IMG", e = this._image = t ? this._url : S("img");
        if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onload = p(this.fire, this, "load"), e.onerror = p(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
          this._url = e.src;
          return;
        }
        e.src = this._url, e.alt = this.options.alt;
      },
      _animateZoom: function(t) {
        var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
        Tt(this._image, i, e);
      },
      _reset: function() {
        var t = this._image, e = new R(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), i = e.getSize();
        W(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
      },
      _updateOpacity: function() {
        tt(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function() {
        this.fire("error");
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && (this._url = t, this._image.src = t);
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    }), Wr = function(t, e, i) {
      return new $e(t, e, i);
    }, Gn = $e.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: !0,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: !0,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: !0,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: !1,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: !0
      },
      _initImage: function() {
        var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : S("video");
        if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onloadeddata = p(this.fire, this, "load"), t) {
          for (var i = e.getElementsByTagName("source"), n = [], o = 0; o < i.length; o++)
            n.push(i[o].src);
          this._url = i.length > 0 ? n : [e.src];
          return;
        }
        nt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
        for (var a = 0; a < this._url.length; a++) {
          var c = S("source");
          c.src = this._url[a], e.appendChild(c);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function Ur(t, e, i) {
      return new Gn(t, e, i);
    }
    var Yn = $e.extend({
      _initImage: function() {
        var t = this._image = this._url;
        A(t, "leaflet-image-layer"), this._zoomAnimated && A(t, "leaflet-zoom-animated"), this.options.className && A(t, this.options.className), t.onselectstart = b, t.onmousemove = b;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function Fr(t, e, i) {
      return new Yn(t, e, i);
    }
    var ut = rt.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: !1,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(t, e) {
        t && (t instanceof O || nt(t)) ? (this._latlng = I(t), z(this, e)) : (z(this, t), this._source = e), this.options.content && (this._content = this.options.content);
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        return this._map && this._map.removeLayer(this), this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(t) {
        return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
      },
      onAdd: function(t) {
        this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && tt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && tt(this._container, 1), this.bringToFront(), this.options.interactive && (A(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(t) {
        t._fadeAnimated ? (tt(this._container, 0), this._removeTimeout = setTimeout(p(D, void 0, this._container), 200)) : D(this._container), this.options.interactive && (N(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(t) {
        return this._latlng = I(t), this._map && (this._updatePosition(), this._adjustPan()), this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(t) {
        return this._content = t, this.update(), this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
      },
      getEvents: function() {
        var t = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        return this._map && Bt(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && Rt(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(t) {
        var e = this._source;
        if (!e._map)
          return !1;
        if (e instanceof pt) {
          e = null;
          var i = this._source._layers;
          for (var n in i)
            if (i[n]._map) {
              e = i[n];
              break;
            }
          if (!e)
            return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter)
            t = e.getCenter();
          else if (e.getLatLng)
            t = e.getLatLng();
          else if (e.getBounds)
            t = e.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var t = this._contentNode, e = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof e == "string")
            t.innerHTML = e;
          else {
            for (; t.hasChildNodes(); )
              t.removeChild(t.firstChild);
            t.appendChild(e);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng), e = x(this.options.offset), i = this._getAnchor();
          this._zoomAnimated ? W(this._container, t.add(i)) : e = e.add(t).add(i);
          var n = this._containerBottom = -e.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
          this._container.style.bottom = n + "px", this._container.style.left = o + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    M.include({
      _initOverlay: function(t, e, i, n) {
        var o = e;
        return o instanceof t || (o = new t(n).setContent(e)), i && o.setLatLng(i), o;
      }
    }), rt.include({
      _initOverlay: function(t, e, i, n) {
        var o = i;
        return o instanceof t ? (z(o, n), o._source = this) : (o = e && !n ? e : new t(n, this), o.setContent(i)), o;
      }
    });
    var Ne = ut.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: !0,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: !1,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: !0,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: !0,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: !0,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(t) {
        return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, ut.prototype.openOn.call(this, t);
      },
      onAdd: function(t) {
        ut.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof wt || this._source.on("preclick", Ct));
      },
      onRemove: function(t) {
        ut.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof wt || this._source.off("preclick", Ct));
      },
      getEvents: function() {
        var t = ut.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
      },
      _initLayout: function() {
        var t = "leaflet-popup", e = this._container = S(
          "div",
          t + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), i = this._wrapper = S("div", t + "-content-wrapper", e);
        if (this._contentNode = S("div", t + "-content", i), ae(e), Ti(this._contentNode), T(e, "contextmenu", Ct), this._tipContainer = S("div", t + "-tip-container", e), this._tip = S("div", t + "-tip", this._tipContainer), this.options.closeButton) {
          var n = this._closeButton = S("a", t + "-close-button", e);
          n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', T(n, "click", function(o) {
            V(o), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var t = this._contentNode, e = t.style;
        e.width = "", e.whiteSpace = "nowrap";
        var i = t.offsetWidth;
        i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
        var n = t.offsetHeight, o = this.options.maxHeight, a = "leaflet-popup-scrolled";
        o && n > o ? (e.height = o + "px", A(t, a)) : N(t, a), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
        W(this._container, e.add(i));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var t = this._map, e = parseInt(ne(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, n = this._containerWidth, o = new P(this._containerLeft, -i - this._containerBottom);
          o._add(At(this._container));
          var a = t.layerPointToContainerPoint(o), c = x(this.options.autoPanPadding), d = x(this.options.autoPanPaddingTopLeft || c), f = x(this.options.autoPanPaddingBottomRight || c), m = t.getSize(), g = 0, w = 0;
          a.x + n + f.x > m.x && (g = a.x + n - m.x + f.x), a.x - g - d.x < 0 && (g = a.x - d.x), a.y + i + f.y > m.y && (w = a.y + i - m.y + f.y), a.y - w - d.y < 0 && (w = a.y - d.y), (g || w) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([g, w]));
        }
      },
      _getAnchor: function() {
        return x(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), Vr = function(t, e) {
      return new Ne(t, e);
    };
    M.mergeOptions({
      closePopupOnClick: !0
    }), M.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(t, e, i) {
        return this._initOverlay(Ne, t, e, i).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(t) {
        return t = arguments.length ? t : this._popup, t && t.close(), this;
      }
    }), rt.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(t, e) {
        return this._popup = this._initOverlay(Ne, this._popup, t, e), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        return this._popup && (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(t) {
        return this._popup && (this instanceof pt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        return this._popup && this._popup.close(), this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        return this._popup && this._popup.toggle(this), this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : !1;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(t) {
        return this._popup && this._popup.setContent(t), this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(t) {
        if (!(!this._popup || !this._map)) {
          Et(t);
          var e = t.layer || t.target;
          if (this._popup._source === e && !(e instanceof wt)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
            return;
          }
          this._popup._source = e, this.openPopup(t.latlng);
        }
      },
      _movePopup: function(t) {
        this._popup.setLatLng(t.latlng);
      },
      _onKeyPress: function(t) {
        t.originalEvent.keyCode === 13 && this._openPopup(t);
      }
    });
    var He = ut.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: !1,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: !1,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(t) {
        ut.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(t) {
        ut.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var t = ut.prototype.getEvents.call(this);
        return this.options.permanent || (t.preclick = this.close), t;
      },
      _initLayout: function() {
        var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = S("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + v(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(t) {
        var e, i, n = this._map, o = this._container, a = n.latLngToContainerPoint(n.getCenter()), c = n.layerPointToContainerPoint(t), d = this.options.direction, f = o.offsetWidth, m = o.offsetHeight, g = x(this.options.offset), w = this._getAnchor();
        d === "top" ? (e = f / 2, i = m) : d === "bottom" ? (e = f / 2, i = 0) : d === "center" ? (e = f / 2, i = m / 2) : d === "right" ? (e = 0, i = m / 2) : d === "left" ? (e = f, i = m / 2) : c.x < a.x ? (d = "right", e = 0, i = m / 2) : (d = "left", e = f + (g.x + w.x) * 2, i = m / 2), t = t.subtract(x(e, i, !0)).add(g).add(w), N(o, "leaflet-tooltip-right"), N(o, "leaflet-tooltip-left"), N(o, "leaflet-tooltip-top"), N(o, "leaflet-tooltip-bottom"), A(o, "leaflet-tooltip-" + d), W(o, t);
      },
      _updatePosition: function() {
        var t = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(t);
      },
      setOpacity: function(t) {
        this.options.opacity = t, this._container && tt(this._container, t);
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        this._setPosition(e);
      },
      _getAnchor: function() {
        return x(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), qr = function(t, e) {
      return new He(t, e);
    };
    M.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(t, e, i) {
        return this._initOverlay(He, t, e, i).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(t) {
        return t.close(), this;
      }
    }), rt.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(t, e) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(He, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(t) {
        if (!(!t && this._tooltipHandlersAdded)) {
          var e = t ? "off" : "on", i = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners), this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), this[e](i), this._tooltipHandlersAdded = !t;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(t) {
        return this._tooltip && (this instanceof pt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip)
          return this._tooltip.close();
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(t) {
        return this._tooltip && this._tooltip.setContent(t), this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer: function(t) {
        var e = t.getElement();
        e && (T(e, "focus", function() {
          this._tooltip._source = t, this.openTooltip();
        }, this), T(e, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(t) {
        var e = t.getElement();
        e && e.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(t) {
        !this._tooltip || !this._map || this._map.dragging && this._map.dragging.moving() || (this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0));
      },
      _moveTooltip: function(t) {
        var e = t.latlng, i, n;
        this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), n = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(n)), this._tooltip.setLatLng(e);
      }
    });
    var Kn = $t.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: !1,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(t) {
        var e = t && t.tagName === "DIV" ? t : document.createElement("div"), i = this.options;
        if (i.html instanceof Element ? (Ce(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
          var n = x(i.bgPos);
          e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
        }
        return this._setIconStyles(e, "icon"), e;
      },
      createShadow: function() {
        return null;
      }
    });
    function jr(t) {
      return new Kn(t);
    }
    $t.Default = ue;
    var ce = rt.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: y.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: !0,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: !1,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(t) {
        z(this, t);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this);
      },
      onRemove: function(t) {
        this._removeAllTiles(), D(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (Bt(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (Rt(this._container), this._setAutoZIndex(Math.min)), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(t) {
        return this.options.opacity = t, this._updateOpacity(), this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var t = this._clampZoom(this._map.getZoom());
          t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
        }
        return this;
      },
      getEvents: function() {
        var t = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = C(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var t = this.options.tileSize;
        return t instanceof P ? t : new P(t, t);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(t) {
        for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, o = e.length, a; n < o; n++)
          a = e[n].style.zIndex, e[n] !== this._container && a && (i = t(i, +a));
        isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !y.ielt9) {
          tt(this._container, this.options.opacity);
          var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
          for (var n in this._tiles) {
            var o = this._tiles[n];
            if (!(!o.current || !o.loaded)) {
              var a = Math.min(1, (t - o.loaded) / 200);
              tt(o.el, a), a < 1 ? e = !0 : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0);
            }
          }
          i && !this._noPrune && this._pruneTiles(), e && (X(this._fadeFrame), this._fadeFrame = G(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: b,
      _initContainer: function() {
        this._container || (this._container = S("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var t = this._tileZoom, e = this.options.maxZoom;
        if (t !== void 0) {
          for (var i in this._levels)
            i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (D(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
          var n = this._levels[t], o = this._map;
          return n || (n = this._levels[t] = {}, n.el = S("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), b(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
        }
      },
      _onUpdateLevel: b,
      _onRemoveLevel: b,
      _onCreateLevel: b,
      _pruneTiles: function() {
        if (this._map) {
          var t, e, i = this._map.getZoom();
          if (i > this.options.maxZoom || i < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (t in this._tiles)
            e = this._tiles[t], e.retain = e.current;
          for (t in this._tiles)
            if (e = this._tiles[t], e.current && !e.active) {
              var n = e.coords;
              this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2);
            }
          for (t in this._tiles)
            this._tiles[t].retain || this._removeTile(t);
        }
      },
      _removeTilesAtZoom: function(t) {
        for (var e in this._tiles)
          this._tiles[e].coords.z === t && this._removeTile(e);
      },
      _removeAllTiles: function() {
        for (var t in this._tiles)
          this._removeTile(t);
      },
      _invalidateAll: function() {
        for (var t in this._levels)
          D(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(t, e, i, n) {
        var o = Math.floor(t / 2), a = Math.floor(e / 2), c = i - 1, d = new P(+o, +a);
        d.z = +c;
        var f = this._tileCoordsToKey(d), m = this._tiles[f];
        return m && m.active ? (m.retain = !0, !0) : (m && m.loaded && (m.retain = !0), c > n ? this._retainParent(o, a, c, n) : !1);
      },
      _retainChildren: function(t, e, i, n) {
        for (var o = 2 * t; o < 2 * t + 2; o++)
          for (var a = 2 * e; a < 2 * e + 2; a++) {
            var c = new P(o, a);
            c.z = i + 1;
            var d = this._tileCoordsToKey(c), f = this._tiles[d];
            if (f && f.active) {
              f.retain = !0;
              continue;
            } else
              f && f.loaded && (f.retain = !0);
            i + 1 < n && this._retainChildren(o, a, i + 1, n);
          }
      },
      _resetView: function(t) {
        var e = t && (t.pinch || t.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
      },
      _animateZoom: function(t) {
        this._setView(t.center, t.zoom, !0, t.noUpdate);
      },
      _clampZoom: function(t) {
        var e = this.options;
        return e.minNativeZoom !== void 0 && t < e.minNativeZoom ? e.minNativeZoom : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t ? e.maxNativeZoom : t;
      },
      _setView: function(t, e, i, n) {
        var o = Math.round(e);
        this.options.maxZoom !== void 0 && o > this.options.maxZoom || this.options.minZoom !== void 0 && o < this.options.minZoom ? o = void 0 : o = this._clampZoom(o);
        var a = this.options.updateWhenZooming && o !== this._tileZoom;
        (!n || a) && (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), o !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
      },
      _setZoomTransforms: function(t, e) {
        for (var i in this._levels)
          this._setZoomTransform(this._levels[i], t, e);
      },
      _setZoomTransform: function(t, e, i) {
        var n = this._map.getZoomScale(i, t.zoom), o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
        y.any3d ? Tt(t.el, o, n) : W(t.el, o);
      },
      _resetGrid: function() {
        var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
        o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [
          Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
          Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)
        ], this._wrapY = e.wrapLat && !this.options.noWrap && [
          Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
          Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(t) {
        var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), o = e.project(t, this._tileZoom).floor(), a = e.getSize().divideBy(n * 2);
        return new R(o.subtract(a), o.add(a));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(t) {
        var e = this._map;
        if (e) {
          var i = this._clampZoom(e.getZoom());
          if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
            var n = this._getTiledPixelBounds(t), o = this._pxBoundsToTileRange(n), a = o.getCenter(), c = [], d = this.options.keepBuffer, f = new R(
              o.getBottomLeft().subtract([d, -d]),
              o.getTopRight().add([d, -d])
            );
            if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var m in this._tiles) {
              var g = this._tiles[m].coords;
              (g.z !== this._tileZoom || !f.contains(new P(g.x, g.y))) && (this._tiles[m].current = !1);
            }
            if (Math.abs(i - this._tileZoom) > 1) {
              this._setView(t, i);
              return;
            }
            for (var w = o.min.y; w <= o.max.y; w++)
              for (var E = o.min.x; E <= o.max.x; E++) {
                var it = new P(E, w);
                if (it.z = this._tileZoom, !!this._isValidTile(it)) {
                  var St = this._tiles[this._tileCoordsToKey(it)];
                  St ? St.current = !0 : c.push(it);
                }
              }
            if (c.sort(function(xt, Bi) {
              return xt.distanceTo(a) - Bi.distanceTo(a);
            }), c.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var Ue = document.createDocumentFragment();
              for (E = 0; E < c.length; E++)
                this._addTile(c[E], Ue);
              this._level.el.appendChild(Ue);
            }
          }
        }
      },
      _isValidTile: function(t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._globalTileRange;
          if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var n = this._tileCoordsToBounds(t);
        return F(this.options.bounds).overlaps(n);
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t));
      },
      _tileCoordsToNwSe: function(t) {
        var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), o = n.add(i), a = e.unproject(n, t.z), c = e.unproject(o, t.z);
        return [a, c];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(t) {
        var e = this._tileCoordsToNwSe(t), i = new K(e[0], e[1]);
        return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(t) {
        var e = t.split(":"), i = new P(+e[0], +e[1]);
        return i.z = +e[2], i;
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        e && (D(e.el), delete this._tiles[t], this.fire("tileunload", {
          tile: e.el,
          coords: this._keyToTileCoords(t)
        }));
      },
      _initTile: function(t) {
        A(t, "leaflet-tile");
        var e = this.getTileSize();
        t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = b, t.onmousemove = b, y.ielt9 && this.options.opacity < 1 && tt(t, this.options.opacity);
      },
      _addTile: function(t, e) {
        var i = this._getTilePos(t), n = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), p(this._tileReady, this, t));
        this._initTile(o), this.createTile.length < 2 && G(p(this._tileReady, this, t, null, o)), W(o, i), this._tiles[n] = {
          el: o,
          coords: t,
          current: !0
        }, e.appendChild(o), this.fire("tileloadstart", {
          tile: o,
          coords: t
        });
      },
      _tileReady: function(t, e, i) {
        e && this.fire("tileerror", {
          error: e,
          tile: i,
          coords: t
        });
        var n = this._tileCoordsToKey(t);
        i = this._tiles[n], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (tt(i.el, 0), X(this._fadeFrame), this._fadeFrame = G(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (A(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: i.el,
          coords: t
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), y.ielt9 || !this._map._fadeAnimated ? G(this._pruneTiles, this) : setTimeout(p(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(t) {
        return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(t) {
        var e = new P(
          this._wrapX ? q(t.x, this._wrapX) : t.x,
          this._wrapY ? q(t.y, this._wrapY) : t.y
        );
        return e.z = t.z, e;
      },
      _pxBoundsToTileRange: function(t) {
        var e = this.getTileSize();
        return new R(
          t.min.unscaleBy(e).floor(),
          t.max.unscaleBy(e).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var t in this._tiles)
          if (!this._tiles[t].loaded)
            return !1;
        return !0;
      }
    });
    function Gr(t) {
      return new ce(t);
    }
    var Wt = ce.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: !1,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: !1,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: !1
      },
      initialize: function(t, e) {
        this._url = t, e = z(this, e), e.detectRetina && y.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(t, e) {
        return this._url === t && e === void 0 && (e = !0), this._url = t, e || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(t, e) {
        var i = document.createElement("img");
        return T(i, "load", p(this._tileOnLoad, this, e, i)), T(i, "error", p(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(t) {
        var e = {
          r: y.retina ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: t.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var i = this._globalTileRange.max.y - t.y;
          this.options.tms && (e.y = i), e["-y"] = i;
        }
        return Ji(this._url, u(e, this.options));
      },
      _tileOnLoad: function(t, e) {
        y.ielt9 ? setTimeout(p(t, this, null, e), 0) : t(null, e);
      },
      _tileOnError: function(t, e, i) {
        var n = this.options.errorTileUrl;
        n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
      },
      _onTileRemove: function(t) {
        t.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, n = this.options.zoomOffset;
        return i && (t = e - t), t + n;
      },
      _getSubdomain: function(t) {
        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[e];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var t, e;
        for (t in this._tiles)
          if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = b, e.onerror = b, !e.complete)) {
            e.src = Le;
            var i = this._tiles[t].coords;
            D(e), delete this._tiles[t], this.fire("tileabort", {
              tile: e,
              coords: i
            });
          }
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        if (e)
          return e.el.setAttribute("src", Le), ce.prototype._removeTile.call(this, t);
      },
      _tileReady: function(t, e, i) {
        if (!(!this._map || i && i.getAttribute("src") === Le))
          return ce.prototype._tileReady.call(this, t, e, i);
      }
    });
    function Jn(t, e) {
      return new Wt(t, e);
    }
    var Qn = Wt.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: !1,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: !1
      },
      initialize: function(t, e) {
        this._url = t;
        var i = u({}, this.defaultWmsParams);
        for (var n in e)
          n in this.options || (i[n] = e[n]);
        e = z(this, e);
        var o = e.detectRetina && y.retina ? 2 : 1, a = this.getTileSize();
        i.width = a.x * o, i.height = a.y * o, this.wmsParams = i;
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[e] = this._crs.code, Wt.prototype.onAdd.call(this, t);
      },
      getTileUrl: function(t) {
        var e = this._tileCoordsToNwSe(t), i = this._crs, n = Y(i.project(e[0]), i.project(e[1])), o = n.min, a = n.max, c = (this._wmsVersion >= 1.3 && this._crs === Fn ? [o.y, o.x, a.y, a.x] : [o.x, o.y, a.x, a.y]).join(","), d = Wt.prototype.getTileUrl.call(this, t);
        return d + Ki(this.wmsParams, d, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + c;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(t, e) {
        return u(this.wmsParams, t), e || this.redraw(), this;
      }
    });
    function Yr(t, e) {
      return new Qn(t, e);
    }
    Wt.WMS = Qn, Jn.wms = Yr;
    var gt = rt.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(t) {
        z(this, t), v(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), this._zoomAnimated && A(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
      },
      _onAnimZoom: function(t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(t, e) {
        var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), o = this._map.project(this._center, e), a = n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t, e));
        y.any3d ? Tt(this._container, a, i) : W(this._container, a);
      },
      _reset: function() {
        this._update(), this._updateTransform(this._center, this._zoom);
        for (var t in this._layers)
          this._layers[t]._reset();
      },
      _onZoomEnd: function() {
        for (var t in this._layers)
          this._layers[t]._project();
      },
      _updatePaths: function() {
        for (var t in this._layers)
          this._layers[t]._update();
      },
      _update: function() {
        var t = this.options.padding, e = this._map.getSize(), i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
        this._bounds = new R(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), Xn = gt.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var t = gt.prototype.getEvents.call(this);
        return t.viewprereset = this._onViewPreReset, t;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        gt.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var t = this._container = document.createElement("canvas");
        T(t, "mousemove", this._onMouseMove, this), T(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), T(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
      },
      _destroyContainer: function() {
        X(this._redrawRequest), delete this._ctx, D(this._container), Z(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var t;
          this._redrawBounds = null;
          for (var e in this._layers)
            t = this._layers[e], t._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          gt.prototype._update.call(this);
          var t = this._bounds, e = this._container, i = t.getSize(), n = y.retina ? 2 : 1;
          W(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", y.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
        }
      },
      _reset: function() {
        gt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(t) {
        this._updateDashArray(t), this._layers[v(t)] = t;
        var e = t._order = {
          layer: t,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(t) {
        this._requestRedraw(t);
      },
      _removePath: function(t) {
        var e = t._order, i = e.next, n = e.prev;
        i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[v(t)], this._requestRedraw(t);
      },
      _updatePath: function(t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
      },
      _updateStyle: function(t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function(t) {
        if (typeof t.options.dashArray == "string") {
          var e = t.options.dashArray.split(/[, ]+/), i = [], n, o;
          for (o = 0; o < e.length; o++) {
            if (n = Number(e[o]), isNaN(n))
              return;
            i.push(n);
          }
          t.options._dashArray = i;
        } else
          t.options._dashArray = t.options.dashArray;
      },
      _requestRedraw: function(t) {
        this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || G(this._redraw, this));
      },
      _extendRedrawBounds: function(t) {
        if (t._pxBounds) {
          var e = (t.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new R(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var t = this._redrawBounds;
        if (t) {
          var e = t.getSize();
          this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var t, e = this._redrawBounds;
        if (this._ctx.save(), e) {
          var i = e.getSize();
          this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var n = this._drawFirst; n; n = n.next)
          t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(t, e) {
        if (this._drawing) {
          var i, n, o, a, c = t._parts, d = c.length, f = this._ctx;
          if (d) {
            for (f.beginPath(), i = 0; i < d; i++) {
              for (n = 0, o = c[i].length; n < o; n++)
                a = c[i][n], f[n ? "lineTo" : "moveTo"](a.x, a.y);
              e && f.closePath();
            }
            this._fillStroke(f, t);
          }
        }
      },
      _updateCircle: function(t) {
        if (!(!this._drawing || t._empty())) {
          var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
          o !== 1 && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, Math.PI * 2, !1), o !== 1 && i.restore(), this._fillStroke(i, t);
        }
      },
      _fillStroke: function(t, e) {
        var i = e.options;
        i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(t) {
        for (var e = this._map.mouseEventToLayerPoint(t), i, n, o = this._drawFirst; o; o = o.next)
          i = o.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
        this._fireEvent(n ? [n] : !1, t);
      },
      _onMouseMove: function(t) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var e = this._map.mouseEventToLayerPoint(t);
          this._handleMouseHover(t, e);
        }
      },
      _handleMouseOut: function(t) {
        var e = this._hoveredLayer;
        e && (N(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(t, e) {
        if (!this._mouseHoverThrottled) {
          for (var i, n, o = this._drawFirst; o; o = o.next)
            i = o.layer, i.options.interactive && i._containsPoint(e) && (n = i);
          n !== this._hoveredLayer && (this._handleMouseOut(t), n && (A(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(p(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(t, e, i) {
        this._map._fireDOMEvent(e, i || e.type, t);
      },
      _bringToFront: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (i)
            i.prev = n;
          else
            return;
          n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
        }
      },
      _bringToBack: function(t) {
        var e = t._order;
        if (e) {
          var i = e.next, n = e.prev;
          if (n)
            n.next = i;
          else
            return;
          i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
        }
      }
    });
    function to(t) {
      return y.canvas ? new Xn(t) : null;
    }
    var de = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
          return document.createElement("<lvml:" + t + ' class="lvml">');
        };
      } catch {
      }
      return function(t) {
        return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), Kr = {
      _initContainer: function() {
        this._container = S("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (gt.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(t) {
        var e = t._container = de("shape");
        A(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = de("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[v(t)] = t;
      },
      _addPath: function(t) {
        var e = t._container;
        this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
      },
      _removePath: function(t) {
        var e = t._container;
        D(e), t.removeInteractiveTarget(e), delete this._layers[v(t)];
      },
      _updateStyle: function(t) {
        var e = t._stroke, i = t._fill, n = t.options, o = t._container;
        o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = de("stroke")), o.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = nt(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (o.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = de("fill")), o.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (o.removeChild(i), t._fill = null);
      },
      _updateCircle: function(t) {
        var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
      },
      _setPath: function(t, e) {
        t._path.v = e;
      },
      _bringToFront: function(t) {
        Bt(t._container);
      },
      _bringToBack: function(t) {
        Rt(t._container);
      }
    }, We = y.vml ? de : on, fe = gt.extend({
      _initContainer: function() {
        this._container = We("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = We("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        D(this._container), Z(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          gt.prototype._update.call(this);
          var t = this._bounds, e = t.getSize(), i = this._container;
          (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), W(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(t) {
        var e = t._path = We("path");
        t.options.className && A(e, t.options.className), t.options.interactive && A(e, "leaflet-interactive"), this._updateStyle(t), this._layers[v(t)] = t;
      },
      _addPath: function(t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
      },
      _removePath: function(t) {
        D(t._path), t.removeInteractiveTarget(t._path), delete this._layers[v(t)];
      },
      _updatePath: function(t) {
        t._project(), t._update();
      },
      _updateStyle: function(t) {
        var e = t._path, i = t.options;
        e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
      },
      _updatePoly: function(t, e) {
        this._setPath(t, rn(t._parts, e));
      },
      _updateCircle: function(t) {
        var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, o = "a" + i + "," + n + " 0 1,0 ", a = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + i * 2 + ",0 " + o + -i * 2 + ",0 ";
        this._setPath(t, a);
      },
      _setPath: function(t, e) {
        t._path.setAttribute("d", e);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(t) {
        Bt(t._path);
      },
      _bringToBack: function(t) {
        Rt(t._path);
      }
    });
    y.vml && fe.include(Kr);
    function eo(t) {
      return y.svg || y.vml ? new fe(t) : null;
    }
    M.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(t) {
        var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
        return e || (e = this._renderer = this._createRenderer()), this.hasLayer(e) || this.addLayer(e), e;
      },
      _getPaneRenderer: function(t) {
        if (t === "overlayPane" || t === void 0)
          return !1;
        var e = this._paneRenderers[t];
        return e === void 0 && (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e), e;
      },
      _createRenderer: function(t) {
        return this.options.preferCanvas && to(t) || eo(t);
      }
    });
    var io = Nt.extend({
      initialize: function(t, e) {
        Nt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(t) {
        return this.setLatLngs(this._boundsToLatLngs(t));
      },
      _boundsToLatLngs: function(t) {
        return t = F(t), [
          t.getSouthWest(),
          t.getNorthWest(),
          t.getNorthEast(),
          t.getSouthEast()
        ];
      }
    });
    function Jr(t, e) {
      return new io(t, e);
    }
    fe.create = We, fe.pointsToPath = rn, mt.geometryToLayer = Ze, mt.coordsToLatLng = Oi, mt.coordsToLatLngs = Be, mt.latLngToCoords = Ii, mt.latLngsToCoords = Re, mt.getFeature = Ht, mt.asFeature = De, M.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var no = ht.extend({
      initialize: function(t) {
        this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
      },
      addHooks: function() {
        T(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        Z(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        D(this._pane), delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0, this._moved = !1;
      },
      _clearDeferredResetState: function() {
        this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
      },
      _onMouseDown: function(t) {
        if (!t.shiftKey || t.which !== 1 && t.button !== 1)
          return !1;
        this._clearDeferredResetState(), this._resetState(), oe(), gi(), this._startPoint = this._map.mouseEventToContainerPoint(t), T(document, {
          contextmenu: Et,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(t) {
        this._moved || (this._moved = !0, this._box = S("div", "leaflet-zoom-box", this._container), A(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
        var e = new R(this._point, this._startPoint), i = e.getSize();
        W(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
      },
      _finish: function() {
        this._moved && (D(this._box), N(this._container, "leaflet-crosshair")), re(), vi(), Z(document, {
          contextmenu: Et,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(t) {
        if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(p(this._resetState, this), 0);
          var e = new K(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
        }
      },
      _onKeyDown: function(t) {
        t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    M.addInitHook("addHandler", "boxZoom", no), M.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var oo = ht.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(t) {
        var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, o = t.originalEvent.shiftKey ? i - n : i + n;
        e.options.doubleClickZoom === "center" ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o);
      }
    });
    M.addInitHook("addHandler", "doubleClickZoom", oo), M.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: !0,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: !0,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: 1 / 0,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: !1,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var ro = ht.extend({
      addHooks: function() {
        if (!this._draggable) {
          var t = this._map;
          this._draggable = new bt(t._mapPane, t._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
        }
        A(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        N(this._map._container, "leaflet-grab"), N(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var t = this._map;
        if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var e = F(this._map.options.maxBounds);
          this._offsetLimit = Y(
            this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(t) {
        if (this._map.options.inertia) {
          var e = this._lastTime = +/* @__PURE__ */ new Date(), i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(i), this._times.push(e), this._prunePositions(e);
        }
        this._map.fire("move", t).fire("drag", t);
      },
      _prunePositions: function(t) {
        for (; this._positions.length > 1 && t - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var t = this._map.getSize().divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(t, e) {
        return t - (t - e) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var t = this._draggable._newPos.subtract(this._draggable._startPos), e = this._offsetLimit;
          t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
        }
      },
      _onPreDragWrap: function() {
        var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, o = (n - e + i) % t + e - i, a = (n + e + i) % t - e - i, c = Math.abs(o + i) < Math.abs(a + i) ? o : a;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = c;
      },
      _onDragEnd: function(t) {
        var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
        if (e.fire("dragend", t), n)
          e.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var o = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, c = i.easeLinearity, d = o.multiplyBy(c / a), f = d.distanceTo([0, 0]), m = Math.min(i.inertiaMaxSpeed, f), g = d.multiplyBy(m / f), w = m / (i.inertiaDeceleration * c), E = g.multiplyBy(-w / 2).round();
          !E.x && !E.y ? e.fire("moveend") : (E = e._limitOffset(E, e.options.maxBounds), G(function() {
            e.panBy(E, {
              duration: w,
              easeLinearity: c,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    M.addInitHook("addHandler", "dragging", ro), M.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var so = ht.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(t) {
        this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
      },
      addHooks: function() {
        var t = this._map._container;
        t.tabIndex <= 0 && (t.tabIndex = "0"), T(t, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), Z(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (!this._focused) {
          var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, n = t.scrollLeft || e.scrollLeft;
          this._map._container.focus(), window.scrollTo(n, i);
        }
      },
      _onFocus: function() {
        this._focused = !0, this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = !1, this._map.fire("blur");
      },
      _setPanDelta: function(t) {
        var e = this._panKeys = {}, i = this.keyCodes, n, o;
        for (n = 0, o = i.left.length; n < o; n++)
          e[i.left[n]] = [-1 * t, 0];
        for (n = 0, o = i.right.length; n < o; n++)
          e[i.right[n]] = [t, 0];
        for (n = 0, o = i.down.length; n < o; n++)
          e[i.down[n]] = [0, t];
        for (n = 0, o = i.up.length; n < o; n++)
          e[i.up[n]] = [0, -1 * t];
      },
      _setZoomDelta: function(t) {
        var e = this._zoomKeys = {}, i = this.keyCodes, n, o;
        for (n = 0, o = i.zoomIn.length; n < o; n++)
          e[i.zoomIn[n]] = t;
        for (n = 0, o = i.zoomOut.length; n < o; n++)
          e[i.zoomOut[n]] = -t;
      },
      _addHooks: function() {
        T(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        Z(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(t) {
        if (!(t.altKey || t.ctrlKey || t.metaKey)) {
          var e = t.keyCode, i = this._map, n;
          if (e in this._panKeys) {
            if (!i._panAnim || !i._panAnim._inProgress)
              if (n = this._panKeys[e], t.shiftKey && (n = x(n).multiplyBy(3)), i.options.maxBounds && (n = i._limitOffset(x(n), i.options.maxBounds)), i.options.worldCopyJump) {
                var o = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));
                i.panTo(o);
              } else
                i.panBy(n);
          } else if (e in this._zoomKeys)
            i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
          else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
            i.closePopup();
          else
            return;
          Et(t);
        }
      }
    });
    M.addInitHook("addHandler", "keyboard", so), M.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: !0,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var ao = ht.extend({
      addHooks: function() {
        T(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        Z(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(t) {
        var e = kn(t), i = this._map.options.wheelDebounceTime;
        this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var n = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(p(this._performZoom, this), n), Et(t);
      },
      _performZoom: function() {
        var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
        t._stop();
        var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, a = i ? Math.ceil(o / i) * i : o, c = t._limitZoom(e + (this._delta > 0 ? a : -a)) - e;
        this._delta = 0, this._startTime = null, c && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + c) : t.setZoomAround(this._lastMousePos, e + c));
      }
    });
    M.addInitHook("addHandler", "scrollWheelZoom", ao);
    var Qr = 600;
    M.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: y.touchNative && y.safari && y.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var lo = ht.extend({
      addHooks: function() {
        T(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        Z(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(t) {
        if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
          var e = t.touches[0];
          this._startPos = this._newPos = new P(e.clientX, e.clientY), this._holdTimeout = setTimeout(p(function() {
            this._cancel(), this._isTapValid() && (T(document, "touchend", V), T(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
          }, this), Qr), T(document, "touchend touchcancel contextmenu", this._cancel, this), T(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function t() {
        Z(document, "touchend", V), Z(document, "touchend touchcancel", t);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), Z(document, "touchend touchcancel contextmenu", this._cancel, this), Z(document, "touchmove", this._onMove, this);
      },
      _onMove: function(t) {
        var e = t.touches[0];
        this._newPos = new P(e.clientX, e.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(t, e) {
        var i = new MouseEvent(t, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: e.screenX,
          screenY: e.screenY,
          clientX: e.clientX,
          clientY: e.clientY
          // button: 2,
          // buttons: 2
        });
        i._simulated = !0, e.target.dispatchEvent(i);
      }
    });
    M.addInitHook("addHandler", "tapHold", lo), M.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: y.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var ho = ht.extend({
      addHooks: function() {
        A(this._map._container, "leaflet-touch-zoom"), T(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        N(this._map._container, "leaflet-touch-zoom"), Z(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(t) {
        var e = this._map;
        if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
          var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
          this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), T(document, "touchmove", this._onTouchMove, this), T(document, "touchend touchcancel", this._onTouchEnd, this), V(t);
        }
      },
      _onTouchMove: function(t) {
        if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
          var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), o = i.distanceTo(n) / this._startDist;
          if (this._zoom = e.getScaleZoom(o, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && o < 1 || this._zoom > e.getMaxZoom() && o > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
            if (this._center = this._startLatLng, o === 1)
              return;
          } else {
            var a = i._add(n)._divideBy(2)._subtract(this._centerPoint);
            if (o === 1 && a.x === 0 && a.y === 0)
              return;
            this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(a), this._zoom);
          }
          this._moved || (e._moveStart(!0, !1), this._moved = !0), X(this._animRequest);
          var c = p(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = G(c, this, !0), V(t);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, X(this._animRequest), Z(document, "touchmove", this._onTouchMove, this), Z(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    M.addInitHook("addHandler", "touchZoom", ho), M.BoxZoom = no, M.DoubleClickZoom = oo, M.Drag = ro, M.Keyboard = so, M.ScrollWheelZoom = ao, M.TapHold = lo, M.TouchZoom = ho, s.Bounds = R, s.Browser = y, s.CRS = ft, s.Canvas = Xn, s.Circle = zi, s.CircleMarker = Ie, s.Class = dt, s.Control = ot, s.DivIcon = Kn, s.DivOverlay = ut, s.DomEvent = mr, s.DomUtil = pr, s.Draggable = bt, s.Evented = Xt, s.FeatureGroup = pt, s.GeoJSON = mt, s.GridLayer = ce, s.Handler = ht, s.Icon = $t, s.ImageOverlay = $e, s.LatLng = O, s.LatLngBounds = K, s.Layer = rt, s.LayerGroup = Dt, s.LineUtil = Er, s.Map = M, s.Marker = Oe, s.Mixin = Pr, s.Path = wt, s.Point = P, s.PolyUtil = Mr, s.Polygon = Nt, s.Polyline = _t, s.Popup = Ne, s.PosAnimation = zn, s.Projection = Sr, s.Rectangle = io, s.Renderer = gt, s.SVG = fe, s.SVGOverlay = Yn, s.TileLayer = Wt, s.Tooltip = He, s.Transformation = ri, s.Util = Bo, s.VideoOverlay = Gn, s.bind = p, s.bounds = Y, s.canvas = to, s.circle = Dr, s.circleMarker = Rr, s.control = le, s.divIcon = jr, s.extend = u, s.featureGroup = Ir, s.geoJSON = jn, s.geoJson = Hr, s.gridLayer = Gr, s.icon = Zr, s.imageOverlay = Wr, s.latLng = I, s.latLngBounds = F, s.layerGroup = Or, s.map = gr, s.marker = Br, s.point = x, s.polygon = Nr, s.polyline = $r, s.popup = Vr, s.rectangle = Jr, s.setOptions = z, s.stamp = v, s.svg = eo, s.svgOverlay = Fr, s.tileLayer = Jn, s.tooltip = qr, s.transformation = te, s.version = h, s.videoOverlay = Ur;
    var Xr = window.L;
    s.noConflict = function() {
      return window.L = Xr, this;
    }, window.L = s;
  });
})(qi, qi.exports);
var Zs = qi.exports;
const Ut = /* @__PURE__ */ Is(Zs), ji = /* @__PURE__ */ new Map();
async function Bs(l, r) {
  const s = await import(
    /* @vite-ignore */
    r
  ), h = s == null ? void 0 : s.default, u = ji.size, _ = `vga-plugin-${Rs(l)}-${u}`;
  Ds(_, h) && ji.set(l, _);
}
function Rs(l = "") {
  return l.split(/-|\W|_/).filter(Boolean).join("-").toLowerCase();
}
function Ds(l, r) {
  if (!customElements.get(l) && (customElements.define(l, r), customElements.get(l)))
    return !0;
  throw new Error("Fail to register the plugin.");
}
const $s = `:host{--leaflet-control-layer-toggle-icon: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);--leaflet-control-margin: 10px;--leaflet-control-padding: 8px;--leaflet-control-border-radius: 5px;--leaflet-control-border: none;--leaflet-control-background: hsl(0, 0%, 100%, .9);--leaflet-control-inner-background: hsl(0, 0%, 100%);--leaflet-control-backdrop-filter: blur(20px);--leaflet-control-box-shadow: 0 2px 5px 0 hsl(0, 0%, 0%, .35);--leaflet-control-box-shadow-far: 0 2px 10px 0 hsl(0, 0%, 0%, .35);--leaflet-control-box-shadow-very-far: 0 2px 20px 0 hsl(0, 0%, 0%, .35);--sidebar-width: 30rem;display:block;position:absolute;top:0;left:0;bottom:0;right:0;font-family:Arial,Helvetica,sans-serif}#map{height:100%;width:100%;z-index:0}#map :focus{outline:initial}dialog{position:fixed;margin:auto;outline:none}dialog:focus{outline:none}dialog::backdrop{background:hsl(0,0%,0%,.35)}dialog.leaflet-control{position:fixed;margin:auto}#large-plugin-presenter{border:none;padding:0;margin:50px;height:auto;width:auto;opacity:0;transition:opacity .3s}#large-plugin-presenter[open]{opacity:1}#large-plugin-presenter .inner-container{display:flex;flex-direction:column;position:absolute;inset:0;margin:0;overflow:hidden;box-shadow:var(--leaflet-control-box-shadow-very-far)}#large-plugin-presenter .header{flex:0 0 auto;padding:0 var(--leaflet-control-padding);min-height:1.2rem;font-size:1.2rem;font-weight:700;user-select:none}#large-plugin-presenter .close-button{font-size:1.2rem;appearance:none;border:none;outline:none;background:none;float:right;cursor:pointer}#large-plugin-presenter .close-button:hover{transform:scale(1.2)}#large-plugin-presenter .close-button:active{transform:scale(.9)}#large-plugin-presenter .content{flex:1;background:var(--leaflet-control-inner-background);padding:var(--leaflet-control-padding)}#loading{padding:1rem}#loading .spinner{border:4px solid hsl(0,0%,95%);border-top:4px solid hsl(204,70%,53%);border-radius:50%;width:30px;height:30px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.leaflet-control{border-radius:var(--leaflet-control-border-radius);background:var(--leaflet-control-background);backdrop-filter:var(--leaflet-control-backdrop-filter);margin:var(--leaflet-control-margin)}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:var(--leaflet-control-border);box-shadow:var(--leaflet-control-box-shadow)}
`, Ns = `.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:rgba(255,255,255,.5)}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:rgba(255,255,255,.8);margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:rgba(255,255,255,.8);text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:white;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`;
var Hs = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, Pe = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? Ws(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && Hs(r, s, u), u;
};
let zt = class extends st {
  constructor() {
    super(...arguments), this.initialized = !1, this.mapElementRef = _e(), this.loadingDialogRef = _e(), this.directoryPermissionDialogRef = _e(), this.largePresenterDialogRef = _e(), this.hiddenPluginContainerRef = _e(), this.pluginDefinitionAndInstanceMap = /* @__PURE__ */ new Map(), this.dataIdentifierAndProviderMap = /* @__PURE__ */ new Map(), this.pluginLoadingPool = [], this.pluginSharedStates = {}, this.allowModifyingPageInfo = !1, this.notifyPluginLoadingHandler = () => {
      let l = this.pluginLoadingPool.findIndex(
        (r) => typeof r > "u"
      );
      return l < 0 && (l = this.pluginLoadingPool.length), this.pluginLoadingPool[l] = !0, this.updateLoadingStatus(), () => {
        delete this.pluginLoadingPool[l], this.updateLoadingStatus();
      };
    }, this.updatePluginSharedStatesHandler = (l) => {
      this.pluginSharedStates = l, this.applyToPlugins(
        (r) => r.sharedStates = this.pluginSharedStates
      );
    }, this.addMapLayerHandler = (l, r, s, h = !1) => {
      var u;
      if (this.layerControl)
        switch (s) {
          case "base-layer":
            this.layerControl.addBaseLayer(l, r);
            break;
          case "overlay":
            this.layerControl.addOverlay(l, r);
            break;
        }
      h && ((u = this.map) == null || u.addLayer(l));
    }, this.removeMapLayerHandler = (l) => {
      var r;
      l && ((r = this.layerControl) == null || r.removeLayer(l), l.remove());
    }, this.checkIfDataProviderRegisteredHandler = (l) => this.dataIdentifierAndProviderMap.has(l), this.queryDataHandler = (l, r) => {
      var u;
      let [s, h] = l.split(/:(.+)/);
      return (u = this.dataIdentifierAndProviderMap.get(s)) == null ? void 0 : u.queryDataCallback(s, h, r);
    };
  }
  get pluginLargePresenterContentInfo() {
    return this._pluginLargePresenterContentInfo;
  }
  set pluginLargePresenterContentInfo(l) {
    var s, h;
    const r = this._pluginLargePresenterContentInfo;
    this._pluginLargePresenterContentInfo = l, l ? (s = this.largePresenterDialogRef.value) == null || s.showModal() : (h = this.largePresenterDialogRef.value) == null || h.close(), this.requestUpdate("pluginLargePresenterContentInfo", r);
  }
  updated() {
    !this.initialized && this.config && (this.initialized = !0, this.initializeVis());
  }
  render() {
    return zo(
      this.config,
      () => {
        var l, r;
        return ct`
        <div id="map" ${me(this.mapElementRef)}></div>
        <div
          id="invisible-plugin-container"
          hidden
          ${me(this.hiddenPluginContainerRef)}
        ></div>
        <dialog
          id="large-plugin-presenter"
          class="leaflet-control"
          ${me(this.largePresenterDialogRef)}
        >
          <div class="inner-container">
            <div class="header">
              ${(l = this.pluginLargePresenterContentInfo) == null ? void 0 : l.header}
              <button
                class="close-button"
                @click=${this.dismissPluginLargePresenter}
              >
                🗙
              </button>
            </div>
            <div class="content">
              ${(r = this.pluginLargePresenterContentInfo) == null ? void 0 : r.pluginInstance}
            </div>
          </div>
        </dialog>
        <dialog
          id="loading"
          class="leaflet-control"
          ${me(this.loadingDialogRef)}
        >
          <div>
            <div class="spinner"></div>
          </div>
        </dialog>
        <dialog
          id="directory-permission-dialog"
          class="leaflet-control"
          ${me(this.directoryPermissionDialogRef)}
        >
          <div>
            The permission to access local files is needed. Please select a root
            directory by click the button below.
          </div>
          <hr />
          <vga-ui-button
            @click=${async () => {
          var s, h;
          try {
            if (this.rootDirectoryHandle = await window.showDirectoryPicker(), this.rootDirectoryHandle) {
              (s = this.directoryPermissionDialogRef.value) == null || s.close(), (h = this.askForFileAccessResolver) == null || h.call(this);
              return;
            }
            alert(
              "Fail to get the directory permission, please try again."
            );
          } catch {
            alert(
              "Fail to get the directory permission, please try again."
            );
          }
        }}
            >Select Root Directory</vga-ui-button
          >
        </dialog>
      `;
      },
      () => ct`<div
          style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"
        >
          Waiting for config to be set...
        </div>`
    );
  }
  async initializeVis() {
    var l, r, s, h, u;
    this.allowModifyingPageInfo && ((l = this.config) != null && l.pageTitle && (document.title = this.config.pageTitle), (r = this.config) != null && r.favicon && ((s = document.head.querySelector('link[rel~="icon"]')) == null || s.setAttribute("href", this.config.favicon))), !this.map && this.mapElementRef.value && (this.initializeMap(this.mapElementRef.value), this.initializeSidebar(), await this.importPlugins(), (h = this.config) != null && h.accessLocalFiles && ((u = this.directoryPermissionDialogRef.value) == null || u.showModal(), await new Promise(
      (_) => this.askForFileAccessResolver = _
    )), this.loadPlugins(), this.updateLoadingStatus(), this.applyToPlugins(
      (_) => {
        var p;
        return (p = _.hostFirstLoadedCallback) == null ? void 0 : p.call(_);
      }
    ));
  }
  initializeMap(l) {
    var r, s;
    this.map = Ut.map(l, {
      preferCanvas: (r = this.config) == null ? void 0 : r.preferCanvas
    }), this.updateView((s = this.config) == null ? void 0 : s.view), this.initializeLayerControl(), this.map.zoomControl.setPosition("topright");
  }
  initializeSidebar() {
    var r, s;
    (r = this.sidebar) == null || r.remove();
    const l = Ut.Control.extend({
      onAdd: () => (this.sidebarElement = Ut.DomUtil.create(
        "vga-core-sidebar"
      ), this.sidebarElement.classList.add("leaflet-control-layers"), this.stopEventPropagationToTheMapElement(this.sidebarElement), this.sidebarElement)
    });
    this.sidebar = new l({ position: "topleft" }), (s = this.map) == null || s.addControl(this.sidebar);
  }
  initializeMainContainerControl(l) {
    var h;
    const r = Ut.Control.extend({
      onAdd: () => (l.classList.add("leaflet-control-layers"), this.stopEventPropagationToTheMapElement(l), l)
    }), s = new r({
      position: "bottomright"
    });
    (h = this.map) == null || h.addControl(s);
  }
  initializeLayerControl() {
    var l, r;
    (l = this.layerControl) == null || l.remove(), this.layerControl = Ut.control.layers(), (r = this.map) == null || r.addControl(this.layerControl);
  }
  loadPlugins() {
    var l;
    try {
      for (const r of ((l = this.config) == null ? void 0 : l.plugins) ?? [])
        this.loadPlugin(r);
    } catch (r) {
      throw alert((r == null ? void 0 : r.message) ?? "Fail to load the plugins."), r;
    }
  }
  loadPlugin(l) {
    const r = this.createPluginInstance(l);
    r && (this.assignPluginInstanceIntoContainer(l, r), this.pluginDefinitionAndInstanceMap.set(l, r));
  }
  assignPluginInstanceIntoContainer(l, r) {
    var s, h;
    switch (l.container) {
      case "hidden": {
        (s = this.hiddenPluginContainerRef.value) == null || s.append(r);
        break;
      }
      case "main": {
        const u = document.createElement(
          "vga-core-main-item-container"
        );
        u.showContentInlargeViewCallback = (_) => this.presentPluginInLargeView(_), u.header = r.obtainHeaderCallback(), u.containerProps = l.containerProps, u.append(r), this.initializeMainContainerControl(u);
        break;
      }
      case "sidebar": {
        const u = document.createElement(
          "vga-core-sidebar-item-container"
        );
        u.showContentInlargeViewCallback = (_) => this.presentPluginInLargeView(_), u.header = r.obtainHeaderCallback(), u.containerProps = l.containerProps, u.append(r), (h = this.sidebarElement) == null || h.append(u);
        break;
      }
    }
  }
  createPluginInstance(l) {
    const r = ji.get(l.import);
    if (r) {
      const s = document.createElement(r), h = {
        notifyLoadingDelegate: this.notifyPluginLoadingHandler,
        checkIfPluginIsInTheLargePresenterDelegate: () => this.checkIfPluginInLargePresenter(s),
        sharedStates: this.pluginSharedStates,
        updateSharedStatesDelegate: this.updatePluginSharedStatesHandler,
        leaflet: Ut,
        mapInstance: this.map,
        addMapLayerDelegate: this.addMapLayerHandler,
        removeMapLayerDelegate: this.removeMapLayerHandler,
        checkIfDataProviderRegisteredDelegate: this.checkIfDataProviderRegisteredHandler,
        queryDataDelegate: this.queryDataHandler,
        rootDirectoryHandle: this.rootDirectoryHandle,
        configBaseUrl: this.configBaseUrl,
        ...l.props
      };
      return Object.assign(s, h), this.registerPluginAsDataProviderIfValid(s), s;
    }
  }
  async importPlugins() {
    var l;
    try {
      for (const [r, s] of Object.entries(((l = this.config) == null ? void 0 : l.imports) ?? {})) {
        const h = new URL(s, this.configBaseUrl ?? document.baseURI).href;
        await Bs(r, h);
      }
    } catch (r) {
      throw alert((r == null ? void 0 : r.message) ?? "Fail to import the plugins."), r;
    }
  }
  updateView(l) {
    var r;
    (r = this.map) == null || r.setView((l == null ? void 0 : l.center) || [0, 0], (l == null ? void 0 : l.zoom) || 0, l == null ? void 0 : l.options);
  }
  stopEventPropagationToTheMapElement(l) {
    l.addEventListener("mouseover", () => {
      var r, s, h;
      document.body.classList.contains("leaflet-dragging") || (r = this.map) == null || r.dragging.disable(), (s = this.map) == null || s.scrollWheelZoom.disable(), (h = this.map) == null || h.doubleClickZoom.disable();
    }), l.addEventListener("mouseup", () => {
      var r, s;
      (r = this.map) != null && r.dragging.enabled() && ((s = this.map) == null || s.dragging.disable());
    }), l.addEventListener("mouseout", () => {
      var r, s, h;
      (r = this.map) == null || r.dragging.enable(), (s = this.map) == null || s.scrollWheelZoom.enable(), (h = this.map) == null || h.doubleClickZoom.enable();
    });
  }
  updateLoadingStatus() {
    var l, r;
    this.pluginLoadingPool.some((s) => s) ? (l = this.loadingDialogRef.value) == null || l.showModal() : (r = this.loadingDialogRef.value) == null || r.close();
  }
  applyToPlugins(l) {
    for (let r of this.pluginDefinitionAndInstanceMap.values() ?? [])
      l(r);
  }
  registerPluginAsDataProviderIfValid(l) {
    if (l.obtainDataProviderIdentifiersCallback) {
      const r = l.obtainDataProviderIdentifiersCallback();
      r == null || r.forEach((s) => {
        if (this.dataIdentifierAndProviderMap.has(s)) {
          const h = `You cannot register multiple data providers for data identifier "${s}".`;
          throw alert(h), Error(h);
        }
        if (!s) {
          const h = "The data identifier for the data provider is not valid.";
          throw alert(h), Error(h);
        }
        this.dataIdentifierAndProviderMap.set(
          s,
          l
        );
      });
    }
  }
  presentPluginInLargeView(l) {
    var s;
    if (this.pluginLargePresenterContentInfo)
      return;
    const r = () => {
      this.pluginLargePresenterContentInfo = {
        header: l == null ? void 0 : l.obtainHeaderCallback(),
        pluginInstance: l,
        originalContainer: l == null ? void 0 : l.parentElement
      };
    };
    if (document.startViewTransition) {
      ((s = l == null ? void 0 : l.parentElement) == null ? void 0 : s.style).viewTransitionName = "plugin-container", document.startViewTransition(() => {
        var h, u;
        ((h = l == null ? void 0 : l.parentElement) == null ? void 0 : h.style).viewTransitionName = null, ((u = this.largePresenterDialogRef.value) == null ? void 0 : u.style).viewTransitionName = "plugin-container", setTimeout(
          () => {
            var _;
            return ((_ = this.largePresenterDialogRef.value) == null ? void 0 : _.style).viewTransitionName = null;
          }
        ), r();
      });
      return;
    }
    r();
  }
  dismissPluginLargePresenter() {
    var h;
    const { originalContainer: l, pluginInstance: r } = this.pluginLargePresenterContentInfo ?? {}, s = () => {
      this.pluginLargePresenterContentInfo = void 0, l == null || l.replaceChildren(r ?? "");
    };
    if (document.startViewTransition) {
      ((h = this.largePresenterDialogRef.value) == null ? void 0 : h.style).viewTransitionName = "plugin-container", document.startViewTransition(() => {
        var u;
        ((u = this.largePresenterDialogRef.value) == null ? void 0 : u.style).viewTransitionName = null, (l == null ? void 0 : l.style).viewTransitionName = "plugin-container", setTimeout(
          () => (l == null ? void 0 : l.style).viewTransitionName = null
        ), s();
      });
      return;
    }
    s();
  }
  checkIfPluginInLargePresenter(l) {
    var r;
    return ((r = this.pluginLargePresenterContentInfo) == null ? void 0 : r.pluginInstance) === l;
  }
};
zt.styles = [Lt([Ns]), Lt([$s])];
Pe([
  Ps()
], zt.prototype, "pluginLargePresenterContentInfo", 1);
Pe([
  $({ type: Object })
], zt.prototype, "config", 2);
Pe([
  $({
    type: Boolean,
    attribute: "allow-modifying-page-info",
    reflect: !0
  })
], zt.prototype, "allowModifyingPageInfo", 2);
Pe([
  $({
    type: String,
    attribute: "config-base-url",
    reflect: !0
  }),
  $()
], zt.prototype, "configBaseUrl", 2);
zt = Pe([
  Ot("vga-core")
], zt);
const Us = `:host{display:block;margin:var(--leaflet-control-margin);height:calc(100vh - var(--leaflet-control-margin) * 2)}[part=container]{overflow:hidden;height:100%;width:var(--sidebar-width);transition:width .3s;border-radius:inherit}[part=inner-container]{display:flex;flex-direction:column;height:100%;overflow:hidden;width:var(--sidebar-width)}[part=toggle]{display:block;position:absolute;appearance:none;top:50%;left:calc(100% + var(--leaflet-control-margin));height:2rem;width:1rem;border:var(--leaflet-control-border);border-radius:var(--leaflet-control-border-radius);box-shadow:var(--leaflet-control-box-shadow);cursor:pointer;background-color:#fff;transition-property:box-shadow,transform;transition-duration:.3s}[part=toggle]:hover{transform:scale(1.5);box-shadow:var(--leaflet-control-box-shadow-far)}[part=toggle]:active{box-shadow:inset var(--leaflet-control-box-shadow-far)}#toggle:not(:checked)~[part=container]{width:0}[part=toggle]:after{content:"<";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-weight:700}#toggle:not(:checked)~[part=toggle]:after{content:">"}
`;
var Fs = Object.defineProperty, Vs = Object.getOwnPropertyDescriptor, Oo = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? Vs(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && Fs(r, s, u), u;
};
let Ye = class extends st {
  constructor() {
    super(...arguments), this.active = !0;
  }
  render() {
    return ct`
      <input
        id="toggle"
        hidden
        type="checkbox"
        .checked=${this.active}
        title=${this.active ? "Hide Sidebar" : "Show Sidebar"}
        @change=${({ currentTarget: l }) => this.active = l.checked}
      />
      <label
        part="toggle"
        for="toggle"
        title=${this.active ? "Hide Sidebar" : "Show Sidebar"}
      ></label>
      <div part="container">
        <div part="inner-container">
          <div style="overflow: auto; flex: 0 0 auto; maxHeight: 50%;">
            <slot name="top"></slot>
          </div>
          <div style="overflow-y: auto; ">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
Ye.styles = [Lt([Us])];
Oo([
  $({ type: Boolean, reflect: !0 })
], Ye.prototype, "active", 2);
Ye = Oo([
  Ot("vga-core-sidebar")
], Ye);
const qs = `:host{display:block}:host([slot="top"]){margin:var(--leaflet-control-margin)}[part=header]{font-size:1.2rem;font-weight:700;user-select:none}[part=content]{background:var(--leaflet-control-inner-background);border:var(--leaflet-control-border);border-radius:var(--leaflet-control-border-radius);box-shadow:var(--leaflet-control-box-shadow);max-width:100%;overflow:hidden;padding:var(--leaflet-control-padding)}vga-ui-collapse::part(header){margin:0 var(--leaflet-control-margin)}vga-ui-collapse::part(content){margin:var(--leaflet-control-margin)}#show-in-large-view-button{font-size:1.2rem;appearance:none;border:none;outline:none;background:none;cursor:pointer}#show-in-large-view-button:hover{transform:scale(1.2)}#show-in-large-view-button:active{transform:scale(.9)}
`;
var js = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, Qe = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? Gs(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && js(r, s, u), u;
};
let Kt = class extends st {
  updated() {
    var l;
    this.setAttribute("slot", ((l = this.containerProps) == null ? void 0 : l.slot) ?? "");
  }
  render() {
    var l;
    return ((l = this.containerProps) == null ? void 0 : l.slot) === "top" ? this.renderContent() : ct`
          <vga-ui-collapse>${this.renderContent()}</vga-ui-collapse>
        `;
  }
  renderContent() {
    var l;
    return ct`
      <div
        part="header"
        slot=${((l = this.containerProps) == null ? void 0 : l.slot) === "top" ? "" : "header"}
      >
        <span>${this.header}</span>
        <button
          id="show-in-large-view-button"
          @click=${(r) => {
      var s;
      r.preventDefault(), (s = this.showContentInlargeViewCallback) == null || s.call(this, this.firstChild);
    }}
        >
          ⛶
        </button>
      </div>
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
};
Kt.styles = [Lt([qs])];
Qe([
  $({ reflect: !0 })
], Kt.prototype, "header", 2);
Qe([
  $()
], Kt.prototype, "containerProps", 2);
Qe([
  $()
], Kt.prototype, "showContentInlargeViewCallback", 2);
Kt = Qe([
  Ot("vga-core-sidebar-item-container")
], Kt);
const Ys = `:host{display:block;max-height:50vh;max-width:calc(100vw - var(--sidebar-width) - var(--leaflet-control-margin) * 3 - 1.5rem);overflow:hidden}[part=header]{font-size:1.2rem;font-weight:700;user-select:none}[part=content]{background:var(--leaflet-control-inner-background);border:var(--leaflet-control-border);box-shadow:var(--leaflet-control-box-shadow);max-width:100%;padding:var(--leaflet-control-padding)}vga-ui-collapse::part(header){margin:0 var(--leaflet-control-margin)}#show-in-large-view-button{font-size:1.2rem;appearance:none;border:none;outline:none;background:none;cursor:pointer}#show-in-large-view-button:hover{transform:scale(1.2)}#show-in-large-view-button:active{transform:scale(.9)}
`;
var Ks = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, Xe = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? Js(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && Ks(r, s, u), u;
};
let Jt = class extends st {
  render() {
    var l;
    return ct`
      <style>
        :host {
          width: ${((l = this.containerProps) == null ? void 0 : l.width) ?? "auto"};
        }
      </style>
      <vga-ui-collapse>
        <div part="header" slot="header">
          <span>${this.header}</span>
          <button
            id="show-in-large-view-button"
            @click=${(r) => {
      var s;
      r.preventDefault(), (s = this.showContentInlargeViewCallback) == null || s.call(
        this,
        this.firstChild
      );
    }}
          >
            ⛶
          </button>
        </div>
        <div part="content">
          <slot></slot>
        </div>
      </vga-ui-collapse>
    `;
  }
};
Jt.styles = [Lt([Ys])];
Xe([
  $({ reflect: !0 })
], Jt.prototype, "header", 2);
Xe([
  $()
], Jt.prototype, "containerProps", 2);
Xe([
  $()
], Jt.prototype, "showContentInlargeViewCallback", 2);
Jt = Xe([
  Ot("vga-core-main-item-container")
], Jt);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = (l) => l ?? H, Qs = `:host{--box-shadow-shape: 0 1px 2px 0;--box-shadow-shape-hover: 0 1px 5px 0;--primary-color: hsl(218, 100%, 61%);--shadow-color: hsl(0, 0%, 0%, .5);--main-color: hsl(0, 0%, 0%);--contract-color: hsl(0, 0%, 100%);-webkit-tap-highlight-color:transparent;display:inline-block;position:relative;cursor:pointer;user-select:none;padding:5px;border-radius:5px;overflow:hidden;transition:box-shadow .3s}:host([disabled]){pointer-events:none;filter:contrast(.6)}:host([variant="round"]){border-radius:50%}:host([variant="solid"]),:host([variant="round"]){color:var(--contract-color);background:var(--primary-color);box-shadow:var(--box-shadow-shape) var(--shadow-color)}:host([variant="solid"]:hover),:host([variant="round"]:hover){background:var(--primary-color);box-shadow:var(--box-shadow-shape-hover) var(--shadow-color)}:host([variant="solid"]:hover:active),:host([variant="round"]:hover:active){background:var(--primary-color);box-shadow:inset var(--box-shadow-shape) var(--shadow-color)}:host([variant="hollow"]){color:var(--primary-color);box-shadow:var(--box-shadow-shape) var(--primary-color)}:host([variant="hollow"]:hover){box-shadow:var(--box-shadow-shape-hover) var(--primary-color)}:host([variant="hollow"]:active){box-shadow:inset var(--box-shadow-shape) var(--primary-color)}:host([variant="clear"]){color:var(--primary-color)}:host([variant="clear"]:hover){box-shadow:inset 0 0 20px -10px var(--primary-color)}:host([variant="clear"]:active){box-shadow:inset 0 0 20px 0 var(--primary-color)}:host([variant="link"]){color:var(--main-color)}:host([variant="link"]:hover){color:var(--primary-color)}:host([variant="link"]:active){color:var(--primary-color);filter:brightness(.8)}#href-handler{display:block;position:absolute;left:0;top:0;right:0;bottom:0}#container{display:grid;position:relative;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;pointer-events:none}#container>slot{display:block;grid-column:2;grid-row:2}
`;
var Xs = Object.defineProperty, ta = Object.getOwnPropertyDescriptor, ti = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? ta(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && Xs(r, s, u), u;
};
let Qt = class extends st {
  constructor() {
    super(...arguments), this.variant = "solid", this.disabled = !1;
  }
  render() {
    return ct`
      ${zo(this.href, () => this.renderHrefHandler())}
      <div id="container">
        <slot></slot>
      </div>
    `;
  }
  renderHrefHandler() {
    return ct` <a id="href-handler" href=${ge(this.href)}></a> `;
  }
};
Qt.styles = [Lt([Qs])];
ti([
  $({ reflect: !0 })
], Qt.prototype, "variant", 2);
ti([
  $({ reflect: !0 })
], Qt.prototype, "href", 2);
ti([
  $({ reflect: !0, type: Boolean })
], Qt.prototype, "disabled", 2);
Qt = ti([
  Ot("vga-ui-button")
], Qt);
const ea = `:host{display:block}[part=content-container]{box-sizing:border-box;overflow:hidden;max-height:100vh;transition:max-height .3s}#collapse-toggle:checked~[part=content-container]{max-height:0}[part=header-container]{display:block;cursor:pointer;transition:transform .3s}[part=header-container]:hover{backdrop-filter:contrast(.7)}[part=header-container]:active{backdrop-filter:contrast(.5)}[part=header]:before{content:"";display:inline-block;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid currentColor;vertical-align:middle;margin:0 .7rem 0 .25rem;transform:translateY(-50%) rotate(90deg);transition:transform .3s}#collapse-toggle:checked~[part=header-container]>[part=header]:before{transform:translateY(-50%)}::slotted([slot="header"]){display:inline-block}
`;
var ia = Object.defineProperty, na = Object.getOwnPropertyDescriptor, Io = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? na(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && ia(r, s, u), u;
};
let Ke = class extends st {
  constructor() {
    super(...arguments), this.collapsed = !1;
  }
  render() {
    return ct`
      <input
        id="collapse-toggle"
        type="checkbox"
        hidden
        .checked=${this.collapsed}
        @change=${({ currentTarget: l }) => this.collapsed = l.checked}
      />
      <label part="header-container" for="collapse-toggle">
        <div part="header">
          <slot name="header"></slot>
        </div>
      </label>
      <div part="content-container">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
Ke.styles = [Lt([ea])];
Io([
  $({ type: Boolean, reflect: !0 })
], Ke.prototype, "collapsed", 2);
Ke = Io([
  Ot("vga-ui-collapse")
], Ke);
const oa = `:host{--box-shadow-shape: 0 1px 2px 0;--box-shadow-shape-hover: 0 1px 5px 0;--primary-color: hsl(218, 100%, 61%);--shadow-color: hsl(0, 0%, 0%, .5);--main-color: hsl(0, 0%, 0%);--contract-color: hsl(0, 0%, 100%);--background-color: hsl(0, 0%, 100%);-webkit-tap-highlight-color:transparent;display:inline-block;position:relative;cursor:default;padding:5px;border-radius:5px;background:var(--background-color);box-shadow:inset var(--box-shadow-shape) var(--shadow-color);transition:box-shadow .3s}:host(:hover){box-shadow:inset var(--box-shadow-shape-hover) var(--shadow-color)}:host(:focus-within){box-shadow:inset var(--box-shadow-shape-hover) var(--shadow-color),inset 0 -1px 5px 0 var(--primary-color)}:host([disabled]){pointer-events:none;filter:contrast(.6)}[part=native]{width:100%;outline:none;border:none;font-size:1em;background:none;padding:0 5px;caret-color:var(--primary-color)}
`;
var ra = Object.defineProperty, sa = Object.getOwnPropertyDescriptor, It = (l, r, s, h) => {
  for (var u = h > 1 ? void 0 : h ? sa(r, s) : r, _ = l.length - 1, p; _ >= 0; _--)
    (p = l[_]) && (u = (h ? p(r, s, u) : p(u)) || u);
  return h && u && ra(r, s, u), u;
};
let vt = class extends st {
  constructor() {
    super(...arguments), this.type = "text", this.disabled = !1, this.handleOnChangeEvent = (l) => {
      l.preventDefault(), l.stopPropagation(), this.value = l.currentTarget.value, this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: this.value, innerEvent: l },
          bubbles: !0,
          composed: !0,
          cancelable: !0
        })
      );
    }, this.handleOnInputEvent = (l) => {
      l.preventDefault(), l.stopPropagation(), this.dispatchEvent(
        new CustomEvent("input", {
          detail: { innerEvent: l },
          bubbles: !0,
          composed: !0,
          cancelable: !0
        })
      );
    };
  }
  render() {
    return ct`
      <div>
        <slot name="before"></slot>
        <input
          part="native"
          type=${this.type}
          min=${ge(this.min)}
          max=${ge(this.min)}
          value=${ge(this.value)}
          ?disabled=${this.disabled}
          placeholder=${ge(this.placeholder)}
          @change=${this.handleOnChangeEvent}
          @input=${this.handleOnInputEvent}
        />
        <slot name="after"></slot>
      </div>
    `;
  }
};
vt.styles = [Lt([oa])];
It([
  $({ reflect: !0 })
], vt.prototype, "type", 2);
It([
  $({ reflect: !0 })
], vt.prototype, "value", 2);
It([
  $({ reflect: !0, type: Number })
], vt.prototype, "min", 2);
It([
  $({ reflect: !0, type: Number })
], vt.prototype, "max", 2);
It([
  $({ reflect: !0 })
], vt.prototype, "placeholder", 2);
It([
  $({ reflect: !0, type: Boolean })
], vt.prototype, "disabled", 2);
vt = It([
  Ot("vga-ui-input")
], vt);
export {
  zt as VGACore,
  Jt as VGACoreMainItemContainer,
  Ye as VGACoreSidebar,
  Kt as VGACoreSidebarItemContainer,
  Qt as VGAUIButton,
  Ke as VGAUICollapse,
  vt as VGAUIInput
};
