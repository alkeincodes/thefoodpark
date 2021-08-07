<template>
  <div class="order-page">
    <div class="order-page__left">
      <div class="search-box">
        <el-input v-model="searchMenu" placeholder="Search a menu"></el-input>
        <el-button type="primary">Search</el-button>
      </div>
      <categorize-products
        v-for="(menu, key) in categorizedMenu"
        :key="key"
        :data="menu"
        @select-menu="selectMenu"
      />
    </div>
    <div class="order-page__right">
      <order-summary />
    </div>
    <el-dialog
      id="selected-menu-modal"
      :visible.sync="isDialogOpen"
      width="30%"
      center
    >
      <div class="selected-menu-item">
        <img
          :src="`${filePath}/menus/${selectedMenu.image}`"
          :alt="selectedMenu.name"
        >
        <div class="selected-menu-item__title mt-2">How many
          <strong>
            {{ selectedMenu.name }} @
            <vue-numeric
                :value="selectedMenu.price"
                currency="₱"
                separator=","
                :precision="2"
                read-only
            />?
          </strong>
        </div>
        <div class="readonly-container" @click="isQtyReadOnly = !isQtyReadOnly">
          <el-input
            v-model="quantity"
            class="item-qty"
            :readonly="isQtyReadOnly"
            @blur="isQtyReadOnly = !isQtyReadOnly"
          />
        </div>
        <span class="hint">click to edit</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancelSelectedOrder" plain>Cancel</el-button>
        <el-button type="primary" @click="confirmOrder">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CategorizeProducts from '@/modules/Cashier/components/CategorizeProducts'
import OrderSummary from '@/modules/Cashier/components/OrderSummary'

import Category from '@/models/Category'

import VueNumeric from 'vue-numeric'

export default {
  name: 'Welcome',
  components: {
    CategorizeProducts,
    OrderSummary,
    VueNumeric
  },
  data () {
    return {
      isDialogOpen: false,
      quantity: 1,
      isQtyReadOnly: true,
      search: ''
    }
  },
  computed: {
    foodMenu () {
      return this.$store.getters['cashier/foodMenu']
    },
    selectedMenu () {
      return this.$store.getters['cashier/selectedMenu']
    },
    categorizedMenu () {
      return Category.query().with('menus').get()
    },
    searchMenu: {
      get () {
        return this.$store.getters['cashier/searchMenu']
      },
      set (val) {
        this.$store.commit('cashier/SET_SEARCH_MENU', val)
      }
    }
  },
  methods: {
    reset () {
      this.quantity = 1
      this.$store.commit('cashier/SET_SELECTED_MENU', {})
    },
    selectMenu (item) {
      this.quantity = item.quantity || 1
      this.$store.commit('cashier/SET_SELECTED_MENU', item)
      this.isDialogOpen = !this.isDialogOpen
    },
    cancelSelectedOrder () {
      this.isDialogOpen = false
      this.reset()
    },
    confirmOrder () {
      this.$store.commit('cashier/SET_ORDERED_ITEMS', this.quantity)
      this.isDialogOpen = false
      this.reset()
    }
  },
  async created () {
    await Category.api().fetch()
  }
}
</script>
