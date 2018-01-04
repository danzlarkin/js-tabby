import Vue from 'vue';
import VueCodemirror from 'vue-codemirror';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import main from './main.vue';

Vue.use(VueCodemirror);

new Vue({
  el: '.application',
  render: h => h(main)
});