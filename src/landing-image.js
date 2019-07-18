/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../node_modules/@polymer/polymer/polymer-legacy.js';

import '../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../node_modules/@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>

      :host {
        display: block;
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }

      img {
        max-width: 100% !important;
        max-height: 100%;
        margin: 0 auto;
        opacity: 0;
        transition: 0.5s opacity;
        @apply --layout-fit;
        @apply --landing-image-img;
      }

    </style>

    <img id="img" alt\$="[[alt]]" on-load="_onImgLoad" on-error="_onImgError">
`,

  is: 'landing-image',

  properties: {

    alt: String,

    src: {
      type: String,
      observer: '_srcChanged'
    },

    placeholderImg: {
      type: String,
      observer: '_placeholderImgChanged'
    }

  },

  _srcChanged: function(src) {
    this.$.img.removeAttribute('src');
    this.$.img.style.transition = '';
    this.$.img.style.opacity = 0;
    if (src) {
      this.$.img.src = src;
    }
  },

  _onImgLoad: function() {
    this.$.img.style.transition = '0.5s opacity';
    this.$.img.style.opacity = 1;
  },

  _onImgError: function() {
    if (!this.placeholderImg) {
      this.$.img.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>');
    }
  },

  _placeholderImgChanged: function(placeholder) {
    this.style.backgroundImage = 'url(\'' + placeholder + '\')';
  }
});
