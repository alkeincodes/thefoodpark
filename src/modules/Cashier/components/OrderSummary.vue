<template>
  <div class="order-summary">
    <div class="order-summary__top">
      <h3 class="mb-4">Order Summary</h3>
      <el-radio-group v-model="orderType">
        <el-radio label="dine-in">Dine-in</el-radio>
        <el-radio label="takeout">Takeout</el-radio>
        <el-radio label="delivery">Delivery</el-radio>
      </el-radio-group>
      <el-input
        v-model="tableNumber"
        class="table-number mt-4"
        placeholder="Table Number"
        type="number"
      />
      <p class="text-hint mt-1 mb-4">Automatically prefix with 'Table'</p>
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
          <template slot-scope="props">
            <vue-numeric
              v-model="props.row.price"
              currency="₱"
              separator=","
              :precision="2"
              read-only
            />
          </template>
        </el-table-column>
        <el-table-column label="Quantity" align="center" >
          <template slot-scope="props">
            <el-input v-if="toggleQtyEdit" @blur="toggleQtyEdit = false" v-model="props.row.quantity" />
            <span v-else @click="toggleQtyEdit = true">{{ props.row.quantity }}</span>
          </template>
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
        <el-table-column width="50">
          <template slot-scope="props">
            <el-button size="mini" type="danger" @click="$store.commit('cashier/REMOVE_ORDERED_ITEM', props.row.id)" icon="el-icon-delete" circle plain />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="order-summary__bottom">
      <div class="cash-received">
        <vue-numeric
          v-model="receivedCash"
          class="el-input mt-4"
          :class="{error: receivedCashError}"
          currency="₱"
          separator=","
          :precision="2"
          @blur="checkCash"
        />
        <p class="text-hint text--danger mt-1" v-if="receivedCashError">{{ receivedCashError }}</p>
      </div>
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
        <el-button type="primary" :disabled="receivedCash <= 0 || !tableNumber || orderedItems.length == 0" @click="checkout">CHECKOUT</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'
import Order from '@/models/Order'

export default {
  name: 'OrderSummary',
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  },
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
      receivedCash: 0,
      tableNumber: null,
      receivedCashError: null,
      toggleQtyEdit: false
    }
  },
  watch: {
    receivedCash (val) {
      if (val > 0) this.receivedCashError = null
    }
  },
  methods: {
    checkCash () {
      if (this.receivedCash < this.overAllTotal) this.receivedCashError = 'The received cash is less than the overall total'
    },
    checkout () {
      const newOrderCounter = +localStorage.getItem('order_counter') + 1
      const str = '' + newOrderCounter
      const pad = '0000'
      const padNumber = pad.substring(0, pad.length - str.length) + str
      console.log(padNumber)
      if (this.receivedCash >= this.overAllTotal) {
        this.$confirm('Are you sure?', 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(async () => {
          // logic for checkout
          const order = {
            cashier_id: this.$store.getters['auth/user'].id,
            ordered_items: this.orderedItems,
            received_cash: this.receivedCash,
            total_price: this.overAllTotal,
            type: this.orderType,
            order_number: `#${padNumber}`,
            table_number: this.tableNumber
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

          // update order counter
          localStorage.setItem('order_counter', newOrderCounter)

          this.$router.push({ name: 'CashierHome' })
          this.$store.commit('cashier/CLEAR_ORDERED_ITEMS')

          this.$message({
            type: 'success',
            message: 'New Order Created Successfully!'
          })
        }).catch((e) => {
          console.error(e.response.data.errors)
          this.$message({
            type: 'error',
            message: 'Something went wrong!'
          })
        }).finally(() => {
          this.receivedCashError = null
        })
      } else {
        this.receivedCashError = 'The received cash is less than the overall total'
      }
    }
  }
}
</script>
