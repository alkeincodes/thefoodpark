import Base from '@/models/Base'
import OrderItem from '@/models/OrderItem'

export default class Order extends Base {
  static entity = 'orders'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/orders`,
    actions: {
      fetch: {
        url: '',
        dataKey: 'data',
        dataTransformer: (response) => {
          return response.data || []
        }
      },
      createOrder(params) {
        return this.post('', params)
      },
      updateOrder(params) {
        return this.put(`/orders/${params.id}`, params)
      }
    }
  }

  static fields() {
    return {
      id: this.attr(null),
      cashier_id: this.attr(null),
      order_items: this.hasMany(OrderItem, 'order_id'),
      received_cash: this.attr(0),
      total_price: this.attr(0),
      type: this.attr(null),
      order_number: this.attr(null),
      status: this.attr(null),
      table_number: this.attr(null),
      ...super.fields()
    }
  }
}
