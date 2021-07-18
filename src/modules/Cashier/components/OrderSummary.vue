<template>
  <div class="order-summary">
    <div class="order-summary__top">
      <h3 class="mb-4">Order Summary</h3>
      <el-table
        :data="orders"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="Price"
        >
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="Quantity"
        >
        </el-table-column>
        <el-table-column label="Total">
          <template slot-scope="props">
            {{ props.row.price * props.row.quantity }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="order-summary__bottom">
      <div class="order-summary-overall">
        <h1>Total:</h1>
        <h1>P0.00</h1>
      </div>
      <div class="order-summary-cta">
        <el-button type="danger" plain>CANCEL</el-button>
        <el-button type="primary">CHECKOUT</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
  data () {
    return {
      orders: [
        {
          name: 'Product Name 1',
          quantity: 3,
          price: 30
        },
        {
          name: 'Product Name 1',
          quantity: 5,
          price: 30
        },
        {
          name: 'Product Name 1',
          quantity: 1,
          price: 30
        }
      ]
    }
  }
}
</script>
