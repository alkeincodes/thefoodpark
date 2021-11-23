<template>
  <div class="component-padding-top">
    <h3 class="site-title">Order List ({{ items.length }})</h3>
    <div class="order-list">
      <el-button
        v-for="item in items"
        :key="item.id"
        :type="item.status === 'done' ? 'success' : 'danger'"
        plain
        @click="$emit('select-item', item)"
      >
        <i :class="`el-icon-${item.status === 'done' ? 'check' : 'close'}`"></i>
        {{ item.table_number ? `#${item.table_number}` : 'TakeOut' }}
      </el-button>
      <div class="scroll-fader" style="height: 60px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    orderItems () {
      return this.$store.getters['cashier/orderItems']
    }
  }
}
</script>
