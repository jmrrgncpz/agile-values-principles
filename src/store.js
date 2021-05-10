import { firestoreAction, vuexfireMutations } from 'vuexfire';
import Vuex from 'vuex';
import { db } from './db';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        values: [],
        principles: []
    },
    mutations: vuexfireMutations,
    actions: {
      bindValues: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('values', db.collection('values'));
      }),
      bindPrinciples: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('principles', db.collection('principles'));
      }),
      create: firestoreAction((context, { collectionId, document }) => {
        return db.collection(collectionId).add({ ...document })
      }),
      update: firestoreAction((context, { collectionId, document }) => db.collection(collectionId).doc(document.id).update({ ...document })),
      delete: firestoreAction((context, { collectionId, documentId }) => db.collection(collectionId).doc(documentId).delete())
    }
  })

export default store;