import { db } from '@/db.js';

let collection;
const principles = {
    collection: function() {
        if (!collection) {
            collection = db.collection('principles');
        }
    },
    create: function(principle) {
        
    },
    update: function(principleId, description) {
        principles.collection().doc(principleId).update({ description })
    },
    delete: function(principleId) {
        principles.collection().doc(principleId).delete();
    }
}

export default principles;