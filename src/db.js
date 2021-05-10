import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'agile-values-principle' })
  .firestore()

export const _create = (collectionId, document) => {
  db.collection(collectionId).add({
    title: document.title,
    description: document.description
  })
}

export const _update = (collectionId, documentId, document) => {
  db.collection(collectionId).doc(documentId).update(document);
}

export const _delete = (collectionId, documentId) => {
  db.collection(collectionId).doc(documentId).delete();
}