<template>
  <div>
    <h1>DASHBOARD</h1>
    <el-table
    :data="orderItems"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="Quantity"
      width="180">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import OrderItem from '@/models/OrderItem'

export default {
  name: 'AdminHome',
  computed: {
    orderItems () {
      console.log()
      return OrderItem.all()
    }
  },
  async created () {
    await OrderItem.api().fetch()
  }
}
</script>
