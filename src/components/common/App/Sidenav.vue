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
      <li class="active">
        <router-link to="#">
          <icon-home /> <span>Link 1</span>
        </router-link>
      </li>
      <li>
        <router-link to="#1">
          <icon-home /> <span>Link 2</span>
        </router-link>
      </li>
      <li>
        <router-link to="#2">
          <icon-home /> <span>Link 3</span>
        </router-link>
      </li>
      <li>
        <router-link to="#3">
          <icon-home /> <span>Link 4</span>
        </router-link>
      </li>
      <li>
        <router-link to="#4">
          <icon-home /> <span>Link 5</span>
        </router-link>
      </li>
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
  }
}
</script>
