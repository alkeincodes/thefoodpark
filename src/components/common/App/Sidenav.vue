<template>
  <div
    class="sidenav"
    :class="{open: isHover}"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="sidenav__logo mb-4">
      <img src="https://source.unsplash.com/random/150x150">
    </div>
    <ul class="sidenav__link mt-4">
      <template v-for="(item, key) in routeLinks">
        <li v-if="!item.meta.isHidden" :key="key">
          <router-link :to="item.path">
            <component :is="`icon-${item.meta.icon}`"></component> <span>{{ item.meta.navName }}</span>
          </router-link>
        </li>
      </template>

    </ul>
    <router-link to="/logout" class="nav-logout">
      <icon-logout /> <span>Logout</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  data () {
    return {
      isHover: false
    }
  },
  computed: {
    routeLinks () {
      return this.$router.options.routes
    }
  },
  created () {

  }
}
</script>
