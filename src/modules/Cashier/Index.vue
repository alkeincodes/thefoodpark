<template>
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
</template>

<script>
import OrderList from '@/modules/Cashier/components/OrderList'
import OrderQueue from '@/modules/Cashier/components/OrderQueue'
import OrderDelivery from '@/modules/Cashier/components/OrderDelivery'

export default {
  name: 'Cashier',
  components: {
    OrderList,
    OrderQueue,
    OrderDelivery
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
