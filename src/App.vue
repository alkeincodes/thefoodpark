<template>
  <div id="app">
    <div class="main-container">
      <app-header v-if="$route.name !== 'Login'" />
      <sidenav v-if="$route.name !== 'Login'" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/App/AppHeader'
import Sidenav from '@/components/common/App/Sidenav'

export default {
  name: 'App',
  components: {
    AppHeader,
    Sidenav
  },
  created () {
    console.log('@VUE_APP_API_URL: ', process.env.VUE_APP_API_URL)
  }
}
</script>

<style lang="scss">
  @import '@/sass/app.scss';
</style>
