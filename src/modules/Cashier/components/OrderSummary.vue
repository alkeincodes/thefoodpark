<template>
  <div class="order-summary">
    <div class="order-summary__top">
      <h3 class="mb-4">Order Summary</h3>
      <el-radio-group v-model="orderType">
        <el-radio label="dine-in">Dine-in</el-radio>
        <el-radio label="takeout">Takeout</el-radio>
        <el-radio label="delivery">Delivery</el-radio>
      </el-radio-group>
      <el-table
        :data="orderedItems"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="Name"
        >
        </el-table-column>
        <el-table-column label="Price">
          <template slot-scope="scope">
            <vue-numeric
              v-model="scope.row.price"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="Quantity"
          align="center"
        >
        </el-table-column>
        <el-table-column label="Total">
          <template slot-scope="props">
            <!-- {{ props.row.price * props.row.quantity }} -->
            <vue-numeric
              :value="props.row.price * props.row.quantity"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </template>
        </el-table-column>
      </el-table>
      <vue-numeric
        v-model="receivedCash"
        class="el-input customer-cash mt-4"
        currency="₱"
        separator=","
        :precision="2"
      />
    </div>

    <div class="order-summary__bottom">
      <div class="order-summary-overall">
        <h1>Total:</h1>
        <div>
          <h1>
            <vue-numeric
              :value="overAllTotal"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </h1>
          <p class="text-hint" v-if="cashChange > 0">
            Change:
            <vue-numeric
              :value="cashChange"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </p>
        </div>
      </div>
      <div class="order-summary-cta">
        <el-button type="danger" plain>CANCEL</el-button>
        <el-button type="primary" @click="checkout">CHECKOUT</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Order from '@/models/Order'

export default {
  name: 'OrderSummary',
  components: { VueNumeric },
  computed: {
    orderedItems () {
      return this.$store.getters['cashier/orderedItems']
    },
    overAllTotal () {
      return this.orderedItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cashChange () {
      return this.receivedCash - this.overAllTotal
    }
  },
  data () {
    return {
      orderType: 'dine-in',
      receivedCash: 0
    }
  },
  methods: {
    checkout () {
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(async () => {
        // logic for checkout
        const order = {
          cashier_id: this.$store.getters['auth/user'].id,
          ordered_items: JSON.stringify(this.orderedItems),
          received_cash: this.receivedCash,
          total_price: this.overAllTotal
        }

        // this.axios.post('/create-order', order).then(({ data }) => {
        //   Order.insertOrUpdate(data)
        //   this.$router.push({ name: 'CashierHome' })
        //   this.$message({
        //     type: 'success',
        //     message: 'New Order Created Successfully!'
        //   })
        // })
        const { response: { data } } = await Order.api().createOrder(order)
        Order.insertOrUpdate(data)
        this.$router.push({ name: 'CashierHome' })
        this.$message({
          type: 'success',
          message: 'New Order Created Successfully!'
        })
        console.log(data)
      }).catch((e) => {
        console.log(e.response)
        this.$message({
          type: 'info',
          message: 'Action Cancelled'
        })
      })
    }
  }
}
</script>
