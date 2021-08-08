<template>
  <div>
    <app-header v-if="$route.name !== 'Login'" />
    <sidenav v-if="$route.name !== 'Login'" />
    <div class="main-padding">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/App/AppHeader'
import Sidenav from '@/components/common/App/Sidenav'

import Menu from '@/models/Menu'
import Category from '@/models/Category'

export default {
  name: 'Admin',
  components: {
    AppHeader,
    Sidenav
  },
  created() {
    console.log('route: ', this.$route)
  },
  async mounted() {
    await Menu.api().fetch()
    await Category.api().fetch()
  }
}
</script>
