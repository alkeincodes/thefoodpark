import Base from '@/models/Base'

export default class User extends Base {
  static entity = 'orders'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/cashier`,
    actions: {
      fetch: {
        url: '/orders',
        dataKey: 'data'
      },
      createOrder (params) {
        return this.post('/orders', params)
      },
      updateOrder (params) {
        return this.put(`/orders/${params.id}`, params)
      }
    }
  }

  static fields () {
    return {
      id: this.attr(null),
      cashier_id: this.attr(null),
      ordered_items: this.attr([]),
      received_cash: this.attr(0),
      total_price: this.attr(0),
      type: this.attr(null),
      order_number: this.attr(null),
      status: this.attr(null)
    }
  }
}
