var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod2) => function __require2() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from2, except2, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except2)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/xhr2/lib/xhr2.js
var require_xhr2 = __commonJS({
  "node_modules/xhr2/lib/xhr2.js"(exports, module) {
    (function() {
      var InvalidStateError, NetworkError, ProgressEvent, SecurityError, SyntaxError, XMLHttpRequest, XMLHttpRequestEventTarget, XMLHttpRequestUpload, http, https, os, url;
      XMLHttpRequestEventTarget = function() {
        class XMLHttpRequestEventTarget2 {
          // @private
          // This is an abstract class and should not be instantiated directly.
          constructor() {
            this.onloadstart = null;
            this.onprogress = null;
            this.onabort = null;
            this.onerror = null;
            this.onload = null;
            this.ontimeout = null;
            this.onloadend = null;
            this._listeners = {};
          }
          // Adds a new-style listener for one of the XHR events.
          // @see http://www.w3.org/TR/XMLHttpRequest/#events
          // @param {String} eventType an XHR event type, such as 'readystatechange'
          // @param {function(ProgressEvent)} listener function that will be called when
          //   the event fires
          // @return {undefined} undefined
          addEventListener(eventType, listener) {
            var base;
            eventType = eventType.toLowerCase();
            (base = this._listeners)[eventType] || (base[eventType] = []);
            this._listeners[eventType].push(listener);
            return void 0;
          }
          // Removes an event listener added by calling addEventListener.
          // @param {String} eventType an XHR event type, such as 'readystatechange'
          // @param {function(ProgressEvent)} listener the value passed in a previous
          //   call to addEventListener.
          // @return {undefined} undefined
          removeEventListener(eventType, listener) {
            var index3;
            eventType = eventType.toLowerCase();
            if (this._listeners[eventType]) {
              index3 = this._listeners[eventType].indexOf(listener);
              if (index3 !== -1) {
                this._listeners[eventType].splice(index3, 1);
              }
            }
            return void 0;
          }
          // Calls all the listeners for an event.
          // @param {ProgressEvent} event the event to be dispatched
          // @return {undefined} undefined
          dispatchEvent(event) {
            var eventType, j, len, listener, listeners;
            event.currentTarget = event.target = this;
            eventType = event.type;
            if (listeners = this._listeners[eventType]) {
              for (j = 0, len = listeners.length; j < len; j++) {
                listener = listeners[j];
                listener.call(this, event);
              }
            }
            if (listener = this[`on${eventType}`]) {
              listener.call(this, event);
            }
            return void 0;
          }
        }
        ;
        XMLHttpRequestEventTarget2.prototype.onloadstart = null;
        XMLHttpRequestEventTarget2.prototype.onprogress = null;
        XMLHttpRequestEventTarget2.prototype.onabort = null;
        XMLHttpRequestEventTarget2.prototype.onerror = null;
        XMLHttpRequestEventTarget2.prototype.onload = null;
        XMLHttpRequestEventTarget2.prototype.ontimeout = null;
        XMLHttpRequestEventTarget2.prototype.onloadend = null;
        return XMLHttpRequestEventTarget2;
      }.call(this);
      http = __require("http");
      https = __require("https");
      os = __require("os");
      url = __require("url");
      XMLHttpRequest = function() {
        class XMLHttpRequest2 extends XMLHttpRequestEventTarget {
          // Creates a new request.
          // @param {Object} options one or more of the options below
          // @option options {Boolean} anon if true, the request's anonymous flag
          //   will be set
          // @see http://www.w3.org/TR/XMLHttpRequest/#constructors
          // @see http://www.w3.org/TR/XMLHttpRequest/#anonymous-flag
          constructor(options) {
            super();
            this.onreadystatechange = null;
            this._anonymous = options && options.anon;
            this.readyState = XMLHttpRequest2.UNSENT;
            this.response = null;
            this.responseText = "";
            this.responseType = "";
            this.responseURL = "";
            this.status = 0;
            this.statusText = "";
            this.timeout = 0;
            this.upload = new XMLHttpRequestUpload(this);
            this._method = null;
            this._url = null;
            this._sync = false;
            this._headers = null;
            this._loweredHeaders = null;
            this._mimeOverride = null;
            this._request = null;
            this._response = null;
            this._responseParts = null;
            this._responseHeaders = null;
            this._aborting = null;
            this._error = null;
            this._loadedBytes = 0;
            this._totalBytes = 0;
            this._lengthComputable = false;
          }
          // Sets the XHR's method, URL, synchronous flag, and authentication params.
          // @param {String} method the HTTP method to be used
          // @param {String} url the URL that the request will be made to
          // @param {?Boolean} async if false, the XHR should be processed
          //   synchronously; true by default
          // @param {?String} user the user credential to be used in HTTP basic
          //   authentication
          // @param {?String} password the password credential to be used in HTTP basic
          //   authentication
          // @return {undefined} undefined
          // @throw {SecurityError} method is not one of the allowed methods
          // @throw {SyntaxError} urlString is not a valid URL
          // @throw {Error} the URL contains an unsupported protocol; the supported
          //   protocols are file, http and https
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
          open(method, url2, async, user, password) {
            var xhrUrl;
            method = method.toUpperCase();
            if (method in this._restrictedMethods) {
              throw new SecurityError(`HTTP method ${method} is not allowed in XHR`);
            }
            xhrUrl = this._parseUrl(url2);
            if (async === void 0) {
              async = true;
            }
            switch (this.readyState) {
              case XMLHttpRequest2.UNSENT:
              case XMLHttpRequest2.OPENED:
              case XMLHttpRequest2.DONE:
                null;
                break;
              case XMLHttpRequest2.HEADERS_RECEIVED:
              case XMLHttpRequest2.LOADING:
                null;
            }
            this._method = method;
            this._url = xhrUrl;
            this._sync = !async;
            this._headers = {};
            this._loweredHeaders = {};
            this._mimeOverride = null;
            this._setReadyState(XMLHttpRequest2.OPENED);
            this._request = null;
            this._response = null;
            this.status = 0;
            this.statusText = "";
            this._responseParts = [];
            this._responseHeaders = null;
            this._loadedBytes = 0;
            this._totalBytes = 0;
            this._lengthComputable = false;
            return void 0;
          }
          // Appends a header to the list of author request headers.
          // @param {String} name the HTTP header name
          // @param {String} value the HTTP header value
          // @return {undefined} undefined
          // @throw {InvalidStateError} readyState is not OPENED
          // @throw {SyntaxError} name is not a valid HTTP header name or value is not
          //   a valid HTTP header value
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
          setRequestHeader(name3, value2) {
            var loweredName;
            if (this.readyState !== XMLHttpRequest2.OPENED) {
              throw new InvalidStateError("XHR readyState must be OPENED");
            }
            loweredName = name3.toLowerCase();
            if (this._restrictedHeaders[loweredName] || /^sec\-/.test(loweredName) || /^proxy-/.test(loweredName)) {
              console.warn(`Refused to set unsafe header "${name3}"`);
              return void 0;
            }
            value2 = value2.toString();
            if (loweredName in this._loweredHeaders) {
              name3 = this._loweredHeaders[loweredName];
              this._headers[name3] = this._headers[name3] + ", " + value2;
            } else {
              this._loweredHeaders[loweredName] = name3;
              this._headers[name3] = value2;
            }
            return void 0;
          }
          // Initiates the request.
          // @param {?String, ?ArrayBufferView} data the data to be sent; ignored for
          //   GET and HEAD requests
          // @return {undefined} undefined
          // @throw {InvalidStateError} readyState is not OPENED
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
          send(data) {
            if (this.readyState !== XMLHttpRequest2.OPENED) {
              throw new InvalidStateError("XHR readyState must be OPENED");
            }
            if (this._request) {
              throw new InvalidStateError("send() already called");
            }
            switch (this._url.protocol) {
              case "file:":
                this._sendFile(data);
                break;
              case "http:":
              case "https:":
                this._sendHttp(data);
                break;
              default:
                throw new NetworkError(`Unsupported protocol ${this._url.protocol}`);
            }
            return void 0;
          }
          // Cancels the network activity performed by this request.
          // @return {undefined} undefined
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
          abort() {
            if (!this._request) {
              return;
            }
            this._request.abort();
            this._setError();
            this._dispatchProgress("abort");
            this._dispatchProgress("loadend");
            return void 0;
          }
          // Returns a header value in the HTTP response for this XHR.
          // @param {String} name case-insensitive HTTP header name
          // @return {?String} value the value of the header whose name matches the
          //   given name, or null if there is no such header
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
          getResponseHeader(name3) {
            var loweredName;
            if (!this._responseHeaders) {
              return null;
            }
            loweredName = name3.toLowerCase();
            if (loweredName in this._responseHeaders) {
              return this._responseHeaders[loweredName];
            } else {
              return null;
            }
          }
          // Returns all the HTTP headers in this XHR's response.
          // @return {String} header lines separated by CR LF, where each header line
          //   has the name and value separated by a ": " (colon, space); the empty
          //   string is returned if the headers are not available
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
          getAllResponseHeaders() {
            var lines, name3, value2;
            if (!this._responseHeaders) {
              return "";
            }
            lines = function() {
              var ref, results;
              ref = this._responseHeaders;
              results = [];
              for (name3 in ref) {
                value2 = ref[name3];
                results.push(`${name3}: ${value2}`);
              }
              return results;
            }.call(this);
            return lines.join("\r\n");
          }
          // Overrides the Content-Type
          // @return {undefined} undefined
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-overridemimetype()-method
          overrideMimeType(newMimeType) {
            if (this.readyState === XMLHttpRequest2.LOADING || this.readyState === XMLHttpRequest2.DONE) {
              throw new InvalidStateError("overrideMimeType() not allowed in LOADING or DONE");
            }
            this._mimeOverride = newMimeType.toLowerCase();
            return void 0;
          }
          // Network configuration not exposed in the XHR API.
          // Although the XMLHttpRequest specification calls itself "ECMAScript HTTP",
          // it assumes that requests are always performed in the context of a browser
          // application, where some network parameters are set by the browser user and
          // should not be modified by Web applications. This API provides access to
          // these network parameters.
          // NOTE: this is not in the XMLHttpRequest API, and will not work in
          // browsers.  It is a stable node-xhr2 API.
          // @param {Object} options one or more of the options below
          // @option options {?http.Agent} httpAgent the value for the nodejsHttpAgent
          //   property (the agent used for HTTP requests)
          // @option options {?https.Agent} httpsAgent the value for the
          //   nodejsHttpsAgent property (the agent used for HTTPS requests)
          // @return {undefined} undefined
          nodejsSet(options) {
            var baseUrl, parsedUrl;
            if ("httpAgent" in options) {
              this.nodejsHttpAgent = options.httpAgent;
            }
            if ("httpsAgent" in options) {
              this.nodejsHttpsAgent = options.httpsAgent;
            }
            if ("baseUrl" in options) {
              baseUrl = options.baseUrl;
              if (baseUrl !== null) {
                parsedUrl = url.parse(baseUrl, false, true);
                if (!parsedUrl.protocol) {
                  throw new SyntaxError("baseUrl must be an absolute URL");
                }
              }
              this.nodejsBaseUrl = baseUrl;
            }
            return void 0;
          }
          // Default settings for the network configuration not exposed in the XHR API.
          // NOTE: this is not in the XMLHttpRequest API, and will not work in
          // browsers.  It is a stable node-xhr2 API.
          // @param {Object} options one or more of the options below
          // @option options {?http.Agent} httpAgent the default value for the
          //   nodejsHttpAgent property (the agent used for HTTP requests)
          // @option options {https.Agent} httpsAgent the default value for the
          //   nodejsHttpsAgent property (the agent used for HTTPS requests)
          // @return {undefined} undefined
          // @see XMLHttpRequest.nodejsSet
          static nodejsSet(options) {
            XMLHttpRequest2.prototype.nodejsSet(options);
            return void 0;
          }
          // Sets the readyState property and fires the readystatechange event.
          // @private
          // @param {Number} newReadyState the new value of readyState
          // @return {undefined} undefined
          _setReadyState(newReadyState) {
            var event;
            this.readyState = newReadyState;
            event = new ProgressEvent("readystatechange");
            this.dispatchEvent(event);
            return void 0;
          }
          // XMLHttpRequest#send() implementation for the file: protocol.
          // @private
          _sendFile() {
            if (this._url.method !== "GET") {
              throw new NetworkError("The file protocol only supports GET");
            }
            throw new Error("Protocol file: not implemented");
          }
          // XMLHttpRequest#send() implementation for the http: and https: protocols.
          // @private
          // This method sets the instance variables and calls _sendHxxpRequest(), which
          // is responsible for building a node.js request and firing it off. The code
          // in _sendHxxpRequest() is separated off so it can be reused when handling
          // redirects.
          // @see http://www.w3.org/TR/XMLHttpRequest/#infrastructure-for-the-send()-method
          _sendHttp(data) {
            if (this._sync) {
              throw new Error("Synchronous XHR processing not implemented");
            }
            if (data != null && (this._method === "GET" || this._method === "HEAD")) {
              console.warn(`Discarding entity body for ${this._method} requests`);
              data = null;
            } else {
              data || (data = "");
            }
            this.upload._setData(data);
            this._finalizeHeaders();
            this._sendHxxpRequest();
            return void 0;
          }
          // Sets up and fires off a HTTP/HTTPS request using the node.js API.
          // @private
          // This method contains the bulk of the XMLHttpRequest#send() implementation,
          // and is also used to issue new HTTP requests when handling HTTP redirects.
          // @see http://www.w3.org/TR/XMLHttpRequest/#infrastructure-for-the-send()-method
          _sendHxxpRequest() {
            var agent, hxxp, request2;
            if (this._url.protocol === "http:") {
              hxxp = http;
              agent = this.nodejsHttpAgent;
            } else {
              hxxp = https;
              agent = this.nodejsHttpsAgent;
            }
            request2 = hxxp.request({
              hostname: this._url.hostname,
              port: this._url.port,
              path: this._url.path,
              auth: this._url.auth,
              method: this._method,
              headers: this._headers,
              agent
            });
            this._request = request2;
            if (this.timeout) {
              request2.setTimeout(this.timeout, () => {
                return this._onHttpTimeout(request2);
              });
            }
            request2.on("response", (response) => {
              return this._onHttpResponse(request2, response);
            });
            request2.on("error", (error3) => {
              return this._onHttpRequestError(request2, error3);
            });
            this.upload._startUpload(request2);
            if (this._request === request2) {
              this._dispatchProgress("loadstart");
            }
            return void 0;
          }
          // Fills in the restricted HTTP headers with default values.
          // This is called right before the HTTP request is sent off.
          // @private
          // @return {undefined} undefined
          _finalizeHeaders() {
            var base;
            this._headers["Connection"] = "keep-alive";
            this._headers["Host"] = this._url.host;
            if (this._anonymous) {
              this._headers["Referer"] = "about:blank";
            }
            (base = this._headers)["User-Agent"] || (base["User-Agent"] = this._userAgent);
            this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
            return void 0;
          }
          // Called when the headers of an HTTP response have been received.
          // @private
          // @param {http.ClientRequest} request the node.js ClientRequest instance that
          //   produced this response
          // @param {http.ClientResponse} response the node.js ClientResponse instance
          //   passed to
          _onHttpResponse(request2, response) {
            var lengthString;
            if (this._request !== request2) {
              return;
            }
            switch (response.statusCode) {
              case 301:
              case 302:
              case 303:
              case 307:
              case 308:
                this._url = this._parseUrl(response.headers["location"]);
                this._method = "GET";
                if ("content-type" in this._loweredHeaders) {
                  delete this._headers[this._loweredHeaders["content-type"]];
                  delete this._loweredHeaders["content-type"];
                }
                if ("Content-Type" in this._headers) {
                  delete this._headers["Content-Type"];
                }
                delete this._headers["Content-Length"];
                this.upload._reset();
                this._finalizeHeaders();
                this._sendHxxpRequest();
                return;
            }
            this._response = response;
            this._response.on("data", (data) => {
              return this._onHttpResponseData(response, data);
            });
            this._response.on("end", () => {
              return this._onHttpResponseEnd(response);
            });
            this._response.on("close", () => {
              return this._onHttpResponseClose(response);
            });
            this.responseURL = this._url.href.split("#")[0];
            this.status = this._response.statusCode;
            this.statusText = http.STATUS_CODES[this.status];
            this._parseResponseHeaders(response);
            if (lengthString = this._responseHeaders["content-length"]) {
              this._totalBytes = parseInt(lengthString);
              this._lengthComputable = true;
            } else {
              this._lengthComputable = false;
            }
            return this._setReadyState(XMLHttpRequest2.HEADERS_RECEIVED);
          }
          // Called when some data has been received on a HTTP connection.
          // @private
          // @param {http.ClientResponse} response the node.js ClientResponse instance
          //   that fired this event
          // @param {String, Buffer} data the data that has been received
          _onHttpResponseData(response, data) {
            if (this._response !== response) {
              return;
            }
            this._responseParts.push(data);
            this._loadedBytes += data.length;
            if (this.readyState !== XMLHttpRequest2.LOADING) {
              this._setReadyState(XMLHttpRequest2.LOADING);
            }
            return this._dispatchProgress("progress");
          }
          // Called when the HTTP request finished processing.
          // @private
          // @param {http.ClientResponse} response the node.js ClientResponse instance
          //   that fired this event
          _onHttpResponseEnd(response) {
            if (this._response !== response) {
              return;
            }
            this._parseResponse();
            this._request = null;
            this._response = null;
            this._setReadyState(XMLHttpRequest2.DONE);
            this._dispatchProgress("load");
            return this._dispatchProgress("loadend");
          }
          // Called when the underlying HTTP connection was closed prematurely.
          // If this method is called, it will be called after or instead of
          // onHttpResponseEnd.
          // @private
          // @param {http.ClientResponse} response the node.js ClientResponse instance
          //   that fired this event
          _onHttpResponseClose(response) {
            var request2;
            if (this._response !== response) {
              return;
            }
            request2 = this._request;
            this._setError();
            request2.abort();
            this._setReadyState(XMLHttpRequest2.DONE);
            this._dispatchProgress("error");
            return this._dispatchProgress("loadend");
          }
          // Called when the timeout set on the HTTP socket expires.
          // @private
          // @param {http.ClientRequest} request the node.js ClientRequest instance that
          //   fired this event
          _onHttpTimeout(request2) {
            if (this._request !== request2) {
              return;
            }
            this._setError();
            request2.abort();
            this._setReadyState(XMLHttpRequest2.DONE);
            this._dispatchProgress("timeout");
            return this._dispatchProgress("loadend");
          }
          // Called when something wrong happens on the HTTP socket
          // @private
          // @param {http.ClientRequest} request the node.js ClientRequest instance that
          //   fired this event
          // @param {Error} error emitted exception
          _onHttpRequestError(request2, error3) {
            if (this._request !== request2) {
              return;
            }
            this._setError();
            request2.abort();
            this._setReadyState(XMLHttpRequest2.DONE);
            this._dispatchProgress("error");
            return this._dispatchProgress("loadend");
          }
          // Fires an XHR progress event.
          // @private
          // @param {String} eventType one of the XHR progress event types, such as
          //   'load' and 'progress'
          _dispatchProgress(eventType) {
            var event;
            event = new ProgressEvent(eventType);
            event.lengthComputable = this._lengthComputable;
            event.loaded = this._loadedBytes;
            event.total = this._totalBytes;
            this.dispatchEvent(event);
            return void 0;
          }
          // Sets up the XHR to reflect the fact that an error has occurred.
          // The possible errors are a network error, a timeout, or an abort.
          // @private
          _setError() {
            this._request = null;
            this._response = null;
            this._responseHeaders = null;
            this._responseParts = null;
            return void 0;
          }
          // Parses a request URL string.
          // @private
          // This method is a thin wrapper around url.parse() that normalizes HTTP
          // user/password credentials. It is used to parse the URL string passed to
          // XMLHttpRequest#open() and the URLs in the Location headers of HTTP redirect
          // responses.
          // @param {String} urlString the URL to be parsed
          // @return {Object} parsed URL
          _parseUrl(urlString) {
            var absoluteUrlString, index3, password, user, xhrUrl;
            if (this.nodejsBaseUrl === null) {
              absoluteUrlString = urlString;
            } else {
              absoluteUrlString = url.resolve(this.nodejsBaseUrl, urlString);
            }
            xhrUrl = url.parse(absoluteUrlString, false, true);
            xhrUrl.hash = null;
            if (xhrUrl.auth && (typeof user !== "undefined" && user !== null || typeof password !== "undefined" && password !== null)) {
              index3 = xhrUrl.auth.indexOf(":");
              if (index3 === -1) {
                if (!user) {
                  user = xhrUrl.auth;
                }
              } else {
                if (!user) {
                  user = xhrUrl.substring(0, index3);
                }
                if (!password) {
                  password = xhrUrl.substring(index3 + 1);
                }
              }
            }
            if (user || password) {
              xhrUrl.auth = `${user}:${password}`;
            }
            return xhrUrl;
          }
          // Reads the headers from a node.js ClientResponse instance.
          // @private
          // @param {http.ClientResponse} response the response whose headers will be
          //   imported into this XMLHttpRequest's state
          // @return {undefined} undefined
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
          // @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
          _parseResponseHeaders(response) {
            var loweredName, name3, ref, value2;
            this._responseHeaders = {};
            ref = response.headers;
            for (name3 in ref) {
              value2 = ref[name3];
              loweredName = name3.toLowerCase();
              if (this._privateHeaders[loweredName]) {
                continue;
              }
              if (this._mimeOverride !== null && loweredName === "content-type") {
                value2 = this._mimeOverride;
              }
              this._responseHeaders[loweredName] = value2;
            }
            if (this._mimeOverride !== null && !("content-type" in this._responseHeaders)) {
              this._responseHeaders["content-type"] = this._mimeOverride;
            }
            return void 0;
          }
          // Sets the response and responseText properties when an XHR completes.
          // @private
          // @return {undefined} undefined
          _parseResponse() {
            var arrayBuffer, buffer, i, j, jsonError, ref, view;
            if (Buffer.concat) {
              buffer = Buffer.concat(this._responseParts);
            } else {
              buffer = this._concatBuffers(this._responseParts);
            }
            this._responseParts = null;
            switch (this.responseType) {
              case "text":
                this._parseTextResponse(buffer);
                break;
              case "json":
                this.responseText = null;
                try {
                  this.response = JSON.parse(buffer.toString("utf-8"));
                } catch (error1) {
                  jsonError = error1;
                  this.response = null;
                }
                break;
              case "buffer":
                this.responseText = null;
                this.response = buffer;
                break;
              case "arraybuffer":
                this.responseText = null;
                arrayBuffer = new ArrayBuffer(buffer.length);
                view = new Uint8Array(arrayBuffer);
                for (i = j = 0, ref = buffer.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                  view[i] = buffer[i];
                }
                this.response = arrayBuffer;
                break;
              default:
                this._parseTextResponse(buffer);
            }
            return void 0;
          }
          // Sets response and responseText for a 'text' response type.
          // @private
          // @param {Buffer} buffer the node.js Buffer containing the binary response
          // @return {undefined} undefined
          _parseTextResponse(buffer) {
            var e;
            try {
              this.responseText = buffer.toString(this._parseResponseEncoding());
            } catch (error1) {
              e = error1;
              this.responseText = buffer.toString("binary");
            }
            this.response = this.responseText;
            return void 0;
          }
          // Figures out the string encoding of the XHR's response.
          // This is called to determine the encoding when responseText is set.
          // @private
          // @return {String} a string encoding, e.g. 'utf-8'
          _parseResponseEncoding() {
            var contentType, encoding, match;
            encoding = null;
            if (contentType = this._responseHeaders["content-type"]) {
              if (match = /\;\s*charset\=(.*)$/.exec(contentType)) {
                return match[1];
              }
            }
            return "utf-8";
          }
          // Buffer.concat implementation for node 0.6.
          // @private
          // @param {Array<Buffer>} buffers the buffers whose contents will be merged
          // @return {Buffer} same as Buffer.concat(buffers) in node 0.8 and above
          _concatBuffers(buffers) {
            var buffer, j, k, len, len1, length4, target;
            if (buffers.length === 0) {
              return Buffer.alloc(0);
            }
            if (buffers.length === 1) {
              return buffers[0];
            }
            length4 = 0;
            for (j = 0, len = buffers.length; j < len; j++) {
              buffer = buffers[j];
              length4 += buffer.length;
            }
            target = Buffer.alloc(length4);
            length4 = 0;
            for (k = 0, len1 = buffers.length; k < len1; k++) {
              buffer = buffers[k];
              buffer.copy(target, length4);
              length4 += buffer.length;
            }
            return target;
          }
        }
        ;
        XMLHttpRequest2.prototype.onreadystatechange = null;
        XMLHttpRequest2.prototype.readyState = null;
        XMLHttpRequest2.prototype.response = null;
        XMLHttpRequest2.prototype.responseText = null;
        XMLHttpRequest2.prototype.responseType = null;
        XMLHttpRequest2.prototype.status = null;
        XMLHttpRequest2.prototype.timeout = null;
        XMLHttpRequest2.prototype.upload = null;
        XMLHttpRequest2.prototype.UNSENT = 0;
        XMLHttpRequest2.UNSENT = 0;
        XMLHttpRequest2.prototype.OPENED = 1;
        XMLHttpRequest2.OPENED = 1;
        XMLHttpRequest2.prototype.HEADERS_RECEIVED = 2;
        XMLHttpRequest2.HEADERS_RECEIVED = 2;
        XMLHttpRequest2.prototype.LOADING = 3;
        XMLHttpRequest2.LOADING = 3;
        XMLHttpRequest2.prototype.DONE = 4;
        XMLHttpRequest2.DONE = 4;
        XMLHttpRequest2.prototype.nodejsHttpAgent = http.globalAgent;
        XMLHttpRequest2.prototype.nodejsHttpsAgent = https.globalAgent;
        XMLHttpRequest2.prototype.nodejsBaseUrl = null;
        XMLHttpRequest2.prototype._restrictedMethods = {
          CONNECT: true,
          TRACE: true,
          TRACK: true
        };
        XMLHttpRequest2.prototype._restrictedHeaders = {
          "accept-charset": true,
          "accept-encoding": true,
          "access-control-request-headers": true,
          "access-control-request-method": true,
          connection: true,
          "content-length": true,
          cookie: true,
          cookie2: true,
          date: true,
          dnt: true,
          expect: true,
          host: true,
          "keep-alive": true,
          origin: true,
          referer: true,
          te: true,
          trailer: true,
          "transfer-encoding": true,
          upgrade: true,
          via: true
        };
        XMLHttpRequest2.prototype._privateHeaders = {
          "set-cookie": true,
          "set-cookie2": true
        };
        XMLHttpRequest2.prototype._userAgent = `Mozilla/5.0 (${os.type()} ${os.arch()}) node.js/${process.versions.node} v8/${process.versions.v8}`;
        return XMLHttpRequest2;
      }.call(this);
      module.exports = XMLHttpRequest;
      XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
      SecurityError = class SecurityError extends Error {
        // @private
        constructor() {
          super();
        }
      };
      XMLHttpRequest.SecurityError = SecurityError;
      InvalidStateError = class InvalidStateError extends Error {
        // @private
        constructor() {
          super();
        }
      };
      InvalidStateError = class InvalidStateError extends Error {
      };
      XMLHttpRequest.InvalidStateError = InvalidStateError;
      NetworkError = class NetworkError extends Error {
        // @private
        constructor() {
          super();
        }
      };
      XMLHttpRequest.SyntaxError = SyntaxError;
      SyntaxError = class SyntaxError extends Error {
        // @private:
        constructor() {
          super();
        }
      };
      ProgressEvent = function() {
        class ProgressEvent2 {
          // Creates a new event.
          // @param {String} type the event type, e.g. 'readystatechange'; must be
          //   lowercased
          constructor(type) {
            this.type = type;
            this.target = null;
            this.currentTarget = null;
            this.lengthComputable = false;
            this.loaded = 0;
            this.total = 0;
          }
        }
        ;
        ProgressEvent2.prototype.bubbles = false;
        ProgressEvent2.prototype.cancelable = false;
        ProgressEvent2.prototype.target = null;
        ProgressEvent2.prototype.loaded = null;
        ProgressEvent2.prototype.lengthComputable = null;
        ProgressEvent2.prototype.total = null;
        return ProgressEvent2;
      }.call(this);
      XMLHttpRequest.ProgressEvent = ProgressEvent;
      XMLHttpRequestUpload = class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
        // @private
        // @param {XMLHttpRequest} the XMLHttpRequest that this upload object is
        //   associated with
        constructor(request2) {
          super();
          this._request = request2;
          this._reset();
        }
        // Sets up this Upload to handle a new request.
        // @private
        // @return {undefined} undefined
        _reset() {
          this._contentType = null;
          this._body = null;
          return void 0;
        }
        // Implements the upload-related part of the send() XHR specification.
        // @private
        // @param {?String, ?Buffer, ?ArrayBufferView} data the argument passed to
        //   XMLHttpRequest#send()
        // @return {undefined} undefined
        // @see step 4 of http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
        _setData(data) {
          var body, i, j, k, offset, ref, ref1, view;
          if (typeof data === "undefined" || data === null) {
            return;
          }
          if (typeof data === "string") {
            if (data.length !== 0) {
              this._contentType = "text/plain;charset=UTF-8";
            }
            this._body = Buffer.from(data, "utf8");
          } else if (Buffer.isBuffer(data)) {
            this._body = data;
          } else if (data instanceof ArrayBuffer) {
            body = Buffer.alloc(data.byteLength);
            view = new Uint8Array(data);
            for (i = j = 0, ref = data.byteLength; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              body[i] = view[i];
            }
            this._body = body;
          } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
            body = Buffer.alloc(data.byteLength);
            offset = data.byteOffset;
            view = new Uint8Array(data.buffer);
            for (i = k = 0, ref1 = data.byteLength; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
              body[i] = view[i + offset];
            }
            this._body = body;
          } else {
            throw new Error(`Unsupported send() data ${data}`);
          }
          return void 0;
        }
        // Updates the HTTP headers right before the request is sent.
        // This is used to set data-dependent headers such as Content-Length and
        // Content-Type.
        // @private
        // @param {Object<String, String>} headers the HTTP headers to be sent
        // @param {Object<String, String>} loweredHeaders maps lowercased HTTP header
        //   names (e.g., 'content-type') to the actual names used in the headers
        //   parameter (e.g., 'Content-Type')
        // @return {undefined} undefined
        _finalizeHeaders(headers, loweredHeaders) {
          if (this._contentType) {
            if (!("content-type" in loweredHeaders)) {
              headers["Content-Type"] = this._contentType;
            }
          }
          if (this._body) {
            headers["Content-Length"] = this._body.length.toString();
          }
          return void 0;
        }
        // Starts sending the HTTP request data.
        // @private
        // @param {http.ClientRequest} request the HTTP request
        // @return {undefined} undefined
        _startUpload(request2) {
          if (this._body) {
            request2.write(this._body);
          }
          request2.end();
          return void 0;
        }
      };
      XMLHttpRequest.XMLHttpRequestUpload = XMLHttpRequestUpload;
    }).call(exports);
  }
});

// output/Affjax/foreign.js
function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options) {
  return function(errback, callback) {
    var xhr = platformSpecificDriver.newXHR();
    var fixedUrl = platformSpecificDriver.fixupUrl(options.url, xhr);
    xhr.open(options.method || "GET", fixedUrl, true, options.username, options.password);
    if (options.headers) {
      try {
        for (var i = 0, header; (header = options.headers[i]) != null; i++) {
          xhr.setRequestHeader(header.field, header.value);
        }
      } catch (e) {
        errback(e);
      }
    }
    var onerror = function(msgIdent) {
      return function() {
        errback(new Error(msgIdent));
      };
    };
    xhr.onerror = onerror(requestFailedMessageIdent);
    xhr.ontimeout = onerror(timeoutErrorMessageIdent);
    xhr.onload = function() {
      callback({
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header2) {
          return header2.length > 0;
        }).map(function(header2) {
          var i2 = header2.indexOf(":");
          return mkHeader(header2.substring(0, i2))(header2.substring(i2 + 2));
        }),
        body: xhr.response
      });
    };
    xhr.responseType = options.responseType;
    xhr.withCredentials = options.withCredentials;
    xhr.timeout = options.timeout;
    xhr.send(options.content);
    return function(error3, cancelErrback, cancelCallback) {
      try {
        xhr.abort();
      } catch (e) {
        return cancelErrback(e);
      }
      return cancelCallback();
    };
  };
}

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var on = function(f) {
  return function(g) {
    return function(x) {
      return function(y) {
        return f(g(x))(g(y));
      };
    };
  };
};
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};
var applyFlipped = function(x) {
  return function(f) {
    return f(x);
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {
  }
  ;
  $$Proxy2.value = new $$Proxy2();
  return $$Proxy2;
}();

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map12(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var functorArray = {
  map: arrayMap
};

// output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
var unsafeSet = function(label) {
  return function(value2) {
    return function(rec) {
      var copy = {};
      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy[key] = rec[key];
        }
      }
      copy[label] = value2;
      return copy;
    };
  };
};

// output/Data.Semigroup/index.js
var append = function(dict) {
  return dict.append;
};

// output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// output/Control.Apply/index.js
var apply = function(dict) {
  return dict.apply;
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var liftA1 = function(dictApplicative) {
  var apply3 = apply(dictApplicative.Apply0());
  var pure12 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply3(pure12(f))(a);
    };
  };
};

// output/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq4) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq4 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordNumberImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqBooleanImpl = refEq;
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqStringImpl = refEq;

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqRowNil = {
  eqRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return true;
      };
    };
  }
};
var eqRecord = function(dict) {
  return dict.eqRecord;
};
var eqRec = function() {
  return function(dictEqRecord) {
    return {
      eq: eqRecord(dictEqRecord)($$Proxy.value)
    };
  };
};
var eqNumber = {
  eq: eqNumberImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqBoolean = {
  eq: eqBooleanImpl
};
var eq = function(dict) {
  return dict.eq;
};
var eq2 = /* @__PURE__ */ eq(eqBoolean);
var eqRowCons = function(dictEqRecord) {
  var eqRecord1 = eqRecord(dictEqRecord);
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictEq) {
        var eq32 = eq(dictEq);
        return {
          eqRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = eqRecord1($$Proxy.value)(ra)(rb);
                var key = reflectSymbol2($$Proxy.value);
                var get3 = unsafeGet(key);
                return eq32(get3(ra))(get3(rb)) && tail2;
              };
            };
          }
        };
      };
    };
  };
};
var notEq = function(dictEq) {
  var eq32 = eq(dictEq);
  return function(x) {
    return function(y) {
      return eq2(eq32(x)(y))(false);
    };
  };
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();
var eqOrdering = {
  eq: function(v) {
    return function(v1) {
      if (v instanceof LT && v1 instanceof LT) {
        return true;
      }
      ;
      if (v instanceof GT && v1 instanceof GT) {
        return true;
      }
      ;
      if (v instanceof EQ && v1 instanceof EQ) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/Data.Ord/index.js
var eqRec2 = /* @__PURE__ */ eqRec();
var notEq2 = /* @__PURE__ */ notEq(eqOrdering);
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordRecordNil = {
  compareRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return EQ.value;
      };
    };
  },
  EqRecord0: function() {
    return eqRowNil;
  }
};
var ordNumber = /* @__PURE__ */ function() {
  return {
    compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqNumber;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var compareRecord = function(dict) {
  return dict.compareRecord;
};
var ordRecord = function() {
  return function(dictOrdRecord) {
    var eqRec1 = eqRec2(dictOrdRecord.EqRecord0());
    return {
      compare: compareRecord(dictOrdRecord)($$Proxy.value),
      Eq0: function() {
        return eqRec1;
      }
    };
  };
};
var compare = function(dict) {
  return dict.compare;
};
var ordRecordCons = function(dictOrdRecord) {
  var compareRecord1 = compareRecord(dictOrdRecord);
  var eqRowCons3 = eqRowCons(dictOrdRecord.EqRecord0())();
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      var eqRowCons1 = eqRowCons3(dictIsSymbol);
      return function(dictOrd) {
        var compare3 = compare(dictOrd);
        var eqRowCons22 = eqRowCons1(dictOrd.Eq0());
        return {
          compareRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var key = reflectSymbol2($$Proxy.value);
                var left = compare3(unsafeGet(key)(ra))(unsafeGet(key)(rb));
                var $95 = notEq2(left)(EQ.value);
                if ($95) {
                  return left;
                }
                ;
                return compareRecord1($$Proxy.value)(ra)(rb);
              };
            };
          },
          EqRecord0: function() {
            return eqRowCons22;
          }
        };
      };
    };
  };
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showNumberImpl = function(n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};
var showStringImpl = function(s) {
  var l = s.length;
  return '"' + s.replace(
    /[\0-\x1F\x7F"\\]/g,
    // eslint-disable-line no-control-regex
    function(c, i) {
      switch (c) {
        case '"':
        case "\\":
          return "\\" + c;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i + 1;
      var empty4 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty4;
    }
  ) + '"';
};

// output/Data.Show/index.js
var showString = {
  show: showStringImpl
};
var showRecordFields = function(dict) {
  return dict.showRecordFields;
};
var showRecord = function() {
  return function() {
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return {
        show: function(record) {
          return "{" + (showRecordFields1($$Proxy.value)(record) + "}");
        }
      };
    };
  };
};
var showNumber = {
  show: showNumberImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};
var showRecordFieldsCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictShowRecordFields) {
    var showRecordFields1 = showRecordFields(dictShowRecordFields);
    return function(dictShow) {
      var show13 = show(dictShow);
      return {
        showRecordFields: function(v) {
          return function(record) {
            var tail2 = showRecordFields1($$Proxy.value)(record);
            var key = reflectSymbol2($$Proxy.value);
            var focus = unsafeGet(key)(record);
            return " " + (key + (": " + (show13(focus) + ("," + tail2))));
          };
        }
      };
    };
  };
};
var showRecordFieldsConsNil = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictShow) {
    var show13 = show(dictShow);
    return {
      showRecordFields: function(v) {
        return function(record) {
          var key = reflectSymbol2($$Proxy.value);
          var focus = unsafeGet(key)(record);
          return " " + (key + (": " + (show13(focus) + " ")));
        };
      }
    };
  };
};

// output/Data.Maybe/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var map2 = /* @__PURE__ */ map(functorMaybe);
var fromMaybe = function(a) {
  return maybe(a)(identity2);
};
var applyMaybe = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return map2(v.value0)(v1);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var bindMaybe = {
  bind: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Apply0: function() {
    return applyMaybe;
  }
};
var applicativeMaybe = /* @__PURE__ */ function() {
  return {
    pure: Just.create,
    Apply0: function() {
      return applyMaybe;
    }
  };
}();

// output/Data.MediaType.Common/index.js
var applicationJSON = "application/json";
var applicationFormURLEncoded = "application/x-www-form-urlencoded";

// output/Affjax.RequestBody/index.js
var ArrayView = /* @__PURE__ */ function() {
  function ArrayView2(value0) {
    this.value0 = value0;
  }
  ;
  ArrayView2.create = function(value0) {
    return new ArrayView2(value0);
  };
  return ArrayView2;
}();
var Blob = /* @__PURE__ */ function() {
  function Blob3(value0) {
    this.value0 = value0;
  }
  ;
  Blob3.create = function(value0) {
    return new Blob3(value0);
  };
  return Blob3;
}();
var Document = /* @__PURE__ */ function() {
  function Document3(value0) {
    this.value0 = value0;
  }
  ;
  Document3.create = function(value0) {
    return new Document3(value0);
  };
  return Document3;
}();
var $$String = /* @__PURE__ */ function() {
  function $$String3(value0) {
    this.value0 = value0;
  }
  ;
  $$String3.create = function(value0) {
    return new $$String3(value0);
  };
  return $$String3;
}();
var FormData = /* @__PURE__ */ function() {
  function FormData2(value0) {
    this.value0 = value0;
  }
  ;
  FormData2.create = function(value0) {
    return new FormData2(value0);
  };
  return FormData2;
}();
var FormURLEncoded = /* @__PURE__ */ function() {
  function FormURLEncoded2(value0) {
    this.value0 = value0;
  }
  ;
  FormURLEncoded2.create = function(value0) {
    return new FormURLEncoded2(value0);
  };
  return FormURLEncoded2;
}();
var Json = /* @__PURE__ */ function() {
  function Json3(value0) {
    this.value0 = value0;
  }
  ;
  Json3.create = function(value0) {
    return new Json3(value0);
  };
  return Json3;
}();
var toMediaType = function(v) {
  if (v instanceof FormURLEncoded) {
    return new Just(applicationFormURLEncoded);
  }
  ;
  if (v instanceof Json) {
    return new Just(applicationJSON);
  }
  ;
  return Nothing.value;
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var unwrap = function() {
  return coerce2;
};
var alaF = function() {
  return function() {
    return function() {
      return function() {
        return function(v) {
          return coerce2;
        };
      };
    };
  };
};

// output/Affjax.RequestHeader/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var Accept = /* @__PURE__ */ function() {
  function Accept2(value0) {
    this.value0 = value0;
  }
  ;
  Accept2.create = function(value0) {
    return new Accept2(value0);
  };
  return Accept2;
}();
var ContentType = /* @__PURE__ */ function() {
  function ContentType2(value0) {
    this.value0 = value0;
  }
  ;
  ContentType2.create = function(value0) {
    return new ContentType2(value0);
  };
  return ContentType2;
}();
var RequestHeader = /* @__PURE__ */ function() {
  function RequestHeader2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  RequestHeader2.create = function(value0) {
    return function(value1) {
      return new RequestHeader2(value0, value1);
    };
  };
  return RequestHeader2;
}();
var value = function(v) {
  if (v instanceof Accept) {
    return unwrap2(v.value0);
  }
  ;
  if (v instanceof ContentType) {
    return unwrap2(v.value0);
  }
  ;
  if (v instanceof RequestHeader) {
    return v.value1;
  }
  ;
  throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
};
var name = function(v) {
  if (v instanceof Accept) {
    return "Accept";
  }
  ;
  if (v instanceof ContentType) {
    return "Content-Type";
  }
  ;
  if (v instanceof RequestHeader) {
    return v.value0;
  }
  ;
  throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
};

// output/Affjax.ResponseFormat/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var $$ArrayBuffer = /* @__PURE__ */ function() {
  function $$ArrayBuffer2(value0) {
    this.value0 = value0;
  }
  ;
  $$ArrayBuffer2.create = function(value0) {
    return new $$ArrayBuffer2(value0);
  };
  return $$ArrayBuffer2;
}();
var Blob2 = /* @__PURE__ */ function() {
  function Blob3(value0) {
    this.value0 = value0;
  }
  ;
  Blob3.create = function(value0) {
    return new Blob3(value0);
  };
  return Blob3;
}();
var Document2 = /* @__PURE__ */ function() {
  function Document3(value0) {
    this.value0 = value0;
  }
  ;
  Document3.create = function(value0) {
    return new Document3(value0);
  };
  return Document3;
}();
var Json2 = /* @__PURE__ */ function() {
  function Json3(value0) {
    this.value0 = value0;
  }
  ;
  Json3.create = function(value0) {
    return new Json3(value0);
  };
  return Json3;
}();
var $$String2 = /* @__PURE__ */ function() {
  function $$String3(value0) {
    this.value0 = value0;
  }
  ;
  $$String3.create = function(value0) {
    return new $$String3(value0);
  };
  return $$String3;
}();
var Ignore = /* @__PURE__ */ function() {
  function Ignore2(value0) {
    this.value0 = value0;
  }
  ;
  Ignore2.create = function(value0) {
    return new Ignore2(value0);
  };
  return Ignore2;
}();
var toResponseType = function(v) {
  if (v instanceof $$ArrayBuffer) {
    return "arraybuffer";
  }
  ;
  if (v instanceof Blob2) {
    return "blob";
  }
  ;
  if (v instanceof Document2) {
    return "document";
  }
  ;
  if (v instanceof Json2) {
    return "text";
  }
  ;
  if (v instanceof $$String2) {
    return "text";
  }
  ;
  if (v instanceof Ignore) {
    return "";
  }
  ;
  throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
};
var toMediaType2 = function(v) {
  if (v instanceof Json2) {
    return new Just(applicationJSON);
  }
  ;
  return Nothing.value;
};
var json = /* @__PURE__ */ function() {
  return new Json2(identity3);
}();
var ignore = /* @__PURE__ */ function() {
  return new Ignore(identity3);
}();

// output/Affjax.ResponseHeader/index.js
var ResponseHeader = /* @__PURE__ */ function() {
  function ResponseHeader2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ResponseHeader2.create = function(value0) {
    return function(value1) {
      return new ResponseHeader2(value0, value1);
    };
  };
  return ResponseHeader2;
}();

// output/Control.Bind/index.js
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var composeKleisliFlipped = function(dictBind) {
  var bindFlipped1 = bindFlipped(dictBind);
  return function(f) {
    return function(g) {
      return function(a) {
        return bindFlipped1(f)(g(a));
      };
    };
  };
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var showEither = function(dictShow) {
  var show5 = show(dictShow);
  return function(dictShow1) {
    var show13 = show(dictShow1);
    return {
      show: function(v) {
        if (v instanceof Left) {
          return "(Left " + (show5(v.value0) + ")");
        }
        ;
        if (v instanceof Right) {
          return "(Right " + (show13(v.value0) + ")");
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 173, column 1 - line 175, column 46): " + [v.constructor.name]);
      }
    };
  };
};
var note = function(a) {
  return maybe(new Left(a))(Right.create);
};
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var map3 = /* @__PURE__ */ map(functorEither);
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var applyEither = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Right) {
        return map3(v.value0)(v1);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorEither;
  }
};
var bindEither = {
  bind: /* @__PURE__ */ either(function(e) {
    return function(v) {
      return new Left(e);
    };
  })(function(a) {
    return function(f) {
      return f(a);
    };
  }),
  Apply0: function() {
    return applyEither;
  }
};
var applicativeEither = /* @__PURE__ */ function() {
  return {
    pure: Right.create,
    Apply0: function() {
      return applyEither;
    }
  };
}();

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind4 = bind(dictMonad.Bind1());
  var pure5 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind4(f)(function(f$prime) {
        return bind4(a)(function(a$prime) {
          return pure5(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Monoid/index.js
var mempty = function(dict) {
  return dict.mempty;
};

// output/Effect/index.js
var $runtime_lazy = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

// output/Effect.Exception/foreign.js
function message(e) {
  return e.message;
}

// output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};
var catchError = function(dict) {
  return dict.catchError;
};
var $$try = function(dictMonadError) {
  var catchError1 = catchError(dictMonadError);
  var Monad0 = dictMonadError.MonadThrow0().Monad0();
  var map8 = map(Monad0.Bind1().Apply0().Functor0());
  var pure5 = pure(Monad0.Applicative0());
  return function(a) {
    return catchError1(map8(Right.create)(a))(function($52) {
      return pure5(Left.create($52));
    });
  };
};

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// output/Data.HeytingAlgebra/foreign.js
var boolConj = function(b1) {
  return function(b2) {
    return b1 && b2;
  };
};
var boolDisj = function(b1) {
  return function(b2) {
    return b1 || b2;
  };
};
var boolNot = function(b) {
  return !b;
};

// output/Data.HeytingAlgebra/index.js
var not = function(dict) {
  return dict.not;
};
var ff = function(dict) {
  return dict.ff;
};
var disj = function(dict) {
  return dict.disj;
};
var heytingAlgebraBoolean = {
  ff: false,
  tt: true,
  implies: function(a) {
    return function(b) {
      return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
  },
  conj: boolConj,
  disj: boolDisj,
  not: boolNot
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var uncurry = function(f) {
  return function(v) {
    return f(v.value0)(v.value1);
  };
};

// output/Effect.Class/index.js
var monadEffectEffect = {
  liftEffect: /* @__PURE__ */ identity(categoryFn),
  Monad0: function() {
    return monadEffect;
  }
};
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Control.Monad.Except.Trans/index.js
var map4 = /* @__PURE__ */ map(functorEither);
var ExceptT = function(x) {
  return x;
};
var runExceptT = function(v) {
  return v;
};
var mapExceptT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorExceptT = function(dictFunctor) {
  var map12 = map(dictFunctor);
  return {
    map: function(f) {
      return mapExceptT(map12(map4(f)));
    }
  };
};
var monadExceptT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeExceptT(dictMonad);
    },
    Bind1: function() {
      return bindExceptT(dictMonad);
    }
  };
};
var bindExceptT = function(dictMonad) {
  var bind4 = bind(dictMonad.Bind1());
  var pure5 = pure(dictMonad.Applicative0());
  return {
    bind: function(v) {
      return function(k) {
        return bind4(v)(either(function($187) {
          return pure5(Left.create($187));
        })(function(a) {
          var v1 = k(a);
          return v1;
        }));
      };
    },
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var applyExceptT = function(dictMonad) {
  var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadExceptT(dictMonad)),
    Functor0: function() {
      return functorExceptT1;
    }
  };
};
var applicativeExceptT = function(dictMonad) {
  return {
    pure: function() {
      var $188 = pure(dictMonad.Applicative0());
      return function($189) {
        return ExceptT($188(Right.create($189)));
      };
    }(),
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var monadThrowExceptT = function(dictMonad) {
  var monadExceptT1 = monadExceptT(dictMonad);
  return {
    throwError: function() {
      var $198 = pure(dictMonad.Applicative0());
      return function($199) {
        return ExceptT($198(Left.create($199)));
      };
    }(),
    Monad0: function() {
      return monadExceptT1;
    }
  };
};
var altExceptT = function(dictSemigroup) {
  var append2 = append(dictSemigroup);
  return function(dictMonad) {
    var Bind1 = dictMonad.Bind1();
    var bind4 = bind(Bind1);
    var pure5 = pure(dictMonad.Applicative0());
    var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
    return {
      alt: function(v) {
        return function(v1) {
          return bind4(v)(function(rm) {
            if (rm instanceof Right) {
              return pure5(new Right(rm.value0));
            }
            ;
            if (rm instanceof Left) {
              return bind4(v1)(function(rn) {
                if (rn instanceof Right) {
                  return pure5(new Right(rn.value0));
                }
                ;
                if (rn instanceof Left) {
                  return pure5(new Left(append2(rm.value0)(rn.value0)));
                }
                ;
                throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
              });
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
          });
        };
      },
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
};

// output/Control.Monad.Except/index.js
var unwrap3 = /* @__PURE__ */ unwrap();
var runExcept = function($3) {
  return unwrap3(runExceptT($3));
};

// output/Data.Argonaut.Core/foreign.js
function id(x) {
  return x;
}
function stringify(j) {
  return JSON.stringify(j);
}
function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
  if (j == null)
    return isNull3();
  else if (typeof j === "boolean")
    return isBool(j);
  else if (typeof j === "number")
    return isNum(j);
  else if (typeof j === "string")
    return isStr(j);
  else if (Object.prototype.toString.call(j) === "[object Array]")
    return isArr(j);
  else
    return isObj(j);
}

// output/Foreign.Object/foreign.js
function _copyST(m) {
  return function() {
    var r = {};
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r[k] = m[k];
      }
    }
    return r;
  };
}
var empty = {};
function runST(f) {
  return f();
}
function _fmapObject(m0, f) {
  var m = {};
  for (var k in m0) {
    if (hasOwnProperty.call(m0, k)) {
      m[k] = f(m0[k]);
    }
  }
  return m;
}
function _mapWithKey(m0, f) {
  var m = {};
  for (var k in m0) {
    if (hasOwnProperty.call(m0, k)) {
      m[k] = f(k)(m0[k]);
    }
  }
  return m;
}
function _foldM(bind4) {
  return function(f) {
    return function(mz) {
      return function(m) {
        var acc = mz;
        function g(k2) {
          return function(z) {
            return f(z)(k2)(m[k2]);
          };
        }
        for (var k in m) {
          if (hasOwnProperty.call(m, k)) {
            acc = bind4(acc)(g(k));
          }
        }
        return acc;
      };
    };
  };
}
function _lookup(no, yes, k, m) {
  return k in m ? yes(m[k]) : no;
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output/Data.Array/foreign.js
var replicateFill = function(count, value2) {
  if (count < 1) {
    return [];
  }
  var result = new Array(count);
  return result.fill(value2);
};
var replicatePolyfill = function(count, value2) {
  var result = [];
  var n = 0;
  for (var i = 0; i < count; i++) {
    result[n++] = value2;
  }
  return result;
};
var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons3(head4, tail2) {
    this.head = head4;
    this.tail = tail2;
  }
  var emptyList = {};
  function curryCons(head4) {
    return function(tail2) {
      return new Cons3(head4, tail2);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr4, xs) {
    return listToArray(foldr4(curryCons)(emptyList)(xs));
  };
}();
var sortByImpl = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2, fromOrdering, xs) {
    var out;
    if (xs.length < 2)
      return xs;
    out = xs.slice(0);
    mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
    return out;
  };
}();

// output/Data.Array.ST/foreign.js
var pushAllImpl = function(as, xs) {
  return xs.push.apply(xs, as);
};
function unsafeFreezeThawImpl(xs) {
  return xs;
}
var unsafeFreezeImpl = unsafeFreezeThawImpl;
function copyImpl(xs) {
  return xs.slice();
}
var thawImpl = copyImpl;
var sortByImpl2 = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare2, fromOrdering, xs) {
    if (xs.length < 2)
      return xs;
    mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
    return xs;
  };
}();

// output/Control.Monad.ST.Uncurried/foreign.js
var runSTFn1 = function runSTFn12(fn) {
  return function(a) {
    return function() {
      return fn(a);
    };
  };
};
var runSTFn2 = function runSTFn22(fn) {
  return function(a) {
    return function(b) {
      return function() {
        return fn(a, b);
      };
    };
  };
};

// output/Data.Array.ST/index.js
var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
var withArray = function(f) {
  return function(xs) {
    return function __do() {
      var result = thaw(xs)();
      f(result)();
      return unsafeFreeze(result)();
    };
  };
};
var push = function(a) {
  return runSTFn2(pushAllImpl)([a]);
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Control.Plus/index.js
var empty2 = function(dict) {
  return dict.empty;
};

// output/Data.Bifunctor/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var bimap = function(dict) {
  return dict.bimap;
};
var lmap = function(dictBifunctor) {
  var bimap1 = bimap(dictBifunctor);
  return function(f) {
    return bimap1(f)(identity4);
  };
};
var bifunctorEither = {
  bimap: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return new Left(v(v2.value0));
        }
        ;
        if (v2 instanceof Right) {
          return new Right(v1(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  }
};

// output/Data.Monoid.Disj/index.js
var Disj = function(x) {
  return x;
};
var semigroupDisj = function(dictHeytingAlgebra) {
  var disj2 = disj(dictHeytingAlgebra);
  return {
    append: function(v) {
      return function(v1) {
        return disj2(v)(v1);
      };
    }
  };
};
var monoidDisj = function(dictHeytingAlgebra) {
  var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
  return {
    mempty: ff(dictHeytingAlgebra),
    Semigroup0: function() {
      return semigroupDisj1;
    }
  };
};

// output/Data.Foldable/index.js
var alaF2 = /* @__PURE__ */ alaF()()()();
var foldr = function(dict) {
  return dict.foldr;
};
var foldl = function(dict) {
  return dict.foldl;
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append2(f(x))(acc);
        };
      })(mempty2);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};
var any = function(dictFoldable) {
  var foldMap22 = foldMap(dictFoldable);
  return function(dictHeytingAlgebra) {
    return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
  };
};

// output/Data.Function.Uncurried/foreign.js
var runFn3 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return fn(a, b, c);
      };
    };
  };
};
var runFn4 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply3) {
    return function(map8) {
      return function(pure5) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure5([]);
                case 1:
                  return map8(array1)(f(array[bot]));
                case 2:
                  return apply3(map8(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply3(apply3(map8(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply3(map8(concat2)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse22 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse22(dictApplicative)(identity5);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};

// output/Data.Array/index.js
var snoc = function(xs) {
  return function(x) {
    return withArray(push(x))(xs)();
  };
};

// output/Data.TraversableWithIndex/index.js
var traverseWithIndex = function(dict) {
  return dict.traverseWithIndex;
};

// output/Foreign.Object.ST/foreign.js
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}

// output/Foreign.Object/index.js
var foldr2 = /* @__PURE__ */ foldr(foldableArray);
var identity6 = /* @__PURE__ */ identity(categoryFn);
var values = /* @__PURE__ */ toArrayWithKey(function(v) {
  return function(v1) {
    return v1;
  };
});
var thawST = _copyST;
var mutate = function(f) {
  return function(m) {
    return runST(function __do() {
      var s = thawST(m)();
      f(s)();
      return s;
    });
  };
};
var mapWithKey = function(f) {
  return function(m) {
    return _mapWithKey(m, f);
  };
};
var lookup = /* @__PURE__ */ function() {
  return runFn4(_lookup)(Nothing.value)(Just.create);
}();
var insert = function(k) {
  return function(v) {
    return mutate(poke2(k)(v));
  };
};
var functorObject = {
  map: function(f) {
    return function(m) {
      return _fmapObject(m, f);
    };
  }
};
var functorWithIndexObject = {
  mapWithIndex: mapWithKey,
  Functor0: function() {
    return functorObject;
  }
};
var fold2 = /* @__PURE__ */ _foldM(applyFlipped);
var foldMap2 = function(dictMonoid) {
  var append12 = append(dictMonoid.Semigroup0());
  var mempty2 = mempty(dictMonoid);
  return function(f) {
    return fold2(function(acc) {
      return function(k) {
        return function(v) {
          return append12(acc)(f(k)(v));
        };
      };
    })(mempty2);
  };
};
var foldableObject = {
  foldl: function(f) {
    return fold2(function(z) {
      return function(v) {
        return f(z);
      };
    });
  },
  foldr: function(f) {
    return function(z) {
      return function(m) {
        return foldr2(f)(z)(values(m));
      };
    };
  },
  foldMap: function(dictMonoid) {
    var foldMap12 = foldMap2(dictMonoid);
    return function(f) {
      return foldMap12($$const(f));
    };
  }
};
var foldableWithIndexObject = {
  foldlWithIndex: function(f) {
    return fold2(flip(f));
  },
  foldrWithIndex: function(f) {
    return function(z) {
      return function(m) {
        return foldr2(uncurry(f))(z)(toArrayWithKey(Tuple.create)(m));
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    return foldMap2(dictMonoid);
  },
  Foldable0: function() {
    return foldableObject;
  }
};
var traversableWithIndexObject = {
  traverseWithIndex: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    var apply3 = apply(Apply0);
    var map8 = map(Apply0.Functor0());
    var pure12 = pure(dictApplicative);
    return function(f) {
      return function(ms) {
        return fold2(function(acc) {
          return function(k) {
            return function(v) {
              return apply3(map8(flip(insert(k)))(acc))(f(k)(v));
            };
          };
        })(pure12(empty))(ms);
      };
    };
  },
  FunctorWithIndex0: function() {
    return functorWithIndexObject;
  },
  FoldableWithIndex1: function() {
    return foldableWithIndexObject;
  },
  Traversable2: function() {
    return traversableObject;
  }
};
var traversableObject = {
  traverse: function(dictApplicative) {
    var $96 = traverseWithIndex(traversableWithIndexObject)(dictApplicative);
    return function($97) {
      return $96($$const($97));
    };
  },
  sequence: function(dictApplicative) {
    return traverse(traversableObject)(dictApplicative)(identity6);
  },
  Functor0: function() {
    return functorObject;
  },
  Foldable1: function() {
    return foldableObject;
  }
};

// output/Data.Argonaut.Core/index.js
var verbJsonType = function(def) {
  return function(f) {
    return function(g) {
      return g(def)(f);
    };
  };
};
var toJsonType = /* @__PURE__ */ function() {
  return verbJsonType(Nothing.value)(Just.create);
}();
var jsonEmptyObject = /* @__PURE__ */ id(empty);
var caseJsonString = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
    };
  };
};
var caseJsonObject = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
    };
  };
};
var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
var caseJsonNumber = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
    };
  };
};

// output/Data.Argonaut.Parser/foreign.js
function _jsonParser(fail3, succ, s) {
  try {
    return succ(JSON.parse(s));
  } catch (e) {
    return fail3(e.message);
  }
}

// output/Data.Argonaut.Parser/index.js
var jsonParser = function(j) {
  return _jsonParser(Left.create, Right.create, j);
};

// output/Data.String.Common/foreign.js
var joinWith = function(s) {
  return function(xs) {
    return xs.join(s);
  };
};

// output/JSURI/foreign.js
function encodeURIComponent_to_RFC3986(input) {
  return input.replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
function _encodeFormURLComponent(fail3, succeed, input) {
  try {
    return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input)).replace(/%20/g, "+"));
  } catch (err) {
    return fail3(err);
  }
}

// output/JSURI/index.js
var encodeFormURLComponent = /* @__PURE__ */ function() {
  return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
}();

// output/Data.FormURLEncoded/index.js
var apply2 = /* @__PURE__ */ apply(applyMaybe);
var map5 = /* @__PURE__ */ map(functorMaybe);
var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
var toArray = function(v) {
  return v;
};
var encode = /* @__PURE__ */ function() {
  var encodePart = function(v) {
    if (v.value1 instanceof Nothing) {
      return encodeFormURLComponent(v.value0);
    }
    ;
    if (v.value1 instanceof Just) {
      return apply2(map5(function(key) {
        return function(val) {
          return key + ("=" + val);
        };
      })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
    }
    ;
    throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
  };
  var $37 = map5(joinWith("&"));
  var $38 = traverse2(encodePart);
  return function($39) {
    return $37($38(toArray($39)));
  };
}();

// output/Data.HTTP.Method/index.js
var OPTIONS = /* @__PURE__ */ function() {
  function OPTIONS2() {
  }
  ;
  OPTIONS2.value = new OPTIONS2();
  return OPTIONS2;
}();
var GET = /* @__PURE__ */ function() {
  function GET2() {
  }
  ;
  GET2.value = new GET2();
  return GET2;
}();
var HEAD = /* @__PURE__ */ function() {
  function HEAD2() {
  }
  ;
  HEAD2.value = new HEAD2();
  return HEAD2;
}();
var POST = /* @__PURE__ */ function() {
  function POST2() {
  }
  ;
  POST2.value = new POST2();
  return POST2;
}();
var PUT = /* @__PURE__ */ function() {
  function PUT2() {
  }
  ;
  PUT2.value = new PUT2();
  return PUT2;
}();
var DELETE = /* @__PURE__ */ function() {
  function DELETE2() {
  }
  ;
  DELETE2.value = new DELETE2();
  return DELETE2;
}();
var TRACE = /* @__PURE__ */ function() {
  function TRACE2() {
  }
  ;
  TRACE2.value = new TRACE2();
  return TRACE2;
}();
var CONNECT = /* @__PURE__ */ function() {
  function CONNECT2() {
  }
  ;
  CONNECT2.value = new CONNECT2();
  return CONNECT2;
}();
var PROPFIND = /* @__PURE__ */ function() {
  function PROPFIND2() {
  }
  ;
  PROPFIND2.value = new PROPFIND2();
  return PROPFIND2;
}();
var PROPPATCH = /* @__PURE__ */ function() {
  function PROPPATCH2() {
  }
  ;
  PROPPATCH2.value = new PROPPATCH2();
  return PROPPATCH2;
}();
var MKCOL = /* @__PURE__ */ function() {
  function MKCOL2() {
  }
  ;
  MKCOL2.value = new MKCOL2();
  return MKCOL2;
}();
var COPY = /* @__PURE__ */ function() {
  function COPY2() {
  }
  ;
  COPY2.value = new COPY2();
  return COPY2;
}();
var MOVE = /* @__PURE__ */ function() {
  function MOVE2() {
  }
  ;
  MOVE2.value = new MOVE2();
  return MOVE2;
}();
var LOCK = /* @__PURE__ */ function() {
  function LOCK2() {
  }
  ;
  LOCK2.value = new LOCK2();
  return LOCK2;
}();
var UNLOCK = /* @__PURE__ */ function() {
  function UNLOCK2() {
  }
  ;
  UNLOCK2.value = new UNLOCK2();
  return UNLOCK2;
}();
var PATCH = /* @__PURE__ */ function() {
  function PATCH2() {
  }
  ;
  PATCH2.value = new PATCH2();
  return PATCH2;
}();
var unCustomMethod = function(v) {
  return v;
};
var showMethod = {
  show: function(v) {
    if (v instanceof OPTIONS) {
      return "OPTIONS";
    }
    ;
    if (v instanceof GET) {
      return "GET";
    }
    ;
    if (v instanceof HEAD) {
      return "HEAD";
    }
    ;
    if (v instanceof POST) {
      return "POST";
    }
    ;
    if (v instanceof PUT) {
      return "PUT";
    }
    ;
    if (v instanceof DELETE) {
      return "DELETE";
    }
    ;
    if (v instanceof TRACE) {
      return "TRACE";
    }
    ;
    if (v instanceof CONNECT) {
      return "CONNECT";
    }
    ;
    if (v instanceof PROPFIND) {
      return "PROPFIND";
    }
    ;
    if (v instanceof PROPPATCH) {
      return "PROPPATCH";
    }
    ;
    if (v instanceof MKCOL) {
      return "MKCOL";
    }
    ;
    if (v instanceof COPY) {
      return "COPY";
    }
    ;
    if (v instanceof MOVE) {
      return "MOVE";
    }
    ;
    if (v instanceof LOCK) {
      return "LOCK";
    }
    ;
    if (v instanceof UNLOCK) {
      return "UNLOCK";
    }
    ;
    if (v instanceof PATCH) {
      return "PATCH";
    }
    ;
    throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
  }
};
var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton3 = function(dictPlus) {
  var empty4 = empty2(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty4);
  };
};

// output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil3() {
  }
  ;
  Nil3.value = new Nil3();
  return Nil3;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons3.create = function(value0) {
    return function(value1) {
      return new Cons3(value0, value1);
    };
  };
  return Cons3;
}();
var NonEmptyList = function(x) {
  return x;
};
var toList = function(v) {
  return new Cons(v.value0, v.value1);
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
          $tco_var_v = new Cons(v1, v);
          $copy_v1 = v1.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
            return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
          }
          ;
          if (v2 instanceof Cons && v2.value1 instanceof Nil) {
            return new Cons(f(v2.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v2) {
          return function($copy_v3) {
            var $tco_var_v2 = $copy_v2;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v2, v3) {
              if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                $tco_var_v2 = v2.value1;
                $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                return;
              }
              ;
              $tco_done1 = true;
              return v3;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(v)(unrolledMap(v1));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $284 = foldl(foldableList)(flip(f))(b);
      return function($285) {
        return $284(rev($285));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $286 = append2(acc);
        return function($287) {
          return $286(f($287));
        };
      })(mempty2);
    };
  }
};
var foldr3 = /* @__PURE__ */ foldr(foldableList);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr3(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var semigroupNonEmptyList = {
  append: function(v) {
    return function(as$prime) {
      return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
    };
  }
};
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Data.List.NonEmpty/index.js
var singleton4 = /* @__PURE__ */ function() {
  var $200 = singleton3(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();
var head = function(v) {
  return v.value0;
};

// output/Data.Nullable/foreign.js
var nullImpl = null;
function notNull(x) {
  return x;
}

// output/Data.Nullable/index.js
var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler2(error3) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error3) {
      setTimeout(function() {
        throw error3;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error3) {
      return left(error3);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error3) {
      k(left(error3))();
      return nonCanceler2;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size3 = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size3 !== 0) {
        size3--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size3 === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size3) % limit] = cb;
        size3++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error3) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step2 = aff;
    var fail3 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run3(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step2 = bhead(step2);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail3 = util.left(e);
              step2 = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step2)) {
              status = RETURN;
              fail3 = step2;
              step2 = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step2 = util.fromRight(step2);
            }
            break;
          case CONTINUE:
            switch (step2.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step2._2;
                status = CONTINUE;
                step2 = step2._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step2 = util.right(step2._1);
                } else {
                  status = STEP_BIND;
                  step2 = step2._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step2 = runSync(util.left, util.right, step2._1);
                break;
              case ASYNC:
                status = PENDING;
                step2 = runAsync(util.left, step2._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step2 = result2;
                      run3(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail3 = util.left(step2._1);
                step2 = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step2, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step2 = step2._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step2, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step2 = step2._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step2._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step2._1) {
                  tmp.run();
                }
                step2 = util.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step2 = sequential2(util, supervisor, step2._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step2 = interrupt || fail3 || step2;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail3) {
                    status = CONTINUE;
                    step2 = attempt._2(util.fromLeft(fail3));
                    fail3 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail3) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step2 = util.fromRight(step2);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail3 === null) {
                    result = util.fromRight(step2);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step2 = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail3), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail3) {
                    step2 = attempt._1.failed(util.fromLeft(fail3))(attempt._2);
                  } else {
                    step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                  }
                  fail3 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail3), attempts, interrupt);
                  status = CONTINUE;
                  step2 = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step2 = attempt._1;
                  fail3 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step2));
              }
            }
            joins = null;
            if (interrupt && fail3) {
              setTimeout(function() {
                throw util.fromLeft(fail3);
              }, 0);
            } else if (util.isLeft(step2) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step2);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join3) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step2)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error3, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(void 0));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error3);
            status = COMPLETED;
            step2 = interrupt;
            run3(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error3)), attempts, interrupt);
              }
              status = RETURN;
              step2 = null;
              fail3 = null;
              run3(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step2 = null;
              fail3 = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run3(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join: join2,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run3(runTick);
            });
          } else {
            run3(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error3, par2, cb2) {
      var step2 = par2;
      var head4 = null;
      var tail2 = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step2.tag) {
            case FORKED:
              if (step2._3 === EMPTY) {
                tmp = fibers[step2._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head4 === null) {
                break loop;
              }
              step2 = head4._2;
              if (tail2 === null) {
                head4 = null;
              } else {
                head4 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step2 = step2._2;
              break;
            case APPLY:
            case ALT:
              if (head4) {
                tail2 = new Aff2(CONS, head4, tail2);
              }
              head4 = step2;
              step2 = step2._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join2(result, head4, tail2) {
      var fail3, step2, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail3 = result;
        step2 = null;
      } else {
        step2 = result;
        fail3 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head4 === null) {
            cb(fail3 || step2)();
            return;
          }
          if (head4._3 !== EMPTY) {
            return;
          }
          switch (head4.tag) {
            case MAP:
              if (fail3 === null) {
                head4._3 = util.right(head4._1(util.fromRight(step2)));
                step2 = head4._3;
              } else {
                head4._3 = fail3;
              }
              break;
            case APPLY:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (fail3) {
                head4._3 = fail3;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail3 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(fail3, null, null);
                    } else {
                      join2(fail3, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head4._3 = step2;
              }
              break;
            case ALT:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail3 = step2 === lhs ? rhs : lhs;
                step2 = null;
                head4._3 = fail3;
              } else {
                head4._3 = step2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step2 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(step2, null, null);
                    } else {
                      join2(step2, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head4 = null;
          } else {
            head4 = tail2._1;
            tail2 = tail2._2;
          }
        }
    }
    function resolve(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join2(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run3() {
      var status = CONTINUE;
      var step2 = par;
      var head4 = null;
      var tail2 = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step2.tag) {
                case MAP:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                  step2 = step2._2;
                  break;
                case APPLY:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                  step2 = step2._1;
                  break;
                case ALT:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                  step2 = step2._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step2;
                  step2 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step2)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head4 === null) {
                break loop;
              }
              if (head4._1 === EMPTY) {
                head4._1 = step2;
                status = CONTINUE;
                step2 = head4._2;
                head4._2 = EMPTY;
              } else {
                head4._2 = step2;
                step2 = head4;
                if (tail2 === null) {
                  head4 = null;
                } else {
                  head4 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
      root = step2;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error3, cb2) {
      interrupt = util.left(error3);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error3, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler2;
          };
        });
      };
    }
    run3();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential2(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler2;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _catchError(aff) {
  return function(k) {
    return Aff.Catch(aff, k);
  };
}
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value2) {
        return Aff.Pure(f(value2));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
var makeAff = Aff.Async;
function _makeFiber(util, aff) {
  return function() {
    return Aff.Fiber(util, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output/Effect.Aff/index.js
var $runtime_lazy2 = function(name3, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var functorAff = {
  map: _map
};
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    ;
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    ;
    if (v instanceof Right) {
      return false;
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var pure2 = /* @__PURE__ */ pure(applicativeAff);
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var monadErrorAff = {
  catchError: _catchError,
  MonadThrow0: function() {
    return monadThrowAff;
  }
};
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));

// output/Effect.Aff.Compat/index.js
var fromEffectFnAff = function(v) {
  return makeAff(function(k) {
    return function __do() {
      var v1 = v(function($9) {
        return k(Left.create($9))();
      }, function($10) {
        return k(Right.create($10))();
      });
      return function(e) {
        return makeAff(function(k2) {
          return function __do2() {
            v1(e, function($11) {
              return k2(Left.create($11))();
            }, function($12) {
              return k2(Right.create($12))();
            });
            return nonCanceler;
          };
        });
      };
    };
  });
};

// output/Foreign/foreign.js
function tagOf(value2) {
  return Object.prototype.toString.call(value2).slice(8, -1);
}
var isArray = Array.isArray || function(value2) {
  return Object.prototype.toString.call(value2) === "[object Array]";
};

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};

// output/Data.Int/index.js
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();

// output/Foreign/index.js
var show2 = /* @__PURE__ */ show(showString);
var show1 = /* @__PURE__ */ show(showInt);
var ForeignError = /* @__PURE__ */ function() {
  function ForeignError2(value0) {
    this.value0 = value0;
  }
  ;
  ForeignError2.create = function(value0) {
    return new ForeignError2(value0);
  };
  return ForeignError2;
}();
var TypeMismatch = /* @__PURE__ */ function() {
  function TypeMismatch3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  TypeMismatch3.create = function(value0) {
    return function(value1) {
      return new TypeMismatch3(value0, value1);
    };
  };
  return TypeMismatch3;
}();
var ErrorAtIndex = /* @__PURE__ */ function() {
  function ErrorAtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtIndex2.create = function(value0) {
    return function(value1) {
      return new ErrorAtIndex2(value0, value1);
    };
  };
  return ErrorAtIndex2;
}();
var ErrorAtProperty = /* @__PURE__ */ function() {
  function ErrorAtProperty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ErrorAtProperty2.create = function(value0) {
    return function(value1) {
      return new ErrorAtProperty2(value0, value1);
    };
  };
  return ErrorAtProperty2;
}();
var unsafeToForeign = unsafeCoerce2;
var unsafeFromForeign = unsafeCoerce2;
var renderForeignError = function(v) {
  if (v instanceof ForeignError) {
    return v.value0;
  }
  ;
  if (v instanceof ErrorAtIndex) {
    return "Error at array index " + (show1(v.value0) + (": " + renderForeignError(v.value1)));
  }
  ;
  if (v instanceof ErrorAtProperty) {
    return "Error at property " + (show2(v.value0) + (": " + renderForeignError(v.value1)));
  }
  ;
  if (v instanceof TypeMismatch) {
    return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
  }
  ;
  throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
};
var fail = function(dictMonad) {
  var $153 = throwError(monadThrowExceptT(dictMonad));
  return function($154) {
    return $153(singleton4($154));
  };
};
var unsafeReadTagged = function(dictMonad) {
  var pure12 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(tag) {
    return function(value2) {
      if (tagOf(value2) === tag) {
        return pure12(unsafeFromForeign(value2));
      }
      ;
      if (otherwise) {
        return fail1(new TypeMismatch(tag, tagOf(value2)));
      }
      ;
      throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value2.constructor.name]);
    };
  };
};

// output/Affjax/index.js
var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
var fail2 = /* @__PURE__ */ fail(monadIdentity);
var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
var map6 = /* @__PURE__ */ map(functorMaybe);
var any2 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
var eq3 = /* @__PURE__ */ eq(eqString);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindMaybe);
var map1 = /* @__PURE__ */ map(functorArray);
var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
var pure1 = /* @__PURE__ */ pure(applicativeAff);
var RequestContentError = /* @__PURE__ */ function() {
  function RequestContentError2(value0) {
    this.value0 = value0;
  }
  ;
  RequestContentError2.create = function(value0) {
    return new RequestContentError2(value0);
  };
  return RequestContentError2;
}();
var ResponseBodyError = /* @__PURE__ */ function() {
  function ResponseBodyError2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  ResponseBodyError2.create = function(value0) {
    return function(value1) {
      return new ResponseBodyError2(value0, value1);
    };
  };
  return ResponseBodyError2;
}();
var TimeoutError = /* @__PURE__ */ function() {
  function TimeoutError2() {
  }
  ;
  TimeoutError2.value = new TimeoutError2();
  return TimeoutError2;
}();
var RequestFailedError = /* @__PURE__ */ function() {
  function RequestFailedError2() {
  }
  ;
  RequestFailedError2.value = new RequestFailedError2();
  return RequestFailedError2;
}();
var XHROtherError = /* @__PURE__ */ function() {
  function XHROtherError2(value0) {
    this.value0 = value0;
  }
  ;
  XHROtherError2.create = function(value0) {
    return new XHROtherError2(value0);
  };
  return XHROtherError2;
}();
var request = function(driver2) {
  return function(req) {
    var parseJSON = function(v2) {
      if (v2 === "") {
        return pure3(jsonEmptyObject);
      }
      ;
      return either(function($74) {
        return fail2(ForeignError.create($74));
      })(pure3)(jsonParser(v2));
    };
    var fromResponse = function() {
      if (req.responseFormat instanceof $$ArrayBuffer) {
        return unsafeReadTagged2("ArrayBuffer");
      }
      ;
      if (req.responseFormat instanceof Blob2) {
        return unsafeReadTagged2("Blob");
      }
      ;
      if (req.responseFormat instanceof Document2) {
        return function(x) {
          return alt2(unsafeReadTagged2("Document")(x))(alt2(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
        };
      }
      ;
      if (req.responseFormat instanceof Json2) {
        return composeKleisliFlipped2(function($75) {
          return req.responseFormat.value0(parseJSON($75));
        })(unsafeReadTagged2("String"));
      }
      ;
      if (req.responseFormat instanceof $$String2) {
        return unsafeReadTagged2("String");
      }
      ;
      if (req.responseFormat instanceof Ignore) {
        return $$const(req.responseFormat.value0(pure3(unit)));
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
    }();
    var extractContent = function(v2) {
      if (v2 instanceof ArrayView) {
        return new Right(v2.value0(unsafeToForeign));
      }
      ;
      if (v2 instanceof Blob) {
        return new Right(unsafeToForeign(v2.value0));
      }
      ;
      if (v2 instanceof Document) {
        return new Right(unsafeToForeign(v2.value0));
      }
      ;
      if (v2 instanceof $$String) {
        return new Right(unsafeToForeign(v2.value0));
      }
      ;
      if (v2 instanceof FormData) {
        return new Right(unsafeToForeign(v2.value0));
      }
      ;
      if (v2 instanceof FormURLEncoded) {
        return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map6(unsafeToForeign)(encode(v2.value0)));
      }
      ;
      if (v2 instanceof Json) {
        return new Right(unsafeToForeign(stringify(v2.value0)));
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
    };
    var addHeader = function(mh) {
      return function(hs) {
        if (mh instanceof Just && !any2(on(eq3)(name)(mh.value0))(hs)) {
          return snoc(hs)(mh.value0);
        }
        ;
        return hs;
      };
    };
    var headers = function(reqContent) {
      return addHeader(map6(ContentType.create)(bindFlipped2(toMediaType)(reqContent)))(addHeader(map6(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
    };
    var ajaxRequest = function(v2) {
      return {
        method: print(req.method),
        url: req.url,
        headers: map1(function(h) {
          return {
            field: name(h),
            value: value(h)
          };
        })(headers(req.content)),
        content: v2,
        responseType: toResponseType(req.responseFormat),
        username: toNullable(req.username),
        password: toNullable(req.password),
        withCredentials: req.withCredentials,
        timeout: fromMaybe(0)(map6(function(v1) {
          return v1;
        })(req.timeout))
      };
    };
    var send = function(content) {
      return mapFlipped2($$try2(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content)))))(function(v2) {
        if (v2 instanceof Right) {
          var v1 = runExcept(fromResponse(v2.value0.body));
          if (v1 instanceof Left) {
            return new Left(new ResponseBodyError(head(v1.value0), v2.value0));
          }
          ;
          if (v1 instanceof Right) {
            return new Right({
              body: v1.value0,
              headers: v2.value0.headers,
              status: v2.value0.status,
              statusText: v2.value0.statusText
            });
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
        }
        ;
        if (v2 instanceof Left) {
          return new Left(function() {
            var message2 = message(v2.value0);
            var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
            if ($61) {
              return TimeoutError.value;
            }
            ;
            var $62 = message2 === "AffjaxRequestFailedMessageIdent";
            if ($62) {
              return RequestFailedError.value;
            }
            ;
            return new XHROtherError(v2.value0);
          }());
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
      });
    };
    if (req.content instanceof Nothing) {
      return send(toNullable(Nothing.value));
    }
    ;
    if (req.content instanceof Just) {
      var v = extractContent(req.content.value0);
      if (v instanceof Right) {
        return send(toNullable(new Just(v.value0)));
      }
      ;
      if (v instanceof Left) {
        return pure1(new Left(new RequestContentError(v.value0)));
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
  };
};
var printError = function(v) {
  if (v instanceof RequestContentError) {
    return "There was a problem with the request content: " + v.value0;
  }
  ;
  if (v instanceof ResponseBodyError) {
    return "There was a problem with the response body: " + renderForeignError(v.value0);
  }
  ;
  if (v instanceof TimeoutError) {
    return "There was a problem making the request: timeout";
  }
  ;
  if (v instanceof RequestFailedError) {
    return "There was a problem making the request: request failed";
  }
  ;
  if (v instanceof XHROtherError) {
    return "There was a problem making the request: " + message(v.value0);
  }
  ;
  throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
};
var defaultRequest = /* @__PURE__ */ function() {
  return {
    method: new Left(GET.value),
    url: "/",
    headers: [],
    content: Nothing.value,
    username: Nothing.value,
    password: Nothing.value,
    withCredentials: false,
    responseFormat: ignore,
    timeout: Nothing.value
  };
}();
var get = function(driver2) {
  return function(rf) {
    return function(u) {
      return request(driver2)({
        method: defaultRequest.method,
        url: u,
        headers: defaultRequest.headers,
        content: defaultRequest.content,
        username: defaultRequest.username,
        password: defaultRequest.password,
        withCredentials: defaultRequest.withCredentials,
        responseFormat: rf,
        timeout: defaultRequest.timeout
      });
    };
  };
};

// output/Affjax.Node/foreign.js
var import_xhr2 = __toESM(require_xhr2(), 1);
import urllib from "url";
var driver = {
  newXHR: function() {
    return new import_xhr2.default();
  },
  fixupUrl: function(url, xhr) {
    if (xhr.nodejsBaseUrl === null) {
      var u = urllib.parse(url);
      u.protocol = u.protocol || "http:";
      u.hostname = u.hostname || "localhost";
      return urllib.format(u);
    } else {
      return url || "/";
    }
  }
};

// output/Affjax.Node/index.js
var get2 = /* @__PURE__ */ get(driver);

// output/Data.Argonaut.Decode.Error/index.js
var show3 = /* @__PURE__ */ show(showString);
var show12 = /* @__PURE__ */ show(showInt);
var TypeMismatch2 = /* @__PURE__ */ function() {
  function TypeMismatch3(value0) {
    this.value0 = value0;
  }
  ;
  TypeMismatch3.create = function(value0) {
    return new TypeMismatch3(value0);
  };
  return TypeMismatch3;
}();
var UnexpectedValue = /* @__PURE__ */ function() {
  function UnexpectedValue2(value0) {
    this.value0 = value0;
  }
  ;
  UnexpectedValue2.create = function(value0) {
    return new UnexpectedValue2(value0);
  };
  return UnexpectedValue2;
}();
var AtIndex = /* @__PURE__ */ function() {
  function AtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  AtIndex2.create = function(value0) {
    return function(value1) {
      return new AtIndex2(value0, value1);
    };
  };
  return AtIndex2;
}();
var AtKey = /* @__PURE__ */ function() {
  function AtKey2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  AtKey2.create = function(value0) {
    return function(value1) {
      return new AtKey2(value0, value1);
    };
  };
  return AtKey2;
}();
var Named = /* @__PURE__ */ function() {
  function Named2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Named2.create = function(value0) {
    return function(value1) {
      return new Named2(value0, value1);
    };
  };
  return Named2;
}();
var MissingValue = /* @__PURE__ */ function() {
  function MissingValue2() {
  }
  ;
  MissingValue2.value = new MissingValue2();
  return MissingValue2;
}();
var showJsonDecodeError = {
  show: function(v) {
    if (v instanceof TypeMismatch2) {
      return "(TypeMismatch " + (show3(v.value0) + ")");
    }
    ;
    if (v instanceof UnexpectedValue) {
      return "(UnexpectedValue " + (stringify(v.value0) + ")");
    }
    ;
    if (v instanceof AtIndex) {
      return "(AtIndex " + (show12(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
    }
    ;
    if (v instanceof AtKey) {
      return "(AtKey " + (show3(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
    }
    ;
    if (v instanceof Named) {
      return "(Named " + (show3(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
    }
    ;
    if (v instanceof MissingValue) {
      return "MissingValue";
    }
    ;
    throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 24, column 10 - line 30, column 35): " + [v.constructor.name]);
  }
};

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head4, tail2) {
    this.head = head4;
    this.tail = tail2;
  };
  function finalCell(head4) {
    return new ConsCell(head4, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply3, map8, f) {
    var buildFrom = function(x, ys) {
      return apply3(map8(consList)(f(x)))(ys);
    };
    var go = function(acc, currentLen, xs) {
      if (currentLen === 0) {
        return acc;
      } else {
        var last3 = xs[currentLen - 1];
        return new Cont(function() {
          var built = go(buildFrom(last3, acc), currentLen - 1, xs);
          return built;
        });
      }
    };
    return function(array) {
      var acc = map8(finalCell)(f(array[array.length - 1]));
      var result = go(acc, array.length - 1, array);
      while (result instanceof Cont) {
        result = result.fn();
      }
      return map8(listToArray)(result);
    };
  };
}();

// output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";

// output/Data.Argonaut.Decode.Decoders/index.js
var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(bindEither);
var traverse5 = /* @__PURE__ */ traverse(traversableObject)(applicativeEither);
var getField = function(decoder) {
  return function(obj) {
    return function(str) {
      return maybe(new Left(new AtKey(str, MissingValue.value)))(function() {
        var $48 = lmap2(AtKey.create(str));
        return function($49) {
          return $48(decoder($49));
        };
      }())(lookup(str)(obj));
    };
  };
};
var decodeString = /* @__PURE__ */ function() {
  return caseJsonString(new Left(new TypeMismatch2("String")))(Right.create);
}();
var decodeNumber = /* @__PURE__ */ function() {
  return caseJsonNumber(new Left(new TypeMismatch2("Number")))(Right.create);
}();
var decodeJObject = /* @__PURE__ */ function() {
  var $50 = note(new TypeMismatch2("Object"));
  return function($51) {
    return $50(toObject($51));
  };
}();
var decodeInt = /* @__PURE__ */ composeKleisliFlipped3(/* @__PURE__ */ function() {
  var $84 = note(new TypeMismatch2("Integer"));
  return function($85) {
    return $84(fromNumber($85));
  };
}())(decodeNumber);
var decodeForeignObject = function(decoder) {
  return composeKleisliFlipped3(function() {
    var $86 = lmap2(Named.create("ForeignObject"));
    var $87 = traverse5(decoder);
    return function($88) {
      return $86($87($88));
    };
  }())(decodeJObject);
};

// output/Record/index.js
var insert4 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function() {
      return function(l) {
        return function(a) {
          return function(r) {
            return unsafeSet(reflectSymbol2(l))(a)(r);
          };
        };
      };
    };
  };
};

// output/Data.Argonaut.Decode.Class/index.js
var bind2 = /* @__PURE__ */ bind(bindEither);
var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
var map7 = /* @__PURE__ */ map(functorMaybe);
var gDecodeJsonNil = {
  gDecodeJson: function(v) {
    return function(v1) {
      return new Right({});
    };
  }
};
var gDecodeJson = function(dict) {
  return dict.gDecodeJson;
};
var decodeRecord = function(dictGDecodeJson) {
  var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
  return function() {
    return {
      decodeJson: function(json2) {
        var v = toObject(json2);
        if (v instanceof Just) {
          return gDecodeJson1(v.value0)($$Proxy.value);
        }
        ;
        if (v instanceof Nothing) {
          return new Left(new TypeMismatch2("Object"));
        }
        ;
        throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v.constructor.name]);
      }
    };
  };
};
var decodeJsonString = {
  decodeJson: decodeString
};
var decodeJsonNumber = {
  decodeJson: decodeNumber
};
var decodeJsonJson = /* @__PURE__ */ function() {
  return {
    decodeJson: Right.create
  };
}();
var decodeJsonInt = {
  decodeJson: decodeInt
};
var decodeJsonField = function(dict) {
  return dict.decodeJsonField;
};
var gDecodeJsonCons = function(dictDecodeJsonField) {
  var decodeJsonField1 = decodeJsonField(dictDecodeJsonField);
  return function(dictGDecodeJson) {
    var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      var insert5 = insert4(dictIsSymbol)()();
      return function() {
        return function() {
          return {
            gDecodeJson: function(object) {
              return function(v) {
                var fieldName = reflectSymbol2($$Proxy.value);
                var fieldValue = lookup(fieldName)(object);
                var v1 = decodeJsonField1(fieldValue);
                if (v1 instanceof Just) {
                  return bind2(lmap3(AtKey.create(fieldName))(v1.value0))(function(val) {
                    return bind2(gDecodeJson1(object)($$Proxy.value))(function(rest) {
                      return new Right(insert5($$Proxy.value)(val)(rest));
                    });
                  });
                }
                ;
                if (v1 instanceof Nothing) {
                  return new Left(new AtKey(fieldName, MissingValue.value));
                }
                ;
                throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
              };
            }
          };
        };
      };
    };
  };
};
var decodeJson = function(dict) {
  return dict.decodeJson;
};
var decodeForeignObject2 = function(dictDecodeJson) {
  return {
    decodeJson: decodeForeignObject(decodeJson(dictDecodeJson))
  };
};
var decodeFieldId = function(dictDecodeJson) {
  var decodeJson1 = decodeJson(dictDecodeJson);
  return {
    decodeJsonField: function(j) {
      return map7(decodeJson1)(j);
    }
  };
};

// output/Data.Argonaut.Decode.Combinators/index.js
var getField2 = function(dictDecodeJson) {
  return getField(decodeJson(dictDecodeJson));
};

// output/Effect.Console/foreign.js
var log2 = function(s) {
  return function() {
    console.log(s);
  };
};

// output/Effect.Class.Console/index.js
var log3 = function(dictMonadEffect) {
  var $51 = liftEffect(dictMonadEffect);
  return function($52) {
    return $51(log2($52));
  };
};

// output/Main/index.js
var showRecord2 = /* @__PURE__ */ showRecord()();
var latIsSymbol = {
  reflectSymbol: function() {
    return "lat";
  }
};
var lngIsSymbol = {
  reflectSymbol: function() {
    return "lng";
  }
};
var cityIsSymbol = {
  reflectSymbol: function() {
    return "city";
  }
};
var countryIsSymbol = {
  reflectSymbol: function() {
    return "country";
  }
};
var countyIsSymbol = {
  reflectSymbol: function() {
    return "county";
  }
};
var formattedStreetIsSymbol = {
  reflectSymbol: function() {
    return "formattedStreet";
  }
};
var numberIsSymbol = {
  reflectSymbol: function() {
    return "number";
  }
};
var predirectionalIsSymbol = {
  reflectSymbol: function() {
    return "predirectional";
  }
};
var stateIsSymbol = {
  reflectSymbol: function() {
    return "state";
  }
};
var streetIsSymbol = {
  reflectSymbol: function() {
    return "street";
  }
};
var suffixIsSymbol = {
  reflectSymbol: function() {
    return "suffix";
  }
};
var zipIsSymbol = {
  reflectSymbol: function() {
    return "zip";
  }
};
var accuracyIsSymbol = {
  reflectSymbol: function() {
    return "accuracy";
  }
};
var accuracyTypeIsSymbol = {
  reflectSymbol: function() {
    return "accuracyType";
  }
};
var componentsIsSymbol = {
  reflectSymbol: function() {
    return "components";
  }
};
var formattedIsSymbol = {
  reflectSymbol: function() {
    return "formatted";
  }
};
var locationIsSymbol = {
  reflectSymbol: function() {
    return "location";
  }
};
var sourceIsSymbol = {
  reflectSymbol: function() {
    return "source";
  }
};
var ordRecord2 = /* @__PURE__ */ ordRecord();
var ordRecordCons2 = /* @__PURE__ */ ordRecordCons(ordRecordNil)();
var eqRec3 = /* @__PURE__ */ eqRec();
var eqRowCons2 = /* @__PURE__ */ eqRowCons(eqRowNil)();
var bind3 = /* @__PURE__ */ bind(bindEither);
var decodeForeignObject3 = /* @__PURE__ */ decodeForeignObject2(decodeJsonJson);
var decodeJson2 = /* @__PURE__ */ decodeJson(decodeForeignObject3);
var getField3 = /* @__PURE__ */ getField2(decodeForeignObject3);
var getField1 = /* @__PURE__ */ getField2(decodeJsonNumber);
var pure4 = /* @__PURE__ */ pure(applicativeEither);
var getField22 = /* @__PURE__ */ getField2(decodeJsonString);
var gDecodeJsonCons2 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString));
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var bind1 = /* @__PURE__ */ bind(bindAff);
var log4 = /* @__PURE__ */ log3(monadEffectAff);
var showGeoCoords = /* @__PURE__ */ showRecord2(/* @__PURE__ */ showRecordFieldsCons(latIsSymbol)(/* @__PURE__ */ showRecordFieldsConsNil(lngIsSymbol)(showNumber))(showNumber));
var showAddressComponents = /* @__PURE__ */ showRecord2(/* @__PURE__ */ showRecordFieldsCons(cityIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(countryIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(countyIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(formattedStreetIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(numberIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(predirectionalIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(stateIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(streetIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(suffixIsSymbol)(/* @__PURE__ */ showRecordFieldsConsNil(zipIsSymbol)(showString))(showString))(showString))(showString))(showString))(showString))(showString))(showString))(showString))(showString));
var showAddress = /* @__PURE__ */ showRecord2(/* @__PURE__ */ showRecordFieldsCons(accuracyIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(accuracyTypeIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(componentsIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(formattedIsSymbol)(/* @__PURE__ */ showRecordFieldsCons(locationIsSymbol)(/* @__PURE__ */ showRecordFieldsConsNil(sourceIsSymbol)(showString))(showGeoCoords))(showString))(showAddressComponents))(showString))(showInt));
var show4 = /* @__PURE__ */ show(/* @__PURE__ */ showEither(showJsonDecodeError)(showAddress));
var ordGeoCoords = /* @__PURE__ */ ordRecord2(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons2(lngIsSymbol)(ordNumber))()(latIsSymbol)(ordNumber));
var ordAddressComponents = /* @__PURE__ */ ordRecord2(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons2(zipIsSymbol)(ordString))()(suffixIsSymbol)(ordString))()(streetIsSymbol)(ordString))()(stateIsSymbol)(ordString))()(predirectionalIsSymbol)(ordString))()(numberIsSymbol)(ordString))()(formattedStreetIsSymbol)(ordString))()(countyIsSymbol)(ordString))()(countryIsSymbol)(ordString))()(cityIsSymbol)(ordString));
var ordAddress = /* @__PURE__ */ ordRecord2(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons(/* @__PURE__ */ ordRecordCons2(sourceIsSymbol)(ordString))()(locationIsSymbol)(ordGeoCoords))()(formattedIsSymbol)(ordString))()(componentsIsSymbol)(ordAddressComponents))()(accuracyTypeIsSymbol)(ordString))()(accuracyIsSymbol)(ordInt));
var eqGeoCoords = /* @__PURE__ */ eqRec3(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons2(lngIsSymbol)(eqNumber))()(latIsSymbol)(eqNumber));
var eqAddressComponents = /* @__PURE__ */ eqRec3(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons2(zipIsSymbol)(eqString))()(suffixIsSymbol)(eqString))()(streetIsSymbol)(eqString))()(stateIsSymbol)(eqString))()(predirectionalIsSymbol)(eqString))()(numberIsSymbol)(eqString))()(formattedStreetIsSymbol)(eqString))()(countyIsSymbol)(eqString))()(countryIsSymbol)(eqString))()(cityIsSymbol)(eqString));
var eqAddress = /* @__PURE__ */ eqRec3(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons2(sourceIsSymbol)(eqString))()(locationIsSymbol)(eqGeoCoords))()(formattedIsSymbol)(eqString))()(componentsIsSymbol)(eqAddressComponents))()(accuracyTypeIsSymbol)(eqString))()(accuracyIsSymbol)(eqInt));
var parts_ = function(v) {
  return v.components;
};
var format_ = function(v) {
  return v.formatted;
};
var decodeJsonGeoCoords = {
  decodeJson: function(json2) {
    return bind3(decodeJson2(json2))(function(o) {
      return bind3(getField3(o)("location"))(function(o$prime) {
        return bind3(getField1(o$prime)("lat"))(function(lat) {
          return bind3(getField1(o$prime)("lng"))(function(lng) {
            return pure4({
              lat,
              lng
            });
          });
        });
      });
    });
  }
};
var decodeJsonAddressComponents = {
  decodeJson: function(json2) {
    return bind3(decodeJson2(json2))(function(o) {
      return bind3(getField3(o)("address_components"))(function(o$prime) {
        return bind3(getField22(o$prime)("number"))(function(number) {
          return bind3(getField22(o$prime)("predirectional "))(function(predirectional) {
            return bind3(getField22(o$prime)("street"))(function(street) {
              return bind3(getField22(o$prime)("suffix"))(function(suffix) {
                return bind3(getField22(o$prime)("formatted_street"))(function(formattedStreet) {
                  return bind3(getField22(o$prime)("city"))(function(city) {
                    return bind3(getField22(o$prime)("county"))(function(county) {
                      return bind3(getField22(o$prime)("state"))(function(state2) {
                        return bind3(getField22(o$prime)("zip"))(function(zip2) {
                          return bind3(getField22(o$prime)("country"))(function(country) {
                            return pure4({
                              number,
                              predirectional,
                              street,
                              suffix,
                              formattedStreet,
                              city,
                              county,
                              state: state2,
                              zip: zip2,
                              country
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
};
var decodeJsonAddress = /* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonInt))(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonAddressComponents))(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonGeoCoords))(/* @__PURE__ */ gDecodeJsonCons2(gDecodeJsonNil)(sourceIsSymbol)()())(locationIsSymbol)()())(formattedIsSymbol)()())(componentsIsSymbol)()())(accuracyTypeIsSymbol)()())(accuracyIsSymbol)()())();
var batchValidate_ = /* @__PURE__ */ log3(monadEffectEffect)("not implemented");
var addressDecoder = /* @__PURE__ */ decodeJson(decodeJsonAddress);
var validate_ = function(apiKey) {
  return $$void2(launchAff(bind1(get2(json)("https://api.geocod.io/v1.7/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=" + apiKey))(function(result) {
    if (result instanceof Left) {
      return log4("GET /api response failed to decode: " + printError(result.value0));
    }
    ;
    if (result instanceof Right) {
      return log4(show4(addressDecoder(result.value0.body)));
    }
    ;
    throw new Error("Failed pattern match at Main (line 134, column 3 - line 136, column 64): " + [result.constructor.name]);
  })));
};
export {
  batchValidate_,
  decodeJsonAddress,
  decodeJsonAddressComponents,
  eqAddress,
  eqAddressComponents,
  format_,
  ordAddress,
  ordAddressComponents,
  parts_,
  showAddress,
  showAddressComponents,
  validate_
};
