<template>
    <v-card class="value-card mb-6 blue lighten-5" elevation="5">
        <div class="d-flex align-center pa-4">
            <h1 class="number" data-test-id="card-number"> {{ number }}</h1>
            <div class="d-flex flex-column">
                <v-card-title class="title text-h3 font-weight-black" data-test-id="card-title"> {{ title }} </v-card-title>
                <v-card-text class="blue--text text--darken-4">
                    <slot></slot>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn text>Delete</v-btn>
                    <v-btn>Edit</v-btn>
                </v-card-actions>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['number', 'title']
}
</script>

<style scoped>
.number {
    font-size: 7rem;
}
.title {
    color: #041a3b
}
</style>