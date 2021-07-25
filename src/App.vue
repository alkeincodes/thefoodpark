<template>
  <div id="app">
    <div class="main-container">
      <app-header />
      <sidenav />
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
  }
}
</script>

<style lang="scss">
  @import '@/sass/app.scss';
</style>
