import { createLocalVue, shallowMount } from "@vue/test-utils";
import OnCall from "@/components/OnCall.vue";
import Vuex from "vuex";

describe("Hero.vue", () => {
  test("should call countHeroes when component is loaded", async () => {
    const mockCount = jest.fn();
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      state: {
        heroes: [{ id: "tonystark", name: "Iron Man" }],
      },
      getters: {
        countHeroes: mockCount,
      },
    });
    shallowMount(OnCall, { localVue, store });
    expect(mockCount).toBeCalledTimes(1);
  });
});
