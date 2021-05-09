import { createLocalVue, mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import Vuetify from 'vuetify';


describe('Card.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Card, {
      localVue,
      vuetify
    })
  })

  afterAll(() => {
    wrapper.destroy();
  });

  it('renders [title, number] props when passed', async () => {
    const title = 'Value 1'
    const number = '4';

    await wrapper.setProps({ title, number });

    const titleEL = wrapper.find("[data-test-id=card-title]");
    const numberEl = wrapper.find("[data-test-id=card-number]");

    expect(titleEL.text()).toBe('Value 1');
    expect(numberEl.text()).toBe('4');
  })

  it('set the title/content value back to original when edit is canceled', async () => {
    await wrapper.setProps({
      title: 'This is the original title'
    });

    await wrapper.setData({
      isEditing: true
    })
    const title = await wrapper.findComponent({ ref: 'card-title' });
    wrapper.vm.onTitleInput({
      target: {
        innerText: 'New Value'
      }
    });
    
    await wrapper.findComponent({ ref: 'btn-cancel' }).trigger('click');
    expect(title.text()).toBe('This is the original title')
  })
})
