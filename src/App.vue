<template>
  <div id="app">
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import '@/sass/app.scss';
</style>
