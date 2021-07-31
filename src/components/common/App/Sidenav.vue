<template>
  <aside
    class="sidenav"
    :class="{open: isHover}"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="sidenav__logo mb-4 mt-4">
      <img src="@/assets/the_food_park_logo.png">
    </div>
    <ul class="sidenav__link mt-4">
      <template v-for="(item, key) in routeLinks.children">
        <li v-if="!item.meta.isHidden" :key="key">
          <router-link :to="{ name: item.name }">
            <component :is="`icon-${item.meta.icon}`"></component> <span>{{ item.meta.navName }}</span>
          </router-link>
          <!-- <el-collapse v-else v-model="activeCollapse">
            <el-collapse-item name="1">
              <template slot="title">
                <component :is="`icon-${item.meta.icon}`"></component> <span>{{ item.meta.navName }}</span>
              </template>
              <router-link v-for="itemChildren in item.children" :to="itemChildren.path" :key="itemChildren.id">
                <component :is="`icon-${itemChildren.meta.icon}`"></component> <span>{{ itemChildren.meta.navName }}</span>
              </router-link>
            </el-collapse-item>
          </el-collapse> -->
        </li>
      </template>
    </ul>
    <a href="#" @click="$store.dispatch('auth/logout')" class="nav-logout">
      <icon-logout /> <span>Logout</span>
    </a>
  </aside>
</template>

<script>
export default {
  name: 'Sidenav',
  data () {
    return {
      isHover: false,
      activeCollapse: ['1']
    }
  },
  computed: {
    routeLinks () {
      const userRole = this.$store.getters['auth/user'].role

      return this.$router.options.routes.find(({ name }) => name === userRole)
    }
  }
}
</script>
