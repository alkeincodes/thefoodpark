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
            <img src="@/assets/prof.jpg" alt="Profile Picture" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$store.dispatch('auth/logout')"
              ><span class="text--danger">Logout</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button
        type="primary"
        class="mt-4"
        icon="el-icon-plus"
        @click="$router.push({ name: 'NewOrder' })"
        >New Order</el-button
      >
      <order-list
        v-if="processedOrder.length"
        :items="processedOrder"
        @select-item="selectOrder"
      />
      <order-queue
        v-if="queuedOrderItems.length"
        :items="queuedOrderItems"
        @select-item="selectOrder"
      />
      <!-- <order-delivery /> -->

      <!-- SHOW ORDER -->
      <el-dialog
        title="Selected Order"
        :visible.sync="isShowOrder"
      >

        <h2 class="mb-2" v-if="selectedOrder.table_number">Table Number: #{{ selectedOrder.table_number }}</h2>
        <h2 class="mb-2" v-else>Order Type: TakeOut</h2>
        <h3 class="mb-2">Time of Order: {{ moment(selectedOrder.created_at).format('h:mm a') }}</h3>
        <h3 class="mb-2">
          Total Price:
          <vue-numeric
            :value="selectedOrder.total_price"
            currency="₱"
            separator=","
            :precision="2"
            read-only
          />
        </h3>
        <h3 class="mb-2">
          Change:
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
          <el-table-column label="Status">
            <template slot-scope="props">
              <el-checkbox
                v-model="props.row.status"
                @change="updateItemStatus(props.row, $event)"
                :true-label="1"
                :false-label="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="props">
              <el-button type="danger" @click="deleteItem(props.row.id)" round><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
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
// import OrderDelivery from '@/modules/Cashier/components/OrderDelivery'
import VueNumeric from 'vue-numeric'

import Order from '@/models/Order'
import OrderItem from '@/models/OrderItem'
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    OrderList,
    OrderQueue,
    // OrderDelivery,
    AppHeader,
    Sidenav,
    VueNumeric
  },
  computed: {
    queuedOrderItems () {
      return Order.query().where('status', 'preparing').with('order_items').get()
    },
    processedOrder () {
      return Order.query().where('status', 'done').orWhere('status', 'cancelled').with('order_items').get()
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
    const {
      response: { data }
    } = await Order.api().fetch()
    Order.insertOrUpdate({ data })
  },
  methods: {
    moment,
    selectOrder (item) {
      console.log('select: ', item)
      this.$store.commit('cashier/SET_SELECTED_ORDER', item)
      this.isShowOrder = true
    },
    async updateItemStatus (item) {
      const { response: { data } } = await OrderItem.api().updateItem(item)
      console.log('res: ', data)
      OrderItem.insertOrUpdate({ data })
      this.$message({
        type: 'success',
        message: 'Order updated successfully!'
      })
    },
    async deleteItem (id) {
      

      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        await OrderItem.delete(id)
        this.$message({
          type: 'success',
          message: 'Order Item deleted successfully!'
        })
      })      
    }
  }
}
</script>
