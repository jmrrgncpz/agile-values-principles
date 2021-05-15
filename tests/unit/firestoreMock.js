import { Store } from "vuex-mock-store";

export const store = new Store({
  state: {
    values: [
      { id: 'doc-1', title: "values 1", description: "" },
      { id: 'doc-2', title: "values 2", description: "" },
      { id: 'doc-3', title: "values 3", description: "" },
    ],
    principles: [
      { id: 'doc-1', title: "", description: "principles 1" },
      { id: 'doc-2',title: "", description: "principles 2" },
      { id: 'doc-3',title: "", description: "principles 3" },
      { id: 'doc-4',title: "", description: "principles 4" },
    ],
  },
  mutations: {
    remove: (state, { collectionId, documentId }) => {
      const target = collectionId == 'values' ? state.values : state.principles;
      target = target.filter(x => x.id != documentId);
    }
  },
  actions: {
    delete: (context, { collectionId, documentId }) => {
      context.commit('remove', { collectionId, documentId });
    }
  }
});

export const mocks = {
  $store: store,
};