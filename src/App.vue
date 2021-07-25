<template>
  <div id="app">
    <div class="main-container">
      <app-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/App/AppHeader'

export default {
  name: 'App',
  components: { AppHeader }
}
</script>

<style lang="scss">
  @import '@/sass/app.scss';
</style>
