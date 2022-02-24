import Vue from "vue";
import Vuex, { ActionContext, GetterTree } from "vuex";
import { Heroes } from "../core/Hero";
Vue.use(Vuex);

interface IHero {
  id: string;
  name: string;
}
interface IAppState {
  heroes: IHero[];
}
type AppContext = ActionContext<IAppState, IAppState>;
const heroList = new Heroes();

const actions = {
  async getAllHeroes({ commit }: AppContext) {
    commit("setHeroes", await heroList.getAll());
  },
  async createHero({ commit }: AppContext, name: string) {
    try {
      const id = await heroList.create(name);
      commit("addHero", {
        id,
        name,
      });
    } catch ({ message }) {
      alert(message);
    }
  },
  async removeHero({ commit }: AppContext, id: string) {
    try {
      await heroList.remove(id);
      commit("deleteHero", id);
    } catch ({ message }) {
      alert(message);
    }
  },
};
const getters: GetterTree<IAppState, IAppState> = {
  currentHeroes: (state: IAppState) =>
    state.heroes.filter(({ name }) => name.toLowerCase() !== "iron man"),
  countHeroes: (_: IAppState, getters) => getters.currentHeroes.length,
};

export default new Vuex.Store({
  state: {
    heroes: [],
  },
  getters,
  mutations: {
    setHeroes(state: IAppState, payload) {
      state.heroes = payload;
    },
    addHero(state: IAppState, payload) {
      state.heroes.push(payload);
    },
    deleteHero(state: IAppState, id) {
      const index = state.heroes.findIndex((hero) => hero.id === id);
      state.heroes.splice(index, 1);
    },
  },
  actions,
});
