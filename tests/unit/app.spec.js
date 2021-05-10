import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Vuetify from "vuetify";
import MockFirebase from 'firebase-mock';
import { _create, _update, _delete } from '@/db.js';
import firestoreMock from './firestoreMock';
import jest from 'jest';

jest.mock('@/db.js', () => {
  return firestoreMock;
});

firestoreMock.firestore().flush();

describe("App.vue", () => {
  MockFirebase.override();
  let values = [];
  let principles = [];
  // overrides
  _create = function(collectionId, document){
    if (collectionId == 'values') {
      document.id = `doc-${values.length + 1}`;
      values.push(document);
    } else {
      document.id = `doc-${principles.length + 1}`;
      principles.push(document);
    }
  }

  _update = function(collectionId, documentId, document) {
    if (collectionId == 'values') {
      const doc = values.find(x => x.id == documentId);
      doc.title = document.title;
    } else {
      const doc = principles.find(x => x.id == documentId);
      doc.description = document.description;
    }
  }

  _delete = function(collectionId, documentId){
    if (collectionId == 'values') {
      values = values.filter(x => x.collectionId != x.id);
    }
  }

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

  it('Add a new value in values collection when a new value card is saved', async () => {
    await wrapper.setData({
      values: [{}, {}],
      isCreatingValue: true,
    });
    
    const btnSaveCard = wrapper.find({ ref: 'btn-save-card' });
    await btnSaveCard.trigger('click');

    const valueCards = wrapper.findAllComponents({ref : 'value-card'});
    expect(valueCards.length).toBe(3);
  })
});
