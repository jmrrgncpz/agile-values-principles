<template>
  <div class="card-component">
    <v-card
      class="card mb-6 d-flex align-center pa-4 justify-space-between"
      :class="[
        `theme--${theme}`,
        `${isPrinciple ? 'flex-row-reverse' : 'flex-row'}`,
        '',
      ]"
      :loading="isSaving"
      elevation="0"
    >
      <h1 class="number" data-test-id="card-number">{{ number }}</h1>
      <div class="d-flex flex-column pa-5">
        <v-card-title
          v-if="!isPrinciple"
          class="title text-lg-h4 text-xl-h3 font-weight-black text-right"
          :contenteditable="isEditing"
          @focus="onFocus"
          @blur="onTitleInput"
          data-test-id="card-title"
          ref="card-title"
        >
          {{ titleValue }}
        </v-card-title>
        <v-card-text
          v-if="isPrinciple"
          class="content"
          @input="onDescriptionInput"
          :contenteditable="isEditing"
        >
          <slot></slot>
        </v-card-text>
        <v-card-actions
          class="d-flex"
          :class="`${isPrinciple ? '' : 'justify-end'}`"
        >
          <div v-if="!isEditing">
            <v-btn
              text
              v-bind:class="`theme--${theme}`"
              class="mr-4"
              data-test-id="btn-delete-card"
              ref="btn-delete-card"
              @click="deleteCard"
              >Delete</v-btn
            >
            <v-btn @click="isEditing = true">Edit</v-btn>
          </div>
          <div v-else>
            <v-btn
              @click="cancelEdit"
              class="mr-4"
              v-bind:class="`theme--${theme}`"
              ref="btn-cancel"
              text
              >Cancel</v-btn
            >
            <v-btn
              @click="saveCard"
              data-test-id="btn-save-card"
              ref="btn-save-card"
              >Save</v-btn
            >
          </div>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["id", "number", "title", "theme", "isPrinciple", "isNew"],
  mounted() {
    if (this.isNew) {
      this.isEditing = true;
    }

    this.originalTitle = this.title;
    this.titleProxy = this.title;
    this.originalDescription = this.description;
    this.descriptionProxy = this.description;
  },
  data() {
    return {
      isEditing: false,
      isSaving: false,
      originalTitle: "",
      originalDescription: "",
      titleProxy: "",
      descriptionProxy: "",
    };
  },
  methods: {
    saveCard() {
      this.isSaving = true;

      let eventName = this.isNew ? "new-card-saved" : "card-saved";
      const collectionId = this.isPrinciple ? "principles" : "values";
      const document = {
        title: this.titleProxy || "",
        description: this.descriptionProxy || "",
      };

      if (this.isNew) {
        this.$store.dispatch("create", { collectionId, document });
      } else {
        document.id = this.id;
        this.$store.dispatch("update", { collectionId, document });
      }

      this.isSaving = false;
      this.isEditing = false;
      this.$emit(eventName);
    },
    deleteCard() {
      const collectionId = this.isPrinciple ? "principles" : "values";
      this.$store.dispatch("delete", { collectionId, documentId: this.id });
    },
    cancelEdit() {
      if (this.isNew) {
        this.$emit('new-card-canceled');
      } else {
        this.titleProxy = this.originalTitle;
        this.descriptionProxy = this.originalDescription;
        this.isEditing = false;  
      }
    },
    onTitleInput(e) {
      this.titleProxy = e.target.innerText;
    },
    onDescriptionInput(e) {
      this.descriptionProxy = e.target.innerText;
    },
    onFocus(e) {
      setTimeout(function(){
        console.log(e);
        e.target.focus();
      }, 0);
    }
  },
  computed: {
    titleValue() {
      if (this.isPrinciple) {
        return "";
      }

      if (!this.titleProxy) {
        return "Input your title here";
      }

      return this.titleProxy;
    },
  },
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

@media only screen and (min-width: 1265px) {
  .number {
    font-size: 10rem;
  }
}

@media only screen and (min-width: 1905px) {
  .section-title {
    font-size: 13rem;
  }
}
</style>
