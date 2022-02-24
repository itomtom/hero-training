<template>
  <div id="app">
    <Hero />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Hero from "./components/Hero.vue";

export default Vue.extend({
  name: "App",
  components: {
    Hero,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html,
#app,
.home {
  height: 100%;
}

body {
  background-color: #f4f4f4;
  margin: 0;
  height: 100%;
}
</style>
