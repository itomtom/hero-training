<template>
  <div class="hero">
    <div class="left">
      <h1>{{ title }}</h1>
      <form @submit.prevent="addHero">
        <input
          class="link-input"
          type="text"
          placeholder="Add a hero"
          v-model.trim="newHero"
        />
      </form>
      <ul>
        <li v-for="({ id, name }, index) in heroes" :key="index">
          {{ name }}
          <button @click="deleteHero(id)" class="rm">Remove</button>
        </li>
      </ul>
      <p>
        <small>By {{ author }}</small>
      </p>
    </div>
    <div class="right">
      <OnCall />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import OnCall from "./OnCall.vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "HeroList",
  data() {
    return {
      author: "Tom",
      newHero: "",
      title: "Hero List",
    };
  },
  components: {
    OnCall,
  },
  computed: {
    ...mapState(["heroes"]),
  },
  methods: {
    ...mapActions(["getAllHeroes", "createHero", "removeHero"]),
    addHero() {
      this.createHero(this.newHero);
      this.newHero = "";
    },
    deleteHero(id: string) {
      this.removeHero(id);
    },
  },
  created() {
    this.getAllHeroes();
  },
});
</script>
<style lang="scss" scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 100%;
  grid-template-areas: "left right";
  height: 100%;

  small {
    float: left;
  }
}

.left,
.right {
  padding: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  padding: 20px;
  background: white;
  margin-bottom: 8px;
}

.right {
  grid-area: right;
  background-color: #e9e9e9;
}

input {
  border: none;
  padding: 20px;
  width: calc(100% - 40px);
  box-shadow: 0 5px 5px lightgrey;
  margin-bottom: 50px;
  outline: none;
}

.rm {
  float: right;
  text-transform: uppercase;
  font-size: 0.8em;
  background: #f9d0e3;
  border: none;
  padding: 5px;
  color: #ff0076;
  cursor: pointer;
}
</style>
