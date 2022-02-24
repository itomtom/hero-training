import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import Hero from "@/components/Hero.vue";
import Vuex from "vuex";

interface IHero extends Vue {
  newHero: string;
  heroes: { id: string; name: string }[];
}

describe("Hero.vue", () => {
  const mockGet = jest.fn();
  const mockCreate = jest.fn();
  const mockDelete = jest.fn();
  let wrapper: Wrapper<Vue>;

  beforeEach(async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
      state: {
        heroes: [{ id: "mischief", name: "Loki" }],
      },
      actions: {
        getAllHeroes: mockGet,
        createHero: mockCreate,
        removeHero: mockDelete,
      },
    });
    wrapper = shallowMount(Hero, { localVue, store });
    expect(mockGet).toBeCalled();
  });

  test("should return list of heroes", () => {
    const instance = wrapper.vm as IHero;
    expect(instance.heroes).toEqual([{ id: "mischief", name: "Loki" }]);
  });

  test("should call createHero when submit event happens", async () => {
    const instance = wrapper.vm as IHero;
    await wrapper.find("input[type=text]").setValue("Thor");
    expect(instance.newHero).toBe("Thor");
    await wrapper.find("form").trigger("submit.prevent");
    expect(mockCreate.mock.calls[0][1]).toBe("Thor");
    expect(instance.newHero).toBe("");
  });

  test("should call removeHero action with id when clicking on Remove button", async () => {
    await wrapper.find("button[class='rm']").trigger("click");
    expect(mockDelete.mock.calls[0][1]).toBe("mischief");
  });
});
