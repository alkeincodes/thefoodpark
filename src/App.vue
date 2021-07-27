<template>
  <div id="app">
    <div class="main-container">
      <div v-if="isLoading" class="page-loading">Loading...</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isLoading () {
      return this.$store.getters['auth/isLoading']
    }
  },
  mounted () {
    // console.log('@VUE_APP_API_URL: ', process.env.VUE_APP_API_URL)
    this.$store.dispatch('auth/authenticate')
  }
}
</script>

<style lang="scss">
  @import '@/sass/app.scss';
</style>
