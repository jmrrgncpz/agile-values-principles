<template>
  <v-app>
    <v-main>
      <v-row no-gutter="true" class="fill-height ma-0">
        <v-col cols="6" class="fill-height ma-0 pa-0">
          <v-row id="values-section" class="fill-height ma-0">
            <v-col class="title-container">
              <h1 id="values-title" class="section-title ma-0">Values</h1>
            </v-col>
            <v-col id="values-container" class="d-flex flex-column cards-container">
              <v-btn
                :disabled="isCreatingValue"
                v-if="values.length < 4"
                data-test-id="btn-values-create"
                @click="createNewValue"
                text
                class="theme--dark"
                >Create new Value</v-btn
              >
              <Card
                v-for="(value, i) in values"
                :id="value.id"
                :key="value.id"
                :number="i + 1"
                :title="value.title"
                theme="dark"
                ref="value-card"
              >
              </Card>

              <Card
                v-if="isCreatingValue"
                id="new-value-card"
                theme="dark"
                :number="values.length + 1"
                :isNew="true"
                v-on:new-card-saved="handleNewCardSave"
                data-test-id="new-value-container"
                @new-card-canceled="isCreatingValue = false"
              >
              </Card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" class="fill-height ma-0 pa-0">
          <v-row class="blue lighten-5 fill-height ma-0 flex-row-reverse">
            <v-col class="title-container">
              <h1 id="principles-title" class="section-title ma-0">
                Principles
              </h1>
            </v-col>
            <v-col id="principles-container" class="d-flex flex-column cards-container">
              <v-btn
                :disabled="isCreatingPrinciple"
                v-if="principles.length < 12"
                data-test-id="btn-values-create"
                @click="createNewPrinciple"
                text
                class="theme--light"
                >Create new Principle</v-btn
              >
              <Card
                v-for="(principle, i) in principles"
                :id="principle.id"
                :key="principle.id"
                :number="i + 1"
                :description="principle.description"
                :is-principle="true"
                theme="light"
              >
              </Card>

              <Card
                v-if="isCreatingPrinciple"
                id="new-principle-card"
                theme="light"
                :number="principles.length + 1"
                :isNew="true"
                :is-principle="true"
                v-on:new-card-saved="handleNewCardSave"
                data-test-id="new-value-container"
                @new-card-canceled="isCreatingPrinciple = false"
              >
              </Card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Card from "./components/Card.vue";

export default {
  name: "App",
  mounted() {
    this.$store.dispatch('bindValues');
    this.$store.dispatch('bindPrinciples');
  },
  data: () => ({
    isCreatingValue: false,
    isCreatingPrinciple: false
  }),
  components: {
    Card,
  },
  methods: {
    createNewValue() {
      this.isCreatingValue = true;
      this.scrollToBottom('values-container');
    },
    createNewPrinciple() {
      this.isCreatingPrinciple = true;
      this.scrollToBottom('principles-container');
    },
    handleNewCardSave() {
      if (this.isCreatingValue) {
        this.isCreatingValue = false;
      }

      if (this.isCreatingPrinciple) {
        this.isCreatingPrinciple = false;
      }
    },
    scrollToBottom(elementId) {
      this.$nextTick(() => {
        var container = document.querySelector(`#${elementId}`)
        container.scrollTop = container.scrollHeight;
      })
    }
  },
  computed: {
    values() {
      return this.$store.state.values;
    },
    principles() {
      return this.$store.state.principles;
    }
  }
};
</script>

<style scoped>
#values-section {
  background-color: #041a3b;
}

.section-title {
  writing-mode: vertical-lr;
  line-height: 1em;
}


@media only screen and (min-width: 1265px){
  .section-title {
    font-size: 9rem;
  }
}

@media only screen and (min-width: 1905px){
  .section-title {
    font-size: 12rem;
  }
}

#values-title {
  color: #06265a;
}

#principles-title {
  color: #c3e6ff;
}

.title-container {
  flex-grow: 0;
}

.cards-container {
  max-height: 100vh;
  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
}

.fill-height {
  height: 100%;
}

.cards-container {
  scroll-behavior: smooth;
}
</style>