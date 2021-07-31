<template>
  <div>
    <app-header v-if="$route.name !== 'Login'" />
    <sidenav v-if="$route.name !== 'Login'" />
    <div class="cashier main-padding">
      <div class="cashier__header">
        <el-input
          v-model="search"
          class="search-box"
          placeholder="Search..."
          prefix-icon="el-icon-search"
        />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/prof.jpg" alt="Profile Picture">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$store.dispatch('auth/logout')"><span class="text--danger">Logout</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button type="primary" class="mt-4" icon="el-icon-plus" @click="$router.push({ name: 'NewOrder' })">New Order</el-button>
      <order-list v-if="processedOrder.length" :items="processedOrder" />
      <order-queue
        v-if="queuedOrderItems.length"
        :items="queuedOrderItems"
        @select-item="selectOrder"
      />
      <order-delivery />

      <!-- SHOW ORDER -->
    <el-dialog :title="`Selected Order: ${selectedOrder.order_number}`" :visible.sync="isShowOrder">
      <h1 class="mb-2">Order Number: {{ selectedOrder.order_number }}</h1>
      <h2 class="mb-2">Table Number: {{ selectedOrder.table_number }}</h2>
      <h3 class="mb-2">Total Price:
        <vue-numeric
          :value="selectedOrder.total_price"
          currency="₱"
          separator=","
          :precision="2"
          read-only
        />
      </h3>
      <h3 class="mb-2">Change:
        <vue-numeric
          :value="selectedOrder.received_cash - selectedOrder.total_price"
          currency="₱"
          separator=","
          :precision="2"
          read-only
        />
      </h3>
      <el-table :data="selectedOrder.order_items">
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Price">
          <template slot-scope="props">
            <vue-numeric
              :value="props.row.price"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </template>
        </el-table-column>
        <el-table-column label="Quantity" prop="quantity"></el-table-column>
      </el-table>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/common/App/AppHeader'
import Sidenav from '@/components/common/App/Sidenav'

import OrderList from '@/modules/Cashier/components/OrderList'
import OrderQueue from '@/modules/Cashier/components/OrderQueue'
import OrderDelivery from '@/modules/Cashier/components/OrderDelivery'
import VueNumeric from 'vue-numeric'

import Order from '@/models/Order'
// import OrderItem from '@/models/OrderItem'

export default {
  name: 'Home',
  components: {
    OrderList,
    OrderQueue,
    OrderDelivery,
    AppHeader,
    Sidenav,
    VueNumeric
  },
  computed: {
    queuedOrderItems () {
      return Order.query().where('status', 'preparing').with('order_items').get()
    },
    processedOrder () {
      return Order.query().where('status', 'done').orWhere('status', 'cancelled').get()
    },
    selectedOrder () {
      return this.$store.getters['cashier/selectedOrder']
    }
  },
  data () {
    return {
      search: '',
      isShowOrder: false
    }
  },
  async mounted () {
    const { response: { data } } = await Order.api().fetch()
    Order.insertOrUpdate({ data })
  },
  methods: {
    selectOrder (item) {
      this.$store.commit('cashier/SET_SELECTED_ORDER', item)
      this.isShowOrder = true
    }
  }
}
</script>
