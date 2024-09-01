import { g as useNuxtApp, i as asyncDataDefaults, v as vueExports, k as createError, l as fetchDefaults, s as ssrRenderAttrs_1, m as ssrRenderList_1, o as ssrRenderAttr_1, B as BaseStyle, q as findSingle, t as toFlatCase, x as isFunction, y as isNotEmpty, z as config_default, A as service_default, C as getKeyValue, D as isString, E as isArray, F as resolve, G as isEmpty, H as isObject, I as toCapitalCase, P as PrimeVueService, J as createElement, K as removeClass, L as getHeight, M as getWidth, N as getOuterWidth, O as getOuterHeight, Q as getOffset, R as addClass, S as getAttribute, f as ssrRenderComponent_1, T as ssrRenderStyle_1, e as ssrInterpolate_1 } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "node:http";
import "node:https";
import "node:zlib";
import "node:stream";
import "node:buffer";
import "node:util";
import "node:url";
import "node:net";
import "node:fs";
import "node:path";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "devalue";
var lastIds = {};
function uuid(prefix = "pui_id_") {
  if (!lastIds.hasOwnProperty(prefix)) {
    lastIds[prefix] = 0;
  }
  lastIds[prefix]++;
  return `${prefix}${lastIds[prefix]}`;
}
const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}
class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}
function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler3 = !import.meta.prerender || !((_a = nuxtApp.ssrContext) == null ? void 0 : _a._sharedPrerenderCache) ? _handler : () => {
    const value = nuxtApp.ssrContext._sharedPrerenderCache.get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp.runWithContext(_handler));
    nuxtApp.ssrContext._sharedPrerenderCache.set(key, promise);
    return promise;
  };
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? vueExports.ref : vueExports.shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(options.getCachedData(key, nuxtApp) ?? options.default()),
      pending: vueExports.ref(!hasCachedData()),
      error: vueExports.toRef(nuxtApp.payload._errors, key),
      status: vueExports.ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve2, reject) => {
        try {
          resolve2(handler3(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = vueExports.unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (vueExports.getCurrentInstance()) {
      vueExports.onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = nuxtApp._asyncData[key]._default();
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = vueExports.computed(() => vueExports.toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = vueExports.reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = vueExports.toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!vueExports.toValue(opts.baseURL) || vueExports.toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = vueExports.toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    vueExports.toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = vueExports.toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[vueExports.toValue(key)] = vueExports.toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const _sfc_main$3 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ImageGallery",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: images, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(() => useFetch("/api/images", "$Nxggt4fPsR")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs_1(_attrs)}><h3>Images</h3><form><label>Upload an image: <input type="file" name="image" accept="image/jpg,image/png"></label><button type="submit"> Upload </button></form><p><!--[-->`);
      ssrRenderList_1(vueExports.unref(images), (image) => {
        _push(`<img width="200"${ssrRenderAttr_1("src", `/images/${image.pathname}`)}${ssrRenderAttr_1("alt", image.pathname)}>`);
      });
      _push(`<!--]--></p>`);
      if ((_a = vueExports.unref(images)) == null ? void 0 : _a.length) {
        _push(`<p><i>Tip: delete an image by double-clicking on it.</i></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageGallery.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Base = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames: function getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded: function isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName: function setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName: function deleteLoadedStyleName(name) {
    this._loadedStyleNames["delete"](name);
  },
  clearLoadedStyleNames: function clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  }
};
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  return uuid(prefix);
}
var BaseComponentStyle = BaseStyle.extend({
  name: "common"
});
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _toArray(r) {
  return _arrayWithHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$2(r) || _nonIterableRest$1();
}
function _iterableToArray$1(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
  }
}
function _arrayLikeToArray$2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(e, r, t) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$6 = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      "default": void 0
    },
    ptOptions: {
      type: Object,
      "default": void 0
    },
    unstyled: {
      type: Boolean,
      "default": void 0
    },
    dt: {
      type: Object,
      "default": void 0
    }
  },
  inject: {
    $parentInstance: {
      "default": void 0
    }
  },
  watch: {
    isUnstyled: {
      immediate: true,
      handler: function handler(newValue) {
        if (!newValue) {
          this._loadCoreStyles();
          this._themeChangeListener(this._loadCoreStyles);
        }
      }
    },
    dt: {
      immediate: true,
      handler: function handler2(newValue) {
        var _this = this;
        if (newValue) {
          this._loadScopedThemeStyles(newValue);
          this._themeChangeListener(function() {
            return _this._loadScopedThemeStyles(newValue);
          });
        } else {
          this._unloadScopedThemeStyles();
        }
      }
    }
  },
  scopedStyleEl: void 0,
  rootEl: void 0,
  beforeCreate: function beforeCreate() {
    var _this$pt, _this$pt2, _this$pt3, _ref, _ref$onBeforeCreate, _this$$primevueConfig, _this$$primevue, _this$$primevue2, _this$$primevue3, _ref2, _ref2$onBeforeCreate;
    var _usept = (_this$pt = this.pt) === null || _this$pt === void 0 ? void 0 : _this$pt["_usept"];
    var originalValue = _usept ? (_this$pt2 = this.pt) === null || _this$pt2 === void 0 || (_this$pt2 = _this$pt2.originalValue) === null || _this$pt2 === void 0 ? void 0 : _this$pt2[this.$.type.name] : void 0;
    var value = _usept ? (_this$pt3 = this.pt) === null || _this$pt3 === void 0 || (_this$pt3 = _this$pt3.value) === null || _this$pt3 === void 0 ? void 0 : _this$pt3[this.$.type.name] : this.pt;
    (_ref = value || originalValue) === null || _ref === void 0 || (_ref = _ref.hooks) === null || _ref === void 0 || (_ref$onBeforeCreate = _ref["onBeforeCreate"]) === null || _ref$onBeforeCreate === void 0 || _ref$onBeforeCreate.call(_ref);
    var _useptInConfig = (_this$$primevueConfig = this.$primevueConfig) === null || _this$$primevueConfig === void 0 || (_this$$primevueConfig = _this$$primevueConfig.pt) === null || _this$$primevueConfig === void 0 ? void 0 : _this$$primevueConfig["_usept"];
    var originalValueInConfig = _useptInConfig ? (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.pt) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.originalValue : void 0;
    var valueInConfig = _useptInConfig ? (_this$$primevue2 = this.$primevue) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.config) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.pt) === null || _this$$primevue2 === void 0 ? void 0 : _this$$primevue2.value : (_this$$primevue3 = this.$primevue) === null || _this$$primevue3 === void 0 || (_this$$primevue3 = _this$$primevue3.config) === null || _this$$primevue3 === void 0 ? void 0 : _this$$primevue3.pt;
    (_ref2 = valueInConfig || originalValueInConfig) === null || _ref2 === void 0 || (_ref2 = _ref2[this.$.type.name]) === null || _ref2 === void 0 || (_ref2 = _ref2.hooks) === null || _ref2 === void 0 || (_ref2$onBeforeCreate = _ref2["onBeforeCreate"]) === null || _ref2$onBeforeCreate === void 0 || _ref2$onBeforeCreate.call(_ref2);
  },
  created: function created() {
    this._hook("onCreated");
  },
  beforeMount: function beforeMount() {
    this._loadStyles();
    this._hook("onBeforeMount");
  },
  mounted: function mounted() {
    this.rootEl = findSingle(this.$el, '[data-pc-name="'.concat(toFlatCase(this.$.type.name), '"]'));
    if (this.rootEl) {
      this.rootEl.setAttribute(this.$attrSelector, "");
      this.rootEl.$pc = _objectSpread$2({
        name: this.$.type.name
      }, this.$params);
    }
    this._hook("onMounted");
  },
  beforeUpdate: function beforeUpdate() {
    this._hook("onBeforeUpdate");
  },
  updated: function updated() {
    this._hook("onUpdated");
  },
  beforeUnmount: function beforeUnmount() {
    this._hook("onBeforeUnmount");
  },
  unmounted: function unmounted() {
    this._unloadScopedThemeStyles();
    this._hook("onUnmounted");
  },
  methods: {
    _hook: function _hook(hookName) {
      if (!this.$options.hostName) {
        var selfHook = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(hookName));
        var defaultHook = this._useDefaultPT(this._getOptionValue, "hooks.".concat(hookName));
        selfHook === null || selfHook === void 0 || selfHook();
        defaultHook === null || defaultHook === void 0 || defaultHook();
      }
    },
    _mergeProps: function _mergeProps(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return isFunction(fn) ? fn.apply(void 0, args) : vueExports.mergeProps.apply(void 0, args);
    },
    _loadStyles: function _loadStyles() {
      var _this2 = this;
      var _load = function _load2() {
        if (!Base.isStyleNameLoaded("base")) {
          BaseStyle.loadCSS(_this2.$styleOptions);
          _this2._loadGlobalStyles();
          Base.setLoadedStyleName("base");
        }
        _this2._loadThemeStyles();
      };
      _load();
      this._themeChangeListener(_load);
    },
    _loadCoreStyles: function _loadCoreStyles() {
      var _this$$style, _this$$style2;
      if (!Base.isStyleNameLoaded((_this$$style = this.$style) === null || _this$$style === void 0 ? void 0 : _this$$style.name) && (_this$$style2 = this.$style) !== null && _this$$style2 !== void 0 && _this$$style2.name) {
        BaseComponentStyle.loadCSS(this.$styleOptions);
        this.$options.style && this.$style.loadCSS(this.$styleOptions);
        Base.setLoadedStyleName(this.$style.name);
      }
    },
    _loadGlobalStyles: function _loadGlobalStyles() {
      var globalCSS = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      isNotEmpty(globalCSS) && BaseStyle.load(globalCSS, _objectSpread$2({
        name: "global"
      }, this.$styleOptions));
    },
    _loadThemeStyles: function _loadThemeStyles() {
      var _this$$style4, _this$$style5;
      if (this.isUnstyled) return;
      if (!config_default.isStyleNameLoaded("common")) {
        var _this$$style3, _this$$style3$getComm;
        var _ref3 = ((_this$$style3 = this.$style) === null || _this$$style3 === void 0 || (_this$$style3$getComm = _this$$style3.getCommonTheme) === null || _this$$style3$getComm === void 0 ? void 0 : _this$$style3$getComm.call(_this$$style3)) || {}, primitive = _ref3.primitive, semantic = _ref3.semantic;
        BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread$2({
          name: "primitive-variables"
        }, this.$styleOptions));
        BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread$2({
          name: "semantic-variables"
        }, this.$styleOptions));
        BaseStyle.loadTheme(_objectSpread$2({
          name: "global-style"
        }, this.$styleOptions));
        config_default.setLoadedStyleName("common");
      }
      if (!config_default.isStyleNameLoaded((_this$$style4 = this.$style) === null || _this$$style4 === void 0 ? void 0 : _this$$style4.name) && (_this$$style5 = this.$style) !== null && _this$$style5 !== void 0 && _this$$style5.name) {
        var _this$$style6, _this$$style6$getComp, _this$$style7, _this$$style8;
        var _ref4 = ((_this$$style6 = this.$style) === null || _this$$style6 === void 0 || (_this$$style6$getComp = _this$$style6.getComponentTheme) === null || _this$$style6$getComp === void 0 ? void 0 : _this$$style6$getComp.call(_this$$style6)) || {}, css2 = _ref4.css;
        (_this$$style7 = this.$style) === null || _this$$style7 === void 0 || _this$$style7.load(css2, _objectSpread$2({
          name: "".concat(this.$style.name, "-variables")
        }, this.$styleOptions));
        (_this$$style8 = this.$style) === null || _this$$style8 === void 0 || _this$$style8.loadTheme(_objectSpread$2({
          name: "".concat(this.$style.name, "-style")
        }, this.$styleOptions));
        config_default.setLoadedStyleName(this.$style.name);
      }
      if (!config_default.isStyleNameLoaded("layer-order")) {
        var _this$$style9, _this$$style9$getLaye;
        var layerOrder = (_this$$style9 = this.$style) === null || _this$$style9 === void 0 || (_this$$style9$getLaye = _this$$style9.getLayerOrderThemeCSS) === null || _this$$style9$getLaye === void 0 ? void 0 : _this$$style9$getLaye.call(_this$$style9);
        BaseStyle.load(layerOrder, _objectSpread$2({
          name: "layer-order",
          first: true
        }, this.$styleOptions));
        config_default.setLoadedStyleName("layer-order");
      }
    },
    _loadScopedThemeStyles: function _loadScopedThemeStyles(preset) {
      var _this$$style10, _this$$style10$getPre, _this$$style11;
      var _ref5 = ((_this$$style10 = this.$style) === null || _this$$style10 === void 0 || (_this$$style10$getPre = _this$$style10.getPresetTheme) === null || _this$$style10$getPre === void 0 ? void 0 : _this$$style10$getPre.call(_this$$style10, preset, "[".concat(this.$attrSelector, "]"))) || {}, css2 = _ref5.css;
      var scopedStyle = (_this$$style11 = this.$style) === null || _this$$style11 === void 0 ? void 0 : _this$$style11.load(css2, _objectSpread$2({
        name: "".concat(this.$attrSelector, "-").concat(this.$style.name)
      }, this.$styleOptions));
      this.scopedStyleEl = scopedStyle.el;
    },
    _unloadScopedThemeStyles: function _unloadScopedThemeStyles() {
      var _this$scopedStyleEl;
      (_this$scopedStyleEl = this.scopedStyleEl) === null || _this$scopedStyleEl === void 0 || (_this$scopedStyleEl = _this$scopedStyleEl.value) === null || _this$scopedStyleEl === void 0 || _this$scopedStyleEl.remove();
    },
    _themeChangeListener: function _themeChangeListener() {
      var callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      Base.clearLoadedStyleNames();
      service_default.on("theme:change", callback);
    },
    _getHostInstance: function _getHostInstance(instance) {
      return instance ? this.$options.hostName ? instance.$.type.name === this.$options.hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : void 0;
    },
    _getPropValue: function _getPropValue(name) {
      var _this$_getHostInstanc;
      return this[name] || ((_this$_getHostInstanc = this._getHostInstance(this)) === null || _this$_getHostInstanc === void 0 ? void 0 : _this$_getHostInstanc[name]);
    },
    _getOptionValue: function _getOptionValue(options) {
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return getKeyValue(options, key, params);
    },
    _getPTValue: function _getPTValue() {
      var _this$$primevueConfig2;
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var searchInDefaultPT = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var searchOut = /./g.test(key) && !!params[key.split(".")[0]];
      var _ref6 = this._getPropValue("ptOptions") || ((_this$$primevueConfig2 = this.$primevueConfig) === null || _this$$primevueConfig2 === void 0 ? void 0 : _this$$primevueConfig2.ptOptions) || {}, _ref6$mergeSections = _ref6.mergeSections, mergeSections = _ref6$mergeSections === void 0 ? true : _ref6$mergeSections, _ref6$mergeProps = _ref6.mergeProps, useMergeProps = _ref6$mergeProps === void 0 ? false : _ref6$mergeProps;
      var global = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : void 0;
      var self = searchOut ? void 0 : this._getPTSelf(obj, this._getPTClassValue, key, _objectSpread$2(_objectSpread$2({}, params), {}, {
        global: global || {}
      }));
      var datasets = this._getPTDatasets(key);
      return mergeSections || !mergeSections && self ? useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : _objectSpread$2(_objectSpread$2(_objectSpread$2({}, global), self), datasets) : _objectSpread$2(_objectSpread$2({}, self), datasets);
    },
    _getPTSelf: function _getPTSelf() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return vueExports.mergeProps(
        this._usePT.apply(this, [this._getPT(obj, this.$name)].concat(args)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(args))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function _getPTDatasets() {
      var _this$pt4, _this$pt5;
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var datasetPrefix = "data-pc-";
      var isExtended = key === "root" && isNotEmpty((_this$pt4 = this.pt) === null || _this$pt4 === void 0 ? void 0 : _this$pt4["data-pc-section"]);
      return key !== "transition" && _objectSpread$2(_objectSpread$2({}, key === "root" && _objectSpread$2(_defineProperty$4({}, "".concat(datasetPrefix, "name"), toFlatCase(isExtended ? (_this$pt5 = this.pt) === null || _this$pt5 === void 0 ? void 0 : _this$pt5["data-pc-section"] : this.$.type.name)), isExtended && _defineProperty$4({}, "".concat(datasetPrefix, "extend"), toFlatCase(this.$.type.name)))), {}, _defineProperty$4({}, "".concat(datasetPrefix, "section"), toFlatCase(key)));
    },
    _getPTClassValue: function _getPTClassValue() {
      var value = this._getOptionValue.apply(this, arguments);
      return isString(value) || isArray(value) ? {
        "class": value
      } : value;
    },
    _getPT: function _getPT(pt) {
      var _this3 = this;
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : void 0;
      var getValue = function getValue2(value) {
        var _ref8;
        var checkSameKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var computedValue = callback ? callback(value) : value;
        var _key = toFlatCase(key);
        var _cKey = toFlatCase(_this3.$name);
        return (_ref8 = checkSameKey ? _key !== _cKey ? computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key] : void 0 : computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _ref8 !== void 0 ? _ref8 : computedValue;
      };
      return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
        _usept: pt["_usept"],
        originalValue: getValue(pt.originalValue),
        value: getValue(pt.value)
      } : getValue(pt, true);
    },
    _usePT: function _usePT(pt, callback, key, params) {
      var fn = function fn2(value2) {
        return callback(value2, key, params);
      };
      if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
        var _this$$primevueConfig3;
        var _ref9 = pt["_usept"] || ((_this$$primevueConfig3 = this.$primevueConfig) === null || _this$$primevueConfig3 === void 0 ? void 0 : _this$$primevueConfig3.ptOptions) || {}, _ref9$mergeSections = _ref9.mergeSections, mergeSections = _ref9$mergeSections === void 0 ? true : _ref9$mergeSections, _ref9$mergeProps = _ref9.mergeProps, useMergeProps = _ref9$mergeProps === void 0 ? false : _ref9$mergeProps;
        var originalValue = fn(pt.originalValue);
        var value = fn(pt.value);
        if (originalValue === void 0 && value === void 0) return void 0;
        else if (isString(value)) return value;
        else if (isString(originalValue)) return originalValue;
        return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : _objectSpread$2(_objectSpread$2({}, originalValue), value) : value;
      }
      return fn(pt);
    },
    _useGlobalPT: function _useGlobalPT(callback, key, params) {
      return this._usePT(this.globalPT, callback, key, params);
    },
    _useDefaultPT: function _useDefaultPT(callback, key, params) {
      return this._usePT(this.defaultPT, callback, key, params);
    },
    ptm: function ptm() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
    },
    ptmi: function ptmi() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return vueExports.mergeProps(this.$_attrsWithoutPT, this.ptm(key, params));
    },
    ptmo: function ptmo() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(obj, key, _objectSpread$2({
        instance: this
      }, params), false);
    },
    cx: function cx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return !this.isUnstyled ? this._getOptionValue(this.$style.classes, key, _objectSpread$2(_objectSpread$2({}, this.$params), params)) : void 0;
    },
    sx: function sx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (when) {
        var self = this._getOptionValue(this.$style.inlineStyles, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
        var base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
        return [base, self];
      }
      return void 0;
    }
  },
  computed: {
    globalPT: function globalPT() {
      var _this$$primevueConfig4, _this4 = this;
      return this._getPT((_this$$primevueConfig4 = this.$primevueConfig) === null || _this$$primevueConfig4 === void 0 ? void 0 : _this$$primevueConfig4.pt, void 0, function(value) {
        return resolve(value, {
          instance: _this4
        });
      });
    },
    defaultPT: function defaultPT() {
      var _this$$primevueConfig5, _this5 = this;
      return this._getPT((_this$$primevueConfig5 = this.$primevueConfig) === null || _this$$primevueConfig5 === void 0 ? void 0 : _this$$primevueConfig5.pt, void 0, function(value) {
        return _this5._getOptionValue(value, _this5.$name, _objectSpread$2({}, _this5.$params)) || resolve(value, _objectSpread$2({}, _this5.$params));
      });
    },
    isUnstyled: function isUnstyled() {
      var _this$$primevueConfig6;
      return this.unstyled !== void 0 ? this.unstyled : (_this$$primevueConfig6 = this.$primevueConfig) === null || _this$$primevueConfig6 === void 0 ? void 0 : _this$$primevueConfig6.unstyled;
    },
    $theme: function $theme() {
      var _this$$primevueConfig7;
      return (_this$$primevueConfig7 = this.$primevueConfig) === null || _this$$primevueConfig7 === void 0 ? void 0 : _this$$primevueConfig7.theme;
    },
    $style: function $style() {
      return _objectSpread$2(_objectSpread$2({
        classes: void 0,
        inlineStyles: void 0,
        load: function load() {
        },
        loadCSS: function loadCSS() {
        },
        loadTheme: function loadTheme() {
        }
      }, (this._getHostInstance(this) || {}).$style), this.$options.style);
    },
    $styleOptions: function $styleOptions() {
      var _this$$primevueConfig8;
      return {
        nonce: (_this$$primevueConfig8 = this.$primevueConfig) === null || _this$$primevueConfig8 === void 0 || (_this$$primevueConfig8 = _this$$primevueConfig8.csp) === null || _this$$primevueConfig8 === void 0 ? void 0 : _this$$primevueConfig8.nonce
      };
    },
    $primevueConfig: function $primevueConfig() {
      var _this$$primevue4;
      return (_this$$primevue4 = this.$primevue) === null || _this$$primevue4 === void 0 ? void 0 : _this$$primevue4.config;
    },
    $name: function $name() {
      return this.$options.hostName || this.$.type.name;
    },
    $params: function $params() {
      var parentInstance = this._getHostInstance(this) || this.$parent;
      return {
        instance: this,
        props: this.$props,
        state: this.$data,
        attrs: this.$attrs,
        parent: {
          instance: parentInstance,
          props: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$props,
          state: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$data,
          attrs: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$attrs
        }
      };
    },
    $_attrsPT: function $_attrsPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref10) {
        var _ref11 = _slicedToArray$1(_ref10, 1), key = _ref11[0];
        return key === null || key === void 0 ? void 0 : key.startsWith("pt:");
      }).reduce(function(result, _ref12) {
        var _ref13 = _slicedToArray$1(_ref12, 2), key = _ref13[0], value = _ref13[1];
        var _key$split = key.split(":"), _key$split2 = _toArray(_key$split), rest = _key$split2.slice(1);
        rest === null || rest === void 0 || rest.reduce(function(currentObj, nestedKey, index2, array) {
          !currentObj[nestedKey] && (currentObj[nestedKey] = index2 === array.length - 1 ? value : {});
          return currentObj[nestedKey];
        }, result);
        return result;
      }, {});
    },
    $_attrsWithoutPT: function $_attrsWithoutPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref14) {
        var _ref15 = _slicedToArray$1(_ref14, 1), key = _ref15[0];
        return !(key !== null && key !== void 0 && key.startsWith("pt:"));
      }).reduce(function(acc, _ref16) {
        var _ref17 = _slicedToArray$1(_ref16, 2), key = _ref17[0], value = _ref17[1];
        acc[key] = value;
        return acc;
      }, {});
    },
    $attrSelector: function $attrSelector() {
      return UniqueComponentId("pc");
    }
  }
};
var css = "\n.p-icon {\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var BaseIconStyle = BaseStyle.extend({
  name: "baseicon",
  css
});
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$5 = {
  name: "BaseIcon",
  "extends": script$6,
  props: {
    label: {
      type: String,
      "default": void 0
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  style: BaseIconStyle,
  provide: function provide() {
    return {
      $pcIcon: this,
      $parentInstance: this
    };
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = isEmpty(this.label);
      return _objectSpread$1(_objectSpread$1({}, !this.isUnstyled && {
        "class": ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: !isLabelEmpty ? "img" : void 0,
        "aria-label": !isLabelEmpty ? this.label : void 0,
        "aria-hidden": isLabelEmpty
      });
    }
  }
};
var script$4 = {
  name: "SpinnerIcon",
  "extends": script$5
};
var _hoisted_1 = /* @__PURE__ */ vueExports.createElementVNode("path", {
  d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2 = [_hoisted_1];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vueExports.openBlock(), vueExports.createElementBlock("svg", vueExports.mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2, 16);
}
script$4.render = render$3;
var theme$3 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-badge {\n    display: inline-flex;\n    border-radius: ".concat(dt("badge.border.radius"), ";\n    align-items: center;\n    justify-content: center;\n    padding: ").concat(dt("badge.padding"), ";\n    background: ").concat(dt("badge.primary.background"), ";\n    color: ").concat(dt("badge.primary.color"), ";\n    font-size: ").concat(dt("badge.font.size"), ";\n    font-weight: ").concat(dt("badge.font.weight"), ";\n    min-width: ").concat(dt("badge.min.width"), ";\n    height: ").concat(dt("badge.height"), ";\n}\n\n.p-badge-dot {\n    width: ").concat(dt("badge.dot.size"), ";\n    min-width: ").concat(dt("badge.dot.size"), ";\n    height: ").concat(dt("badge.dot.size"), ";\n    border-radius: 50%;\n    padding: 0;\n}\n\n.p-badge-circle {\n    padding: 0;\n    border-radius: 50%;\n}\n\n.p-badge-secondary {\n    background: ").concat(dt("badge.secondary.background"), ";\n    color: ").concat(dt("badge.secondary.color"), ";\n}\n\n.p-badge-success {\n    background: ").concat(dt("badge.success.background"), ";\n    color: ").concat(dt("badge.success.color"), ";\n}\n\n.p-badge-info {\n    background: ").concat(dt("badge.info.background"), ";\n    color: ").concat(dt("badge.info.color"), ";\n}\n\n.p-badge-warn {\n    background: ").concat(dt("badge.warn.background"), ";\n    color: ").concat(dt("badge.warn.color"), ";\n}\n\n.p-badge-danger {\n    background: ").concat(dt("badge.danger.background"), ";\n    color: ").concat(dt("badge.danger.color"), ";\n}\n\n.p-badge-contrast {\n    background: ").concat(dt("badge.contrast.background"), ";\n    color: ").concat(dt("badge.contrast.color"), ";\n}\n\n.p-badge-sm {\n    font-size: ").concat(dt("badge.sm.font.size"), ";\n    min-width: ").concat(dt("badge.sm.min.width"), ";\n    height: ").concat(dt("badge.sm.height"), ";\n}\n\n.p-badge-lg {\n    font-size: ").concat(dt("badge.lg.font.size"), ";\n    min-width: ").concat(dt("badge.lg.min.width"), ";\n    height: ").concat(dt("badge.lg.height"), ";\n}\n\n.p-badge-xl {\n    font-size: ").concat(dt("badge.xl.font.size"), ";\n    min-width: ").concat(dt("badge.xl.min.width"), ";\n    height: ").concat(dt("badge.xl.height"), ";\n}\n");
};
var classes$3 = {
  root: function root(_ref2) {
    var props = _ref2.props, instance = _ref2.instance;
    return ["p-badge p-component", {
      "p-badge-circle": isNotEmpty(props.value) && String(props.value).length === 1,
      "p-badge-dot": isEmpty(props.value) && !instance.$slots["default"],
      "p-badge-sm": props.size === "small",
      "p-badge-lg": props.size === "large",
      "p-badge-xl": props.size === "xlarge",
      "p-badge-info": props.severity === "info",
      "p-badge-success": props.severity === "success",
      "p-badge-warn": props.severity === "warn",
      "p-badge-danger": props.severity === "danger",
      "p-badge-secondary": props.severity === "secondary",
      "p-badge-contrast": props.severity === "contrast"
    }];
  }
};
var BadgeStyle = BaseStyle.extend({
  name: "badge",
  theme: theme$3,
  classes: classes$3
});
var script$1$2 = {
  name: "BaseBadge",
  "extends": script$6,
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    }
  },
  style: BadgeStyle,
  provide: function provide2() {
    return {
      $pcBadge: this,
      $parentInstance: this
    };
  }
};
var script$3 = {
  name: "Badge",
  "extends": script$1$2,
  inheritAttrs: false
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vueExports.openBlock(), vueExports.createElementBlock("span", vueExports.mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [vueExports.renderSlot(_ctx.$slots, "default", {}, function() {
    return [vueExports.createTextVNode(vueExports.toDisplayString(_ctx.value), 1)];
  })], 16);
}
script$3.render = render$2;
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}
function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], resolve(isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: getKeyValue,
  _getPTValue: function _getPTValue2() {
    var _instance$binding, _instance$$primevueCo;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return isString(value) || isArray(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$primevueCo = instance.$primevueConfig) === null || _instance$$primevueCo === void 0 ? void 0 : _instance$$primevueCo.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread(_objectSpread({}, params), {}, {
      global: global || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global, self, datasets) : _objectSpread(_objectSpread(_objectSpread({}, global), self), datasets) : _objectSpread(_objectSpread({}, self), datasets);
  },
  _getPTDatasets: function _getPTDatasets2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread(_objectSpread({}, key === "root" && _defineProperty$2({}, "".concat(datasetPrefix, "name"), toFlatCase(instance.$name))), {}, _defineProperty$2({}, "".concat(datasetPrefix, "section"), toFlatCase(key)));
  },
  _getPT: function _getPT2(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = toFlatCase(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
      var _instance$$primevueCo2;
      var _ref4 = pt["_usept"] || ((_instance$$primevueCo2 = instance.$primevueConfig) === null || _instance$$primevueCo2 === void 0 ? void 0 : _instance$$primevueCo2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0) return void 0;
      else if (isString(value)) return value;
      else if (isString(originalValue)) return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread(_objectSpread({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT2, callback, key, params);
  },
  _loadStyles: function _loadStyles2(el, binding, vnode) {
    var _config$csp;
    var config = BaseDirective._getConfig(binding, vnode);
    var useStyleOptions = {
      nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
    };
    BaseDirective._loadCoreStyles(el.$instance, useStyleOptions);
    BaseDirective._loadThemeStyles(el.$instance, useStyleOptions);
    BaseDirective._loadScopedThemeStyles(el.$instance, useStyleOptions);
    BaseDirective._themeChangeListener(function() {
      return BaseDirective._loadThemeStyles(el.$instance, useStyleOptions);
    });
  },
  _loadCoreStyles: function _loadCoreStyles2() {
    var _instance$$style, _instance$$style2;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    if (!Base.isStyleNameLoaded((_instance$$style = instance.$style) === null || _instance$$style === void 0 ? void 0 : _instance$$style.name) && (_instance$$style2 = instance.$style) !== null && _instance$$style2 !== void 0 && _instance$$style2.name) {
      var _instance$$style3;
      BaseStyle.loadCSS(useStyleOptions);
      instance.isUnstyled() && ((_instance$$style3 = instance.$style) === null || _instance$$style3 === void 0 ? void 0 : _instance$$style3.loadCSS(useStyleOptions));
      Base.setLoadedStyleName(instance.$style.name);
    }
  },
  _loadThemeStyles: function _loadThemeStyles2() {
    var _instance$$style5, _instance$$style6;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    if (instance !== null && instance !== void 0 && instance.isUnstyled()) return;
    if (!config_default.isStyleNameLoaded("common")) {
      var _instance$$style4, _instance$$style4$get;
      var _ref5 = ((_instance$$style4 = instance.$style) === null || _instance$$style4 === void 0 || (_instance$$style4$get = _instance$$style4.getCommonTheme) === null || _instance$$style4$get === void 0 ? void 0 : _instance$$style4$get.call(_instance$$style4)) || {}, primitive = _ref5.primitive, semantic = _ref5.semantic;
      BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread({
        name: "primitive-variables"
      }, useStyleOptions));
      BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread({
        name: "semantic-variables"
      }, useStyleOptions));
      BaseStyle.loadTheme(_objectSpread({
        name: "global-style"
      }, useStyleOptions));
      config_default.setLoadedStyleName("common");
    }
    if (!config_default.isStyleNameLoaded((_instance$$style5 = instance.$style) === null || _instance$$style5 === void 0 ? void 0 : _instance$$style5.name) && (_instance$$style6 = instance.$style) !== null && _instance$$style6 !== void 0 && _instance$$style6.name) {
      var _instance$$style7, _instance$$style7$get, _instance$$style8, _instance$$style9;
      var _ref6 = ((_instance$$style7 = instance.$style) === null || _instance$$style7 === void 0 || (_instance$$style7$get = _instance$$style7.getDirectiveTheme) === null || _instance$$style7$get === void 0 ? void 0 : _instance$$style7$get.call(_instance$$style7)) || {}, css2 = _ref6.css;
      (_instance$$style8 = instance.$style) === null || _instance$$style8 === void 0 || _instance$$style8.load(css2, _objectSpread({
        name: "".concat(instance.$style.name, "-variables")
      }, useStyleOptions));
      (_instance$$style9 = instance.$style) === null || _instance$$style9 === void 0 || _instance$$style9.loadTheme(_objectSpread({
        name: "".concat(instance.$style.name, "-style")
      }, useStyleOptions));
      config_default.setLoadedStyleName(instance.$style.name);
    }
    if (!config_default.isStyleNameLoaded("layer-order")) {
      var _instance$$style10, _instance$$style10$ge;
      var layerOrder = (_instance$$style10 = instance.$style) === null || _instance$$style10 === void 0 || (_instance$$style10$ge = _instance$$style10.getLayerOrderThemeCSS) === null || _instance$$style10$ge === void 0 ? void 0 : _instance$$style10$ge.call(_instance$$style10);
      BaseStyle.load(layerOrder, _objectSpread({
        name: "layer-order",
        first: true
      }, useStyleOptions));
      config_default.setLoadedStyleName("layer-order");
    }
  },
  _loadScopedThemeStyles: function _loadScopedThemeStyles2() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var useStyleOptions = arguments.length > 1 ? arguments[1] : void 0;
    var preset = instance.preset();
    if (preset && instance.$attrSelector) {
      var _instance$$style11, _instance$$style11$ge, _instance$$style12;
      var _ref7 = ((_instance$$style11 = instance.$style) === null || _instance$$style11 === void 0 || (_instance$$style11$ge = _instance$$style11.getPresetTheme) === null || _instance$$style11$ge === void 0 ? void 0 : _instance$$style11$ge.call(_instance$$style11, preset, "[".concat(instance.$attrSelector, "]"))) || {}, css2 = _ref7.css;
      var scopedStyle = (_instance$$style12 = instance.$style) === null || _instance$$style12 === void 0 ? void 0 : _instance$$style12.load(css2, _objectSpread({
        name: "".concat(instance.$attrSelector, "-").concat(instance.$style.name)
      }, useStyleOptions));
      instance.scopedStyleEl = scopedStyle.el;
    }
  },
  _themeChangeListener: function _themeChangeListener2() {
    var callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
    };
    Base.clearLoadedStyleNames();
    service_default.on("theme:change", callback);
  },
  _hook: function _hook2(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(toCapitalCase(hookName));
    var config = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  _mergeProps: function _mergeProps2() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return isFunction(fn) ? fn.apply(void 0, args) : vueExports.mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$instance$hook, _el$$instance9, _el$$pd;
      el._$instances = el._$instances || {};
      var config = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = isEmpty($prevInstance) ? _objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread(_objectSpread({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread({
          classes: void 0,
          inlineStyles: void 0,
          load: function load() {
          },
          loadCSS: function loadCSS() {
          },
          loadTheme: function loadTheme() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $primevueConfig: config,
        $attrSelector: el.$attrSelector,
        /* computed instance variables */
        defaultPT: function defaultPT2() {
          return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled2() {
          var _el$$instance, _el$$instance2;
          return ((_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.unstyled) !== void 0 ? (_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$binding) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.value) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
        },
        theme: function theme6() {
          var _el$$instance3;
          return (_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$primevueConfig) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.theme;
        },
        preset: function preset() {
          var _el$$instance4;
          return (_el$$instance4 = el.$instance) === null || _el$$instance4 === void 0 || (_el$$instance4 = _el$$instance4.$binding) === null || _el$$instance4 === void 0 || (_el$$instance4 = _el$$instance4.value) === null || _el$$instance4 === void 0 ? void 0 : _el$$instance4.dt;
        },
        /* instance's methods */
        ptm: function ptm2() {
          var _el$$instance5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el.$instance, (_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$binding) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.value) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.pt, key, _objectSpread({}, params));
        },
        ptmo: function ptmo2() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
        },
        cx: function cx2() {
          var _el$$instance6, _el$$instance7;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$$instance6 = el.$instance) !== null && _el$$instance6 !== void 0 && _el$$instance6.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance7 = el.$instance) === null || _el$$instance7 === void 0 || (_el$$instance7 = _el$$instance7.$style) === null || _el$$instance7 === void 0 ? void 0 : _el$$instance7.classes, key, _objectSpread({}, params)) : void 0;
        },
        sx: function sx2() {
          var _el$$instance8;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$$instance8 = el.$instance) === null || _el$$instance8 === void 0 || (_el$$instance8 = _el$$instance8.$style) === null || _el$$instance8 === void 0 ? void 0 : _el$$instance8.inlineStyles, key, _objectSpread({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance9 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance9, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
      el.$pd || (el.$pd = {});
      el.$pd[name] = _objectSpread(_objectSpread({}, (_el$$pd = el.$pd) === null || _el$$pd === void 0 ? void 0 : _el$$pd[name]), {}, {
        name,
        instance: el.$instance
      });
    };
    var handleWatch = function handleWatch2(el) {
      var _el$$instance10, _watchers$config, _el$$instance11, _watchers$configRipp, _el$$instance12;
      var watchers = (_el$$instance10 = el.$instance) === null || _el$$instance10 === void 0 ? void 0 : _el$$instance10.watch;
      watchers === null || watchers === void 0 || (_watchers$config = watchers["config"]) === null || _watchers$config === void 0 || _watchers$config.call(el.$instance, (_el$$instance11 = el.$instance) === null || _el$$instance11 === void 0 ? void 0 : _el$$instance11.$primevueConfig);
      PrimeVueService.on("config:change", function(_ref8) {
        var _watchers$config2;
        var newValue = _ref8.newValue, oldValue = _ref8.oldValue;
        return watchers === null || watchers === void 0 || (_watchers$config2 = watchers["config"]) === null || _watchers$config2 === void 0 ? void 0 : _watchers$config2.call(el.$instance, newValue, oldValue);
      });
      watchers === null || watchers === void 0 || (_watchers$configRipp = watchers["config.ripple"]) === null || _watchers$configRipp === void 0 || _watchers$configRipp.call(el.$instance, (_el$$instance12 = el.$instance) === null || _el$$instance12 === void 0 || (_el$$instance12 = _el$$instance12.$primevueConfig) === null || _el$$instance12 === void 0 ? void 0 : _el$$instance12.ripple);
      PrimeVueService.on("config:ripple:change", function(_ref9) {
        var _watchers$configRipp2;
        var newValue = _ref9.newValue, oldValue = _ref9.oldValue;
        return watchers === null || watchers === void 0 || (_watchers$configRipp2 = watchers["config.ripple"]) === null || _watchers$configRipp2 === void 0 ? void 0 : _watchers$configRipp2.call(el.$instance, newValue, oldValue);
      });
    };
    return {
      created: function created2(el, binding, vnode, prevVnode) {
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        el.$attrSelector = UniqueComponentId("pd");
        BaseDirective._loadStyles(el, binding, vnode);
        handleHook("beforeMount", el, binding, vnode, prevVnode);
        handleWatch(el);
      },
      mounted: function mounted2(el, binding, vnode, prevVnode) {
        BaseDirective._loadStyles(el, binding, vnode);
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate2(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated2(el, binding, vnode, prevVnode) {
        BaseDirective._loadStyles(el, binding, vnode);
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount2(el, binding, vnode, prevVnode) {
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted3(el, binding, vnode, prevVnode) {
        var _el$$instance13;
        (_el$$instance13 = el.$instance) === null || _el$$instance13 === void 0 || (_el$$instance13 = _el$$instance13.scopedStyleEl) === null || _el$$instance13 === void 0 || (_el$$instance13 = _el$$instance13.value) === null || _el$$instance13 === void 0 || _el$$instance13.remove();
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread({
      extend: function extend2() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread(_objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var theme$2 = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-ink {\n    display: block;\n    position: absolute;\n    background: ".concat(dt("ripple.background"), ";\n    border-radius: 100%;\n    transform: scale(0);\n    pointer-events: none;\n}\n\n.p-ink-active {\n    animation: ripple 0.4s linear;\n}\n\n@keyframes ripple {\n    100% {\n        opacity: 0;\n        transform: scale(2.5);\n    }\n}\n");
};
var classes$2 = {
  root: "p-ink"
};
var RippleStyle = BaseStyle.extend({
  name: "ripple-directive",
  theme: theme$2,
  classes: classes$2
});
var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Ripple = BaseRipple.extend("ripple", {
  watch: {
    "config.ripple": function configRipple(newValue) {
      if (newValue) {
        this.createRipple(this.$host);
        this.bindEvents(this.$host);
        this.$host.setAttribute("data-pd-ripple", true);
        this.$host.style["overflow"] = "hidden";
        this.$host.style["position"] = "relative";
      } else {
        this.remove(this.$host);
        this.$host.removeAttribute("data-pd-ripple");
      }
    }
  },
  unmounted: function unmounted2(el) {
    this.remove(el);
  },
  timeout: void 0,
  methods: {
    bindEvents: function bindEvents(el) {
      el.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      el.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    createRipple: function createRipple(el) {
      var ink = createElement("span", _defineProperty$1(_defineProperty$1({
        role: "presentation",
        "aria-hidden": true,
        "data-p-ink": true,
        "data-p-ink-active": false,
        "class": !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this)
      }, this.$attrSelector, ""), "p-bind", this.ptm("root")));
      el.appendChild(ink);
      this.$el = ink;
    },
    remove: function remove(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.$host.style["overflow"] = "";
        this.$host.style["position"] = "";
        this.unbindEvents(el);
        ink.removeEventListener("animationend", this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === "none") {
        return;
      }
      !this.isUnstyled() && removeClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "false");
      if (!getHeight(ink) && !getWidth(ink)) {
        var d = Math.max(getOuterWidth(target), getOuterHeight(target));
        ink.style.height = d + "px";
        ink.style.width = d + "px";
      }
      var offset = getOffset(target);
      var x = event.pageX - offset.left + (void 0).body.scrollTop - getWidth(ink) / 2;
      var y = event.pageY - offset.top + (void 0).body.scrollLeft - getHeight(ink) / 2;
      ink.style.top = y + "px";
      ink.style.left = x + "px";
      !this.isUnstyled() && addClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "true");
      this.timeout = setTimeout(function() {
        if (ink) {
          !_this.isUnstyled() && removeClass(ink, "p-ink-active");
          ink.setAttribute("data-p-ink-active", "false");
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && removeClass(event.currentTarget, "p-ink-active");
      event.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray(el.children).find(function(child) {
        return getAttribute(child, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var theme$1 = function theme3(_ref) {
  var dt = _ref.dt;
  return "\n.p-button {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    color: ".concat(dt("button.primary.color"), ";\n    background: ").concat(dt("button.primary.background"), ";\n    border: 1px solid ").concat(dt("button.primary.border.color"), ";\n    padding: ").concat(dt("button.padding.y"), " ").concat(dt("button.padding.x"), ";\n    font-size: 1rem;\n    font-family: inherit;\n    font-feature-settings: inherit;\n    transition: background ").concat(dt("button.transition.duration"), ", color ").concat(dt("button.transition.duration"), ", border-color ").concat(dt("button.transition.duration"), ",\n            outline-color ").concat(dt("button.transition.duration"), ", box-shadow ").concat(dt("button.transition.duration"), ";\n    border-radius: ").concat(dt("button.border.radius"), ";\n    outline-color: transparent;\n    gap: ").concat(dt("button.gap"), ";\n}\n\n.p-button:disabled {\n    cursor: default;\n}\n\n.p-button-icon-right {\n    order: 1;\n}\n\n.p-button-icon-bottom {\n    order: 2;\n}\n\n.p-button-icon-only {\n    width: ").concat(dt("button.icon.only.width"), ";\n    padding-left: 0;\n    padding-right: 0;\n    gap: 0;\n}\n\n.p-button-icon-only.p-button-rounded {\n    border-radius: 50%;\n    height: ").concat(dt("button.icon.only.width"), ";\n}\n\n.p-button-icon-only .p-button-label {\n    visibility: hidden;\n    width: 0;\n}\n\n.p-button-sm {\n    font-size: ").concat(dt("button.sm.font.size"), ";\n    padding: ").concat(dt("button.sm.padding.y"), " ").concat(dt("button.sm.padding.x"), ";\n}\n\n.p-button-sm .p-button-icon {\n    font-size: ").concat(dt("button.sm.font.size"), ";\n}\n\n.p-button-lg {\n    font-size: ").concat(dt("button.lg.font.size"), ";\n    padding: ").concat(dt("button.lg.padding.y"), " ").concat(dt("button.lg.padding.x"), ";\n}\n\n.p-button-lg .p-button-icon {\n    font-size: ").concat(dt("button.lg.font.size"), ";\n}\n\n.p-button-vertical {\n    flex-direction: column;\n}\n\n.p-button-label {\n    font-weight: ").concat(dt("button.label.font.weight"), ";\n}\n\n.p-button-fluid {\n    width: 100%;\n}\n\n.p-button-fluid.p-button-icon-only {\n    width: ").concat(dt("button.icon.only.width"), ";\n}\n\n.p-button:not(:disabled):hover {\n    background: ").concat(dt("button.primary.hover.background"), ";\n    border: 1px solid ").concat(dt("button.primary.hover.border.color"), ";\n    color: ").concat(dt("button.primary.hover.color"), ";\n}\n\n.p-button:not(:disabled):active {\n    background: ").concat(dt("button.primary.active.background"), ";\n    border: 1px solid ").concat(dt("button.primary.active.border.color"), ";\n    color: ").concat(dt("button.primary.active.color"), ";\n}\n\n.p-button:focus-visible {\n    box-shadow: ").concat(dt("button.primary.focus.ring.shadow"), ";\n    outline: ").concat(dt("button.focus.ring.width"), " ").concat(dt("button.focus.ring.style"), " ").concat(dt("button.primary.focus.ring.color"), ";\n    outline-offset: ").concat(dt("button.focus.ring.offset"), ";\n}\n\n.p-button .p-badge {\n    min-width: ").concat(dt("button.badge.size"), ";\n    height: ").concat(dt("button.badge.size"), ";\n    line-height: ").concat(dt("button.badge.size"), ";\n}\n\n.p-button-raised {\n    box-shadow: ").concat(dt("button.raised.shadow"), ";\n}\n\n.p-button-rounded {\n    border-radius: ").concat(dt("button.rounded.border.radius"), ";\n}\n\n.p-button-secondary {\n    background: ").concat(dt("button.secondary.background"), ";\n    border: 1px solid ").concat(dt("button.secondary.border.color"), ";\n    color: ").concat(dt("button.secondary.color"), ";\n}\n\n.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt("button.secondary.hover.background"), ";\n    border: 1px solid ").concat(dt("button.secondary.hover.border.color"), ";\n    color: ").concat(dt("button.secondary.hover.color"), ";\n}\n\n.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt("button.secondary.active.background"), ";\n    border: 1px solid ").concat(dt("button.secondary.active.border.color"), ";\n    color: ").concat(dt("button.secondary.active.color"), ";\n}\n\n.p-button-secondary:focus-visible {\n    outline-color: ").concat(dt("button.secondary.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.secondary.focus.ring.shadow"), ";\n}\n\n.p-button-success {\n    background: ").concat(dt("button.success.background"), ";\n    border: 1px solid ").concat(dt("button.success.border.color"), ";\n    color: ").concat(dt("button.success.color"), ";\n}\n\n.p-button-success:not(:disabled):hover {\n    background: ").concat(dt("button.success.hover.background"), ";\n    border: 1px solid ").concat(dt("button.success.hover.border.color"), ";\n    color: ").concat(dt("button.success.hover.color"), ";\n}\n\n.p-button-success:not(:disabled):active {\n    background: ").concat(dt("button.success.active.background"), ";\n    border: 1px solid ").concat(dt("button.success.active.border.color"), ";\n    color: ").concat(dt("button.success.active.color"), ";\n}\n\n.p-button-success:focus-visible {\n    outline-color: ").concat(dt("button.success.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.success.focus.ring.shadow"), ";\n}\n\n.p-button-info {\n    background: ").concat(dt("button.info.background"), ";\n    border: 1px solid ").concat(dt("button.info.border.color"), ";\n    color: ").concat(dt("button.info.color"), ";\n}\n\n.p-button-info:not(:disabled):hover {\n    background: ").concat(dt("button.info.hover.background"), ";\n    border: 1px solid ").concat(dt("button.info.hover.border.color"), ";\n    color: ").concat(dt("button.info.hover.color"), ";\n}\n\n.p-button-info:not(:disabled):active {\n    background: ").concat(dt("button.info.active.background"), ";\n    border: 1px solid ").concat(dt("button.info.active.border.color"), ";\n    color: ").concat(dt("button.info.active.color"), ";\n}\n\n.p-button-info:focus-visible {\n    outline-color: ").concat(dt("button.info.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.info.focus.ring.shadow"), ";\n}\n\n.p-button-warn {\n    background: ").concat(dt("button.warn.background"), ";\n    border: 1px solid ").concat(dt("button.warn.border.color"), ";\n    color: ").concat(dt("button.warn.color"), ";\n}\n\n.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt("button.warn.hover.background"), ";\n    border: 1px solid ").concat(dt("button.warn.hover.border.color"), ";\n    color: ").concat(dt("button.warn.hover.color"), ";\n}\n\n.p-button-warn:not(:disabled):active {\n    background: ").concat(dt("button.warn.active.background"), ";\n    border: 1px solid ").concat(dt("button.warn.active.border.color"), ";\n    color: ").concat(dt("button.warn.active.color"), ";\n}\n\n.p-button-warn:focus-visible {\n    outline-color: ").concat(dt("button.warn.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.warn.focus.ring.shadow"), ";\n}\n\n.p-button-help {\n    background: ").concat(dt("button.help.background"), ";\n    border: 1px solid ").concat(dt("button.help.border.color"), ";\n    color: ").concat(dt("button.help.color"), ";\n}\n\n.p-button-help:not(:disabled):hover {\n    background: ").concat(dt("button.help.hover.background"), ";\n    border: 1px solid ").concat(dt("button.help.hover.border.color"), ";\n    color: ").concat(dt("button.help.hover.color"), ";\n}\n\n.p-button-help:not(:disabled):active {\n    background: ").concat(dt("button.help.active.background"), ";\n    border: 1px solid ").concat(dt("button.help.active.border.color"), ";\n    color: ").concat(dt("button.help.active.color"), ";\n}\n\n.p-button-help:focus-visible {\n    outline-color: ").concat(dt("button.help.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.help.focus.ring.shadow"), ";\n}\n\n.p-button-danger {\n    background: ").concat(dt("button.danger.background"), ";\n    border: 1px solid ").concat(dt("button.danger.border.color"), ";\n    color: ").concat(dt("button.danger.color"), ";\n}\n\n.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt("button.danger.hover.background"), ";\n    border: 1px solid ").concat(dt("button.danger.hover.border.color"), ";\n    color: ").concat(dt("button.danger.hover.color"), ";\n}\n\n.p-button-danger:not(:disabled):active {\n    background: ").concat(dt("button.danger.active.background"), ";\n    border: 1px solid ").concat(dt("button.danger.active.border.color"), ";\n    color: ").concat(dt("button.danger.active.color"), ";\n}\n\n.p-button-danger:focus-visible {\n    outline-color: ").concat(dt("button.danger.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.danger.focus.ring.shadow"), ";\n}\n\n.p-button-contrast {\n    background: ").concat(dt("button.contrast.background"), ";\n    border: 1px solid ").concat(dt("button.contrast.border.color"), ";\n    color: ").concat(dt("button.contrast.color"), ";\n}\n\n.p-button-contrast:not(:disabled):hover {\n    background: ").concat(dt("button.contrast.hover.background"), ";\n    border: 1px solid ").concat(dt("button.contrast.hover.border.color"), ";\n    color: ").concat(dt("button.contrast.hover.color"), ";\n}\n\n.p-button-contrast:not(:disabled):active {\n    background: ").concat(dt("button.contrast.active.background"), ";\n    border: 1px solid ").concat(dt("button.contrast.active.border.color"), ";\n    color: ").concat(dt("button.contrast.active.color"), ";\n}\n\n.p-button-contrast:focus-visible {\n    outline-color: ").concat(dt("button.contrast.focus.ring.color"), ";\n    box-shadow: ").concat(dt("button.contrast.focus.ring.shadow"), ";\n}\n\n.p-button-outlined {\n    background: transparent;\n    border-color: ").concat(dt("button.outlined.primary.border.color"), ";\n    color: ").concat(dt("button.outlined.primary.color"), ";\n}\n\n.p-button-outlined:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.primary.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.primary.border.color"), ";\n    color: ").concat(dt("button.outlined.primary.color"), ";\n}\n\n.p-button-outlined:not(:disabled):active {\n    background: ").concat(dt("button.outlined.primary.active.background"), ";\n    border-color: ").concat(dt("button.outlined.primary.border.color"), ";\n    color: ").concat(dt("button.outlined.primary.color"), ";\n}\n\n.p-button-outlined.p-button-secondary {\n    border-color: ").concat(dt("button.outlined.secondary.border.color"), ";\n    color: ").concat(dt("button.outlined.secondary.color"), ";\n}\n\n.p-button-outlined.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.secondary.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.secondary.border.color"), ";\n    color: ").concat(dt("button.outlined.secondary.color"), ";\n}\n\n.p-button-outlined.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt("button.outlined.secondary.active.background"), ";\n    border-color: ").concat(dt("button.outlined.secondary.border.color"), ";\n    color: ").concat(dt("button.outlined.secondary.color"), ";\n}\n\n.p-button-outlined.p-button-success {\n    border-color: ").concat(dt("button.outlined.success.border.color"), ";\n    color: ").concat(dt("button.outlined.success.color"), ";\n}\n\n.p-button-outlined.p-button-success:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.success.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.success.border.color"), ";\n    color: ").concat(dt("button.outlined.success.color"), ";\n}\n\n.p-button-outlined.p-button-success:not(:disabled):active {\n    background: ").concat(dt("button.outlined.success.active.background"), ";\n    border-color: ").concat(dt("button.outlined.success.border.color"), ";\n    color: ").concat(dt("button.outlined.success.color"), ";\n}\n\n.p-button-outlined.p-button-info {\n    border-color: ").concat(dt("button.outlined.info.border.color"), ";\n    color: ").concat(dt("button.outlined.info.color"), ";\n}\n\n.p-button-outlined.p-button-info:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.info.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.info.border.color"), ";\n    color: ").concat(dt("button.outlined.info.color"), ";\n}\n\n.p-button-outlined.p-button-info:not(:disabled):active {\n    background: ").concat(dt("button.outlined.info.active.background"), ";\n    border-color: ").concat(dt("button.outlined.info.border.color"), ";\n    color: ").concat(dt("button.outlined.info.color"), ";\n}\n\n.p-button-outlined.p-button-warn {\n    border-color: ").concat(dt("button.outlined.warn.border.color"), ";\n    color: ").concat(dt("button.outlined.warn.color"), ";\n}\n\n.p-button-outlined.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.warn.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.warn.border.color"), ";\n    color: ").concat(dt("button.outlined.warn.color"), ";\n}\n\n.p-button-outlined.p-button-warn:not(:disabled):active {\n    background: ").concat(dt("button.outlined.warn.active.background"), ";\n    border-color: ").concat(dt("button.outlined.warn.border.color"), ";\n    color: ").concat(dt("button.outlined.warn.color"), ";\n}\n\n.p-button-outlined.p-button-help {\n    border-color: ").concat(dt("button.outlined.help.border.color"), ";\n    color: ").concat(dt("button.outlined.help.color"), ";\n}\n\n.p-button-outlined.p-button-help:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.help.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.help.border.color"), ";\n    color: ").concat(dt("button.outlined.help.color"), ";\n}\n\n.p-button-outlined.p-button-help:not(:disabled):active {\n    background: ").concat(dt("button.outlined.help.active.background"), ";\n    border-color: ").concat(dt("button.outlined.help.border.color"), ";\n    color: ").concat(dt("button.outlined.help.color"), ";\n}\n\n.p-button-outlined.p-button-danger {\n    border-color: ").concat(dt("button.outlined.danger.border.color"), ";\n    color: ").concat(dt("button.outlined.danger.color"), ";\n}\n\n.p-button-outlined.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.danger.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.danger.border.color"), ";\n    color: ").concat(dt("button.outlined.danger.color"), ";\n}\n\n.p-button-outlined.p-button-danger:not(:disabled):active {\n    background: ").concat(dt("button.outlined.danger.active.background"), ";\n    border-color: ").concat(dt("button.outlined.danger.border.color"), ";\n    color: ").concat(dt("button.outlined.danger.color"), ";\n}\n\n.p-button-outlined.p-button-contrast {\n    border-color: ").concat(dt("button.outlined.contrast.border.color"), ";\n    color: ").concat(dt("button.outlined.contrast.color"), ";\n}\n\n.p-button-outlined.p-button-contrast:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.contrast.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.contrast.border.color"), ";\n    color: ").concat(dt("button.outlined.contrast.color"), ";\n}\n\n.p-button-outlined.p-button-contrast:not(:disabled):active {\n    background: ").concat(dt("button.outlined.contrast.active.background"), ";\n    border-color: ").concat(dt("button.outlined.contrast.border.color"), ";\n    color: ").concat(dt("button.outlined.contrast.color"), ";\n}\n\n.p-button-outlined.p-button-plain {\n    border-color: ").concat(dt("button.outlined.plain.border.color"), ";\n    color: ").concat(dt("button.outlined.plain.color"), ";\n}\n\n.p-button-outlined.p-button-plain:not(:disabled):hover {\n    background: ").concat(dt("button.outlined.plain.hover.background"), ";\n    border-color: ").concat(dt("button.outlined.plain.border.color"), ";\n    color: ").concat(dt("button.outlined.plain.color"), ";\n}\n\n.p-button-outlined.p-button-plain:not(:disabled):active {\n    background: ").concat(dt("button.outlined.plain.active.background"), ";\n    border-color: ").concat(dt("button.outlined.plain.border.color"), ";\n    color: ").concat(dt("button.outlined.plain.color"), ";\n}\n\n.p-button-text {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.primary.color"), ";\n}\n\n.p-button-text:not(:disabled):hover {\n    background: ").concat(dt("button.text.primary.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.primary.color"), ";\n}\n\n.p-button-text:not(:disabled):active {\n    background: ").concat(dt("button.text.primary.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.primary.color"), ";\n}\n\n.p-button-text.p-button-secondary {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.secondary.color"), ";\n}\n\n.p-button-text.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt("button.text.secondary.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.secondary.color"), ";\n}\n\n.p-button-text.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt("button.text.secondary.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.secondary.color"), ";\n}\n\n.p-button-text.p-button-success {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.success.color"), ";\n}\n\n.p-button-text.p-button-success:not(:disabled):hover {\n    background: ").concat(dt("button.text.success.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.success.color"), ";\n}\n\n.p-button-text.p-button-success:not(:disabled):active {\n    background: ").concat(dt("button.text.success.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.success.color"), ";\n}\n\n.p-button-text.p-button-info {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.info.color"), ";\n}\n\n.p-button-text.p-button-info:not(:disabled):hover {\n    background: ").concat(dt("button.text.info.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.info.color"), ";\n}\n\n.p-button-text.p-button-info:not(:disabled):active {\n    background: ").concat(dt("button.text.info.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.info.color"), ";\n}\n\n.p-button-text.p-button-warn {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.warn.color"), ";\n}\n\n.p-button-text.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt("button.text.warn.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.warn.color"), ";\n}\n\n.p-button-text.p-button-warn:not(:disabled):active {\n    background: ").concat(dt("button.text.warn.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.warn.color"), ";\n}\n\n.p-button-text.p-button-help {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.help.color"), ";\n}\n\n.p-button-text.p-button-help:not(:disabled):hover {\n    background: ").concat(dt("button.text.help.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.help.color"), ";\n}\n\n.p-button-text.p-button-help:not(:disabled):active {\n    background: ").concat(dt("button.text.help.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.help.color"), ";\n}\n\n.p-button-text.p-button-danger {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.danger.color"), ";\n}\n\n.p-button-text.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt("button.text.danger.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.danger.color"), ";\n}\n\n.p-button-text.p-button-danger:not(:disabled):active {\n    background: ").concat(dt("button.text.danger.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.danger.color"), ";\n}\n\n.p-button-text.p-button-plain {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.text.plain.color"), ";\n}\n\n.p-button-text.p-button-plain:not(:disabled):hover {\n    background: ").concat(dt("button.text.plain.hover.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.plain.color"), ";\n}\n\n.p-button-text.p-button-plain:not(:disabled):active {\n    background: ").concat(dt("button.text.plain.active.background"), ";\n    border-color: transparent;\n    color: ").concat(dt("button.text.plain.color"), ";\n}\n\n.p-button-link {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.link.color"), ";\n}\n\n.p-button-link:not(:disabled):hover {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.link.hover.color"), ";\n}\n\n.p-button-link:not(:disabled):hover .p-button-label {\n    text-decoration: underline;\n}\n\n.p-button-link:not(:disabled):active {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt("button.link.active.color"), ";\n}\n");
};
var classes$1 = {
  root: function root2(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-button p-component", _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      "p-button-icon-only": instance.hasIcon && !props.label && !props.badge,
      "p-button-vertical": (props.iconPos === "top" || props.iconPos === "bottom") && props.label,
      "p-button-loading": props.loading,
      "p-button-link": props.link
    }, "p-button-".concat(props.severity), props.severity), "p-button-raised", props.raised), "p-button-rounded", props.rounded), "p-button-text", props.text), "p-button-outlined", props.outlined), "p-button-sm", props.size === "small"), "p-button-lg", props.size === "large"), "p-button-plain", props.plain), "p-button-fluid", instance.hasFluid)];
  },
  loadingIcon: "p-button-loading-icon",
  icon: function icon(_ref4) {
    var props = _ref4.props;
    return ["p-button-icon", _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label)];
  },
  label: "p-button-label"
};
var ButtonStyle = BaseStyle.extend({
  name: "button",
  theme: theme$1,
  classes: classes$1
});
var script$1$1 = {
  name: "BaseButton",
  "extends": script$6,
  props: {
    label: {
      type: String,
      "default": null
    },
    icon: {
      type: String,
      "default": null
    },
    iconPos: {
      type: String,
      "default": "left"
    },
    iconClass: {
      type: String,
      "default": null
    },
    badge: {
      type: String,
      "default": null
    },
    badgeClass: {
      type: String,
      "default": null
    },
    badgeSeverity: {
      type: String,
      "default": "secondary"
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    as: {
      type: String,
      "default": "BUTTON"
    },
    asChild: {
      type: Boolean,
      "default": false
    },
    link: {
      type: Boolean,
      "default": false
    },
    severity: {
      type: String,
      "default": null
    },
    raised: {
      type: Boolean,
      "default": false
    },
    rounded: {
      type: Boolean,
      "default": false
    },
    text: {
      type: Boolean,
      "default": false
    },
    outlined: {
      type: Boolean,
      "default": false
    },
    size: {
      type: String,
      "default": null
    },
    plain: {
      type: Boolean,
      "default": false
    },
    fluid: {
      type: Boolean,
      "default": null
    }
  },
  style: ButtonStyle,
  provide: function provide3() {
    return {
      $pcButton: this,
      $parentInstance: this
    };
  }
};
var script$2 = {
  name: "Button",
  "extends": script$1$1,
  inheritAttrs: false,
  inject: {
    $pcFluid: {
      "default": null
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          disabled: this.disabled
        }
      });
    }
  },
  computed: {
    disabled: function disabled() {
      return this.$attrs.disabled || this.$attrs.disabled === "" || this.loading;
    },
    defaultAriaLabel: function defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs.ariaLabel;
    },
    hasIcon: function hasIcon() {
      return this.icon || this.$slots.icon;
    },
    attrs: function attrs() {
      return vueExports.mergeProps(this.asAttrs, this.a11yAttrs, this.getPTOptions("root"));
    },
    asAttrs: function asAttrs() {
      return this.as === "BUTTON" ? {
        type: "button",
        disabled: this.disabled
      } : void 0;
    },
    a11yAttrs: function a11yAttrs() {
      return {
        "aria-label": this.defaultAriaLabel,
        "data-pc-name": "button",
        "data-p-disabled": this.disabled,
        "data-p-severity": this.severity
      };
    },
    hasFluid: function hasFluid() {
      return isEmpty(this.fluid) ? !!this.$pcFluid : this.fluid;
    }
  },
  components: {
    SpinnerIcon: script$4,
    Badge: script$3
  },
  directives: {
    ripple: Ripple
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = vueExports.resolveComponent("SpinnerIcon");
  var _component_Badge = vueExports.resolveComponent("Badge");
  var _directive_ripple = vueExports.resolveDirective("ripple");
  return !_ctx.asChild ? vueExports.withDirectives((vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(_ctx.as), vueExports.mergeProps({
    key: 0,
    "class": _ctx.cx("root")
  }, $options.attrs), {
    "default": vueExports.withCtx(function() {
      return [vueExports.renderSlot(_ctx.$slots, "default", {}, function() {
        return [_ctx.loading ? vueExports.renderSlot(_ctx.$slots, "loadingicon", {
          key: 0,
          "class": vueExports.normalizeClass([_ctx.cx("loadingIcon"), _ctx.cx("icon")])
        }, function() {
          return [_ctx.loadingIcon ? (vueExports.openBlock(), vueExports.createElementBlock("span", vueExports.mergeProps({
            key: 0,
            "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon"), _ctx.loadingIcon]
          }, _ctx.ptm("loadingIcon")), null, 16)) : (vueExports.openBlock(), vueExports.createBlock(_component_SpinnerIcon, vueExports.mergeProps({
            key: 1,
            "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon")],
            spin: ""
          }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
        }) : vueExports.renderSlot(_ctx.$slots, "icon", {
          key: 1,
          "class": vueExports.normalizeClass([_ctx.cx("icon")])
        }, function() {
          return [_ctx.icon ? (vueExports.openBlock(), vueExports.createElementBlock("span", vueExports.mergeProps({
            key: 0,
            "class": [_ctx.cx("icon"), _ctx.icon, _ctx.iconClass]
          }, _ctx.ptm("icon")), null, 16)) : vueExports.createCommentVNode("", true)];
        }), vueExports.createElementVNode("span", vueExports.mergeProps({
          "class": _ctx.cx("label")
        }, _ctx.ptm("label")), vueExports.toDisplayString(_ctx.label || " "), 17), _ctx.badge ? (vueExports.openBlock(), vueExports.createBlock(_component_Badge, vueExports.mergeProps({
          key: 2,
          value: _ctx.badge,
          "class": _ctx.badgeClass,
          severity: _ctx.badgeSeverity,
          unstyled: _ctx.unstyled
        }, _ctx.ptm("pcBadge")), null, 16, ["value", "class", "severity", "unstyled"])) : vueExports.createCommentVNode("", true)];
      })];
    }),
    _: 3
  }, 16, ["class"])), [[_directive_ripple]]) : vueExports.renderSlot(_ctx.$slots, "default", {
    key: 1,
    "class": vueExports.normalizeClass(_ctx.cx("root")),
    a11yAttrs: $options.a11yAttrs
  });
}
script$2.render = render$1;
var theme4 = function theme5(_ref) {
  var dt = _ref.dt;
  return "\n.p-card {\n    background: ".concat(dt("card.background"), ";\n    color: ").concat(dt("card.color"), ";\n    box-shadow: ").concat(dt("card.shadow"), ";\n    border-radius: ").concat(dt("card.border.radius"), ";\n    display: flex;\n    flex-direction: column;\n}\n\n.p-card-caption {\n    display: flex;\n    flex-direction: column;\n    gap: ").concat(dt("card.caption.gap"), ";\n}\n\n.p-card-body {\n    padding: ").concat(dt("card.body.padding"), ";\n    display: flex;\n    flex-direction: column;\n    gap: ").concat(dt("card.body.gap"), ";\n}\n\n.p-card-title {\n    font-size: ").concat(dt("card.title.font.size"), ";\n    font-weight: ").concat(dt("card.title.font.weight"), ";\n}\n\n.p-card-subtitle {\n    color: ").concat(dt("card.subtitle.color"), ";\n}\n");
};
var classes = {
  root: "p-card p-component",
  header: "p-card-header",
  body: "p-card-body",
  caption: "p-card-caption",
  title: "p-card-title",
  subtitle: "p-card-subtitle",
  content: "p-card-content",
  footer: "p-card-footer"
};
var CardStyle = BaseStyle.extend({
  name: "card",
  theme: theme4,
  classes
});
var script$1 = {
  name: "BaseCard",
  "extends": script$6,
  style: CardStyle,
  provide: function provide4() {
    return {
      $pcCard: this,
      $parentInstance: this
    };
  }
};
var script = {
  name: "Card",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [_ctx.$slots.header ? (vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    key: 0,
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [vueExports.renderSlot(_ctx.$slots, "header")], 16)) : vueExports.createCommentVNode("", true), vueExports.createElementVNode("div", vueExports.mergeProps({
    "class": _ctx.cx("body")
  }, _ctx.ptm("body")), [_ctx.$slots.title || _ctx.$slots.subtitle ? (vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    key: 0,
    "class": _ctx.cx("caption")
  }, _ctx.ptm("caption")), [_ctx.$slots.title ? (vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    key: 0,
    "class": _ctx.cx("title")
  }, _ctx.ptm("title")), [vueExports.renderSlot(_ctx.$slots, "title")], 16)) : vueExports.createCommentVNode("", true), _ctx.$slots.subtitle ? (vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    key: 1,
    "class": _ctx.cx("subtitle")
  }, _ctx.ptm("subtitle")), [vueExports.renderSlot(_ctx.$slots, "subtitle")], 16)) : vueExports.createCommentVNode("", true)], 16)) : vueExports.createCommentVNode("", true), vueExports.createElementVNode("div", vueExports.mergeProps({
    "class": _ctx.cx("content")
  }, _ctx.ptm("content")), [vueExports.renderSlot(_ctx.$slots, "content")], 16), _ctx.$slots.footer ? (vueExports.openBlock(), vueExports.createElementBlock("div", vueExports.mergeProps({
    key: 1,
    "class": _ctx.cx("footer")
  }, _ctx.ptm("footer")), [vueExports.renderSlot(_ctx.$slots, "footer")], 16)) : vueExports.createCommentVNode("", true)], 16)], 16);
}
script.render = render;
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "RedirectsPanel",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: redirects, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(() => useFetch("/api/redirects", {
      transform: (data) => {
        return {
          text: Object.entries(data).map(([from, to]) => `${from} ${to}`).join("\n")
        };
      }
    }, "$qudnCtMtUq")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = script;
      const _component_Button = script$2;
      _push(`<div${ssrRenderAttrs_1(_attrs)}>`);
      _push(ssrRenderComponent_1(_component_Card, null, {
        title: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Simple Card`);
          } else {
            return [
              vueExports.createTextVNode("Simple Card")
            ];
          }
        }),
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="m-0"${_scopeId}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas! </p>`);
            _push2(ssrRenderComponent_1(_component_Button, {
              label: "Check",
              icon: "pi pi-check"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode("p", { class: "m-0" }, " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas! "),
              vueExports.createVNode(_component_Button, {
                label: "Check",
                icon: "pi pi-check"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h3>Server redirects</h3><form><p><textarea rows="6" placeholder="/from /to (one redirect per line)" style="${ssrRenderStyle_1({ "width": "300px" })}">${ssrInterpolate_1(vueExports.unref(redirects).text)}</textarea></p><button type="submit">Save redirects</button></form></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RedirectsPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MessagesPanel",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: messages, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(() => useFetch("/api/messages", "$0AMhPWytjY")), __temp = await __temp, __restore(), __temp);
    const newMessage = vueExports.ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs_1(_attrs)}><h3>Messages</h3><form><input${ssrRenderAttr_1("value", vueExports.unref(newMessage))} placeholder="Type a message"><button type="submit"> Send </button></form><!--[-->`);
      ssrRenderList_1(vueExports.unref(messages), (message) => {
        _push(`<p>${ssrInterpolate_1(message.text)} - ${ssrInterpolate_1(new Date(message.created_at).toLocaleString("fr-FR"))}</p>`);
      });
      _push(`<!--]-->`);
      if (!((_a = vueExports.unref(messages)) == null ? void 0 : _a.length)) {
        _push(`<p> No messages yet </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MessagesPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ImageGallery = _sfc_main$3;
  const _component_RedirectsPanel = _sfc_main$2;
  const _component_MessagesPanel = _sfc_main$1;
  _push(`<main${ssrRenderAttrs_1(_attrs)}>`);
  _push(ssrRenderComponent_1(_component_ImageGallery, null, null, _parent));
  _push(ssrRenderComponent_1(_component_RedirectsPanel, null, null, _parent));
  _push(ssrRenderComponent_1(_component_MessagesPanel, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-DkSI-ZaQ.js.map
