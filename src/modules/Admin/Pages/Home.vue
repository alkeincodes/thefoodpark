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
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      orders: []
    }
  },
  created () {
    this.axios.get('/admin/orders-by-food').then(({ data }) => {
      this.orders = data
    })
  }
}
</script>
