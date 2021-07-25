<template>
  <div class="component-padding-top">
    <el-table
      :data="data"
      class="responsive-table"
      style="width: 100%"
    >
      <el-table-column label="Customer">
        <template slot-scope="prop">
          <div class="cell-name">Customer</div>
          <div class="cell-content">{{ prop.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Order Number">
        <template slot-scope="prop">
          <div class="cell-name">Order Number</div>
          <div class="cell-content">{{ prop.row.order_number }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Contact Number">
        <template slot-scope="prop">
          <div class="cell-name">Contact Number</div>
          <div class="cell-content">{{ prop.row.contact_number }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Order Items">
        <template slot-scope="prop">
          <div class="cell-name">Order Items</div>
          <div class="cell-content">{{ prop.row.order_item }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="prop">
          <div class="cell-name">Status</div>
          <div
            class="cell-content delivery-status"
            :class="{
              'text--success': prop.row.status == 'done',
              'text--warning': prop.row.status == 'preparing',
              'text--primary': prop.row.status == 'delivering',
            }"
          >
            {{ prop.row.status }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TableResizeMixin from '@/utils/table.mixin'

export default {
  name: 'OrderDelivery',
  mixins: [TableResizeMixin],
  data () {
    return {
      data: [
        {
          name: 'Customer 1',
          order_number: '#001',
          address: 'Some Street No. 2',
          contact_number: '09123456789',
          order_items: [],
          status: 'done'
        },
        {
          name: 'Customer 1',
          order_number: '#001',
          address: 'Some Street No. 2',
          contact_number: '09123456789',
          order_items: [],
          status: 'preparing'
        },
        {
          name: 'Customer 1',
          order_number: '#001',
          address: 'Some Street No. 2',
          contact_number: '09123456789',
          order_items: [],
          status: 'preparing'
        },
        {
          name: 'Customer 1',
          order_number: '#001',
          address: 'Some Street No. 2',
          contact_number: '09123456789',
          order_items: [],
          status: 'delivering'
        }
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      this.resizeTableRow()
    })
  }
}
</script>
