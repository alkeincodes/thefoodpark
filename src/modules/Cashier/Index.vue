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
      <order-list />
      <order-queue />
      <order-delivery />
    </div>
  </div>
</template>

<script>
import OrderList from '@/modules/Cashier/components/OrderList'
import OrderQueue from '@/modules/Cashier/components/OrderQueue'
import OrderDelivery from '@/modules/Cashier/components/OrderDelivery'

import AppHeader from '@/components/common/App/AppHeader'
import Sidenav from '@/components/common/App/Sidenav'

import Order from '@/models/Order'

export default {
  name: 'Cashier',
  components: {
    OrderList,
    OrderQueue,
    OrderDelivery,
    AppHeader,
    Sidenav
  },
  data () {
    return {
      search: ''
    }
  },
  async mounted () {
    const { response: { data } } = await Order.api().fetch()
    Order.insertOrUpdate({ data })
  }
}
</script>
