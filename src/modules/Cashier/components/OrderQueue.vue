<template>
  <div class="order-queue component-padding-top horizontal-scroll">
    <h3 class="site-title">Order Queue</h3>
    <div class="queue-cards">
      <div
        class="card order-card"
        v-for="item in items"
        :key="item.id"
        @click="$emit('select-item', item)"
      >
        <h1 class="mt-2">{{ item.order_number }}</h1>
        <component :is="`icon-${item.type}`" />
        <div class="price">
          <span class="txt-hint">Total Price:</span>
          <p class="amount">
            <vue-numeric
              :value="item.total_price"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </p>
        </div>
        <hr />
        <div class="card-cta">
          <el-button type="danger" plain @click.stop="cancelOrder(item)"
            ><i class="el-icon-close"></i
          ></el-button>
          <el-button type="success" plain @click.stop="setOrderDone(item)"
            ><i class="el-icon-check"></i
          ></el-button>
        </div>
      </div>
      <div class="scroll-fader" style="height: 270px" />
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Order from '@/models/Order'

export default {
  name: 'OrderQueue',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  components: {
    VueNumeric
  },
  computed: {
    orderItems () {
      return this.$store.getters['cashier/orderItems']
    }
  },
  created () {
    console.log('items: ', this.items)
  },
  methods: {
    setOrderDone (item) {
      this.$confirm('Are you sure this order is done?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      })
        .then(async () => {
          item.status = 'done'
          const {
            response: { data }
          } = await Order.api().updateOrder(item)
          Order.insertOrUpdate(data)
          this.$message({
            type: 'success',
            message: 'Order updated successfully!'
          })
        })
        .catch(() => {})
    },
    cancelOrder (item) {
      this.$confirm('Are you sure you want to cancel this order?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      })
        .then(async () => {
          item.status = 'cancelled'
          await Order.api().updateOrder(item)
          this.$message({
            type: 'success',
            message: 'Order cancelled successfully!'
          })
        })
        .catch(() => {})
    }
  }
}
</script>
