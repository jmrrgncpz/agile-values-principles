import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import { MockFirebase } from 'firebase-mock';
import App from "@/App.vue";
import Vuetify from "vuetify";

describe("App.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(App, {
      localVue,
      vuetify,
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it('Disables "Create new Value" button and shows the "New value container" when new value is being created', async () => {
    let button = wrapper.find("[data-test-id=btn-values-create]");
    await button.trigger('click');

    button = wrapper.find("[data-test-id=btn-values-create]");
    let newValueContainer = wrapper.find('[data-test-id=new-value-container]');

    expect(button.attributes('disabled')).toBeTruthy();
    expect(newValueContainer.exists()).toBe(true);
  });

  // it('Add a new value in values collection when received a "new-card-saved" event', async () => {
  //   await wrapper.setData({
  //     values: [{}, {}],
  //     isCreatingValue: true,
  //   });

  //   const btnSaveCard = wrapper.find('[data-test-id=btn-save-card]');
  //   await btnSaveCard.trigger('click');

  //   const valueCards = wrapper.findAllComponents({ref : 'value-card'});
  //   expect(valueCards.length).toBe(3);
  // })
});
