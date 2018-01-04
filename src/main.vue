<template>
  <section class="application">
    <section class="input">
      <section class="heading">
        <h1>input</h1>
        <h2>ctrl + enter to execute</h2>
      </section>
      <codemirror class="code" v-model="input" :options="options"></codemirror>
    </section>
    <section class="output">
      <section class="heading">
        <h1>output</h1>
      </section>
      <section class="logs">
        <span class="log" v-for="code of output" :level="code.level">{{ code.message }}</span>
      </section>
      <section class="footer">
        <h2>Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a> | Copyright © 2018-present <a href="https://larkin.nz">Daniel Larkin</a> | <a href="https://github.com/larkin-nz/js-tabby">Github</a></h2>
      </section>
    </section>
  </section>
</template>

<script>
  import logic from './logic.js';
  export default logic;
</script>

<style>
  @import './stylesheet.css';
</style>
