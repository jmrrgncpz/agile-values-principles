<template>
  <v-app>
    <v-main>
      <v-row no-gutter="true" class="fill-height ma-0">
        <v-col cols="6" class="fill-height ma-0 pa-0">
          <v-row id="values-section" class="fill-height ma-0">
            <v-col class="title-container">
              <h1 id="values-title" class="section-title ma-0">Values</h1>
            </v-col>
            <v-col class="d-flex flex-column cards-container">
              <Card
                v-for="i in 4"
                v-bind:key="`value-${i}`"
                title="Some Value Title"
                :number="i"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                suscipit laborum eaque vero. Vel pariatur, aspernatur vitae
                facere doloribus necessitatibus aperiam cumque esse! Nam
                assumenda distinctio labore ab nisi maxime!
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
            <v-col class="d-flex flex-column cards-container">
              <Card
                v-for="i in 12"
                v-bind:key="`value-${i}`"
                title="Some Principle Title"
                :number="i"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                suscipit laborum eaque vero. Vel pariatur, aspernatur vitae
                facere doloribus necessitatibus aperiam cumque esse! Nam
                assumenda distinctio labore ab nisi maxime!
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
  components: {
    Card,
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
#values-section {
  background-color: #041a3b;
}

.section-title {
  font-size: 12rem;
  writing-mode: vertical-lr;
  line-height: 1em;
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
</style>
