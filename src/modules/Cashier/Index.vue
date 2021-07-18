<template>
  <div class="order-page">
    <div class="order-page__left">
      <app-header />
      <categorize-products
        v-for="(menu, key) in foodMenu"
        :key="key"
        :data="menu"
        @select-menu="selectMenu"
      />
    </div>
    <div class="order-page__right">
      <order-summary />
    </div>
    <el-dialog
      :visible.sync="isDialogOpen"
      id="selected-menu-modal"
      width="30%"
      center
    >
      <div class="selected-menu-item">
        <img
          :src="selectedMenu.image"
          :alt="selectedMenu.name"
        >
        <div class="selected-menu-item__title mt-2">How many <strong>{{ selectedMenu.name }}?</strong></div>
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
        <el-button type="danger" @click="isDialogOpen = false" plain>Cancel</el-button>
        <el-button type="primary" @click="isDialogOpen = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AppHeader from '@/components/common/App/AppHeader'
import CategorizeProducts from '@/modules/Cashier/components/CategorizeProducts'
import OrderSummary from '@/modules/Cashier/components/OrderSummary'

export default {
  name: 'Welcome',
  components: {
    AppHeader,
    CategorizeProducts,
    OrderSummary
  },
  data () {
    return {
      isDialogOpen: false,
      quantity: 1,
      isQtyReadOnly: true
    }
  },
  computed: {
    foodMenu () {
      return this.$store.getters['cashier/foodMenu']
    },
    selectedMenu () {
      return this.$store.getters['cashier/selectedMenu']
    }
  },
  methods: {
    selectMenu (item) {
      this.$store.commit('cashier/SET_SELECTED_MENU', item)
      this.isDialogOpen = !this.isDialogOpen
    },
    samp () {
      alert('df')
    }
  }
}
</script>
