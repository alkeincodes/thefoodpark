<template>
  <div>
    <h1 class="mb-4">DASHBOARD</h1>
    <el-row :gutter="20">
      <el-col v-for="(item, key) in orders" :key="key" :span="6">
        <el-card class="box-card">
          <h1 class="text--success">{{ item.total }}</h1>
          <h5 class="mt-4">{{ item.name }}</h5>
        </el-card>
      </el-col>
    </el-row>
    <h1 style="margin-top: 25px;">Total Income: <vue-numeric :value="totalIncome" currency="₱" separator="," :precision="2" read-only /></h1>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'

export default {
  name: 'AdminHome',
  components: { VueNumeric },
  data () {
    return {
      orders: [],
      totalIncome: 0
    }
  },
  created () {
    this.axios.get('/admin/orders-by-food').then(({ data }) => {
      this.orders = data
      console.log('dataa: ', data)

      this.totalIncome = this.orders.reduce((total, order) => {
        return total + (order.price * +order.total)
      }, 0)

      console.log('totalIncome', this.totalIncome)
    })
  }
}
</script>
