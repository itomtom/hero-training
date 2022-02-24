<template>
  <div class="stats">
    <h1>Hero On-Call</h1>
    <p>There are currently {{ countHeroes }} heroes</p>

    <p>Iron Man is no longer on duty</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "OnCall",
  computed: mapGetters(["countHeroes"]),
});
</script>

<style scoped lang="scss">
button {
  padding: 10px;
  margin-top: 30px;
  width: 100%;
  background: none;
  border: 1px solid lightgray;
  outline: 0;
  cursor: pointer;
}
</style>
