<template>
  <v-app id="app">
    <router-view/>
    <div v-if="$store.state.backEndError" class="error--text text-center">{{ $store.state.backEndError }}</div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('loadFees')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
