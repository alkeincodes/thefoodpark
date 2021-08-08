<template>
  <div id="app">
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log('@VUE_APP_API_URL: ', process.env.VUE_APP_API_URL)

    // this is to set the prefix of the order number
    const prefix = this.moment().format('MM-DD-YYYY-')
    if (!localStorage.getItem('order_date_prefix')) {
      localStorage.setItem('order_date_prefix', prefix)
      localStorage.setItem('order_counter', 0)
    } else if (localStorage.getItem('order_date_prefix') !== prefix) {
      localStorage.setItem('order_date_prefix', prefix)
      localStorage.setItem('order_counter', 0)
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/app.scss';
</style>
