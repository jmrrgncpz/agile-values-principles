import { createLocalVue, mount } from "@vue/test-utils";
import App from "@/App.vue";
import Vuetify from "vuetify";
import { store, mocks } from './firestoreMock';

describe("App.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(App, {
      localVue,
      vuetify,
      mocks
    });
  });

  it('Disables "Create new Value" button and shows the "New value container" when new value is being created', async () => {
    let button = wrapper.find("[data-test-id=btn-values-create]");
    await button.trigger('click');

    button = wrapper.find("[data-test-id=btn-values-create]");
    let newValueContainer = wrapper.find('[data-test-id=new-value-container]');

    expect(button.attributes('disabled')).toBeTruthy();
    expect(newValueContainer.exists()).toBe(true);
  });
});
