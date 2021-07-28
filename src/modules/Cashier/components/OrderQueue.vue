<template>
  <div class="order-queue component-padding-top horizontal-scroll">
    <h3 class="site-title">Order Queue</h3>
    <div class="queue-cards">
      <div class="card order-card" v-for="item in queuedOrderItems" :key="item.id">
        <h1 class="mt-2">{{ item.order_number }}</h1>
        <component :is="`icon-${item.order_type}`" />
        <div class="price">
          <span class="txt-hint">Total Price:</span>
          <p class="amount">
            <vue-numeric
              :value="item.total"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </p>
        </div>
        <hr>
        <div class="card-cta">
          <el-button type="danger" plain @click="cancelOrder(item.id)"><i class="el-icon-close"></i></el-button>
          <el-button type="success" plain @click="setOrderDone(item.id)"><i class="el-icon-check"></i></el-button>
        </div>
      </div>
      <div class="scroll-fader" style="height: 270px;" />
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Order from '@/models/Order'

export default {
  name: 'OrderQueue',
  components: {
    VueNumeric
  },
  computed: {
    queuedOrderItems () {
      // return this.orderItems.filter(({ status }) => status === 'preparing')
      console.log(Order.query().all())
      return Order.all()
    },
    orderItems () {
      return this.$store.getters['cashier/orderItems']
    }
  },
  methods: {
    setOrderDone (id) {
      this.$confirm('Are you sure this order is done?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.$store.commit('cashier/SET_ORDER_STATUS', { id, status: 'done' })
        this.$message({
          type: 'success',
          message: 'Order updated successfully!'
        })
      }).catch(() => {})
    },
    cancelOrder (id) {
      this.$confirm('Are you sure you want to cancel this order?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.$store.commit('cashier/SET_ORDER_STATUS', { id, status: 'cancelled' })
        this.$message({
          type: 'success',
          message: 'Order cancelled successfully!'
        })
      }).catch(() => {})
    }
  },
  async mounted () {
    const { response: { data } } = await Order.api().fetch()
    Order.insertOrUpdate({ data })
    console.log('order')
  }
}
</script>
