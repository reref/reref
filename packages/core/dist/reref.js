(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Reref = {}));
}(this, (function (exports) { 'use strict';

/**
 * Init a Reref application.
 */
async function initReref() {}

exports.initReref = initReref;

Object.defineProperty(exports, '__esModule', { value: true });

})));
