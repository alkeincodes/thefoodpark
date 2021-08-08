<template>
  <div class="products">
    <div class="products__list">
      <div
        v-for="(item, key) in data.menus.filter((m) =>
          m.name.toLowerCase().includes(searchMenu.toLowerCase())
        )"
        :key="key"
        class="product-menu"
      >
        <h3 v-if="key == 0" class="mb-4 category-name">
          {{ data.name }}
        </h3>
        <img
          :src="`${filePath}/menus/${item.image}`"
          alt="Image Title"
          class="product-menu__image"
          @click="$emit('select-menu', item)"
        />
        <div class="product-menu__info">
          <h3>{{ item.name }}</h3>
          <p>
            <vue-numeric
              :value="item.price"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'

export default {
  name: 'CategorizeProducts',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { VueNumeric },
  computed: {
    searchMenu() {
      return this.$store.getters['cashier/searchMenu']
    }
  }
}
</script>
