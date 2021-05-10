import { createLocalVue, mount } from "@vue/test-utils";
import Card from "@/components/Card.vue";
import Vuetify from "vuetify";
import { store, mocks } from './firestoreMock';

afterEach(() => store.reset);

describe("Card.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Card, {
      localVue,
      vuetify,
      mocks,
    });
  });

  afterAll(() => {
    wrapper.destroy();
  });

  it("renders [title, number] props when passed", async () => {
    const title = "Value 1";
    const number = "4";

    await wrapper.setProps({ title, number });

    const titleEL = wrapper.find("[data-test-id=card-title]");
    const numberEl = wrapper.find("[data-test-id=card-number]");

    expect(titleEL.text()).toBe("Value 1");
    expect(numberEl.text()).toBe("4");
  });

  describe("the title/content value", () => {
    let title;
    beforeEach(async () => {
      await wrapper.setData({
        isEditing: true,
        originalTitle: "This is the original title",
      });

      title = await wrapper.findComponent({ ref: "card-title" });

      wrapper.vm.onTitleInput({
        target: {
          innerText: "The New Value 1",
        },
      });
    });

    it("set value back to original when edit is canceled", async () => {
      await wrapper.findComponent({ ref: "btn-cancel" }).trigger("click");
      expect(title.text()).toBe("This is the original title");
    });

    it("set value to the new value when save is clicked", async () => {
      await wrapper.findComponent({ ref: "btn-save-card" }).trigger("click");
      expect(title.text()).toBe("The New Value 1");
    });
  });

  it("when new card is being saved, dispatches create", async () => {
    await wrapper.setData({
      title: "New value",
      description: "",
      isNew: true,
      isEditing: true,
    });

    const btnSaveCard = await wrapper.find({ ref: "btn-save-card" });
    await btnSaveCard.trigger("click");

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith("create", {
      collectionId: "values",
      document: { title: "New value", description: "" },
    });
  });

  it("when new card is being saved, dispatches update", async () => {
    await wrapper.setData({
      title: "Existing value",
      description: "",
      isNew: false,
      isEditing: true,
      id: 'doc-1'
    });

    const btnSaveCard = await wrapper.find({ ref: "btn-save-card" });
    await btnSaveCard.trigger("click");

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith("update", {
      collectionId: "values",
      document: { id: 'doc-1', title: "Existing value", description: "" },
    });
  });

  it("when an existing card is being deleted, dispatches delete", async () => {
    await wrapper.setData({
      isNew: false,
      id: 'doc-1',
      isEditing: false
    });

    const btnDeleteCard = await wrapper.find({ ref: 'btn-delete-card' });
    await btnDeleteCard.trigger('click');

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('delete', {
      collectionId: 'values',
      documentId: 'doc-1'
    })
    expect(store.state.values.length).toBe(2);
  })
});
