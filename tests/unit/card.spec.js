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

  describe('the title/content value', () => {
    let title;
    beforeEach(async () => {
      await wrapper.setData({
        isEditing: true,
        originalTitle: 'This is the original title'
      })

      title = await wrapper.findComponent({ ref: 'card-title' });

      wrapper.vm.onTitleInput({
        target: {
          innerText: 'The New Value 1'
        }
      });
    })

    it('set value back to original when edit is canceled', async () => {
      await wrapper.findComponent({ ref: 'btn-cancel' }).trigger('click');
      expect(title.text()).toBe('This is the original title')
    })

    it('set value to the new value when save is clicked', async () => {
      await wrapper.findComponent({ ref: 'btn-save-card' }).trigger('click');
      expect(title.text()).toBe('The New Value 1');
    })
  })
})
