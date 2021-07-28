<template>
  <div class="component-padding-top">
    <h3 class="site-title">Order List</h3>
    <div class="order-list">
      <el-button
        v-for="item in servedOrderItems"
        :key="item.id"
        :type="item.status === 'done' ? 'success' : 'danger'"
        plain
      >
        <i :class="`el-icon-${item.status === 'done' ? 'check' : 'close'}`"></i> {{ item.order_number }}
      </el-button>
      <div class="scroll-fader" style="height: 60px;" />
    </div>
  </div>
</template>

<script>
import Order from '@/models/Order'

export default {
  name: 'OrderList',
  computed: {
    servedOrderItems () {
      return Order.query().where('status', 'done').orWhere('status', 'cancelled').get()
    },
    orderItems () {
      return this.$store.getters['cashier/orderItems']
    }
  }
}
</script>
