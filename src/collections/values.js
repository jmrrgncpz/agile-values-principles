import { db } from '@/db.js';

let collection;
const values = {
    collection: function() {
        if (!collection) {
            collection = db.collection('values');
        }
    },
    create: function(value) {
        values.collection().add({
            title: value.title,
            description: value.description
        })
    },
    update: function(valueId, title) {
        values.collection().doc(valueId).update({ title })
    },
    delete: function(valueId) {
        values.collection().doc(valueId).delete();
    }
}

export default values;