import Base from '@/models/Base'

export default class User extends Base {
  static entity = 'orders'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/cashier/orders`,
    actions: {
      fetch: {
        url: '',
        dataKey: 'data'
      },
      createOrder (params) {
        return this.post('', params)
      }
    }
  }

  static fields () {
    return {
      id: this.attr(null),
      cashier_id: this.attr(null),
      ordered_items: this.attr([]),
      received_cash: this.attr(0),
      total_price: this.attr(0)
    }
  }
}
