<template>
  <div class="card-component">
    <v-card
      class="card mb-6 d-flex align-center pa-4 justify-space-between"
      :class="[`theme--${theme}`, `${ isPrinciple ? 'flex-row-reverse': 'flex-row' }`, '']"
      :loading="isSaving"
      elevation="0"
    >
      <h1 class="number" data-test-id="card-number">{{ number }}</h1>
      <div class="d-flex flex-column pa-5">
        <v-card-title
          v-if="!isPrinciple"
          :class="`title text-lg-h4 text-xl-h3 font-weight-black text-right`"
          :contenteditable="isEditing"
          @input="onTitleInput"
          data-test-id="card-title"
          ref="card-title"
        >
          {{ titleValue }}
        </v-card-title>
        <v-card-text v-if="isPrinciple" class="content" :contenteditable="isEditing">
          <slot></slot>
        </v-card-text>
        <v-card-actions
          class="d-flex"
          :class="`${isPrinciple ? '' : 'justify-end'}`"
        >
        <div v-if="!isEditing">
          <v-btn text v-bind:class="`theme--${theme}`" class="mr-4" data-test-id="btn-delete-card">Delete</v-btn>
          <v-btn @click="isEditing = true">Edit</v-btn>
        </div>
        <div v-else>
          <v-btn ref="btn-cancel" text>Cancel</v-btn>
          <v-btn @click="saveCard" data-test-id="btn-save-card">Save</v-btn>
        </div>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { db } from '@/db.js';
const values = db.collection('values');
const principles = db.collection('principles');

export default {
  props: ["id", "number", "title", "theme", "isPrinciple", 'isNew'],
  mounted() {
    if (this.isNew) {
      this.isEditing = true;
    }
  },
  data() {
    return {
      isEditing: false,
      isSaving: false,
    }
  },
  methods: {
    async saveCard() {
      this.isSaving = true;

      let eventName = this.isNew ? 'new-card-saved' : 'card-saved';
      const targetCollection = this.isPrinciple ? principles : values;
      const document = {
        title: this.title || '',
        description: this.description || ''
      };

      if (this.isNew) {
        await targetCollection.add(document);
      } else {
        await targetCollection.doc(this.id).update(document);
      }

      this.isSaving = false;
      this.isEditing = false;
      this.$emit(eventName)
    },
    onTitleInput(e) {
      this.title = e.target.innerText;
    }
  },
  computed: {
    titleValue() {
      if (this.isPrinciple){
        return '';
      }

      if (!this.title){
        return 'Input your title here'
      }

      return this.title;
    }
  }
};
</script>

<style scoped>
.card-component .card {
  background: rgba(0, 0, 0, 0);
}

.content {
  font-size: 1.5em;
  line-height: 1.5em;
}

.title {
  word-break: break-word;
}

.number {
  opacity: 0.1;
}

@media only screen and (min-width: 1265px){
  .number {
    font-size: 10rem;
  }
}

@media only screen and (min-width: 1905px){
  .section-title {
    font-size: 13rem;
  }
}
</style>
