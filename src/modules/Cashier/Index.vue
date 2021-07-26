<template>
  <div>
    <app-header v-if="$route.name !== 'Login'" />
    <sidenav v-if="$route.name !== 'Login'" />
    <div class="cashier main-padding">
      <el-input
        v-model="search"
        class="search-box"
        placeholder="Search..."
        prefix-icon="el-icon-search"
      />
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
  created () {

  }
}
</script>
