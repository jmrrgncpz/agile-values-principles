import { createLocalVue, mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import Vuetify from 'vuetify';


describe('Card.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  })

  it('renders [title, number] props when passed', () => {
    const title = 'Value 1'
    const number = '4';
    const wrapper = mount(Card, {
      localVue,
      vuetify,
      propsData: { title, number }
    })

    const titleEL = wrapper.find("[data-test-id=card-title]");
    const numberEl = wrapper.find("[data-test-id=card-number]");

    expect(titleEL.text()).toBe('Value 1');
    expect(numberEl.text()).toBe('4');
  })
})
