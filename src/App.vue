<template>
  <div id="app">
    <div class="user-container">
      <div class="main-content">
        <router-view></router-view>
      </div>
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
