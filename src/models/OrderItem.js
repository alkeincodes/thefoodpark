import Base from '@/models/Base'

export default class OrderItem extends Base {
  static entity = 'order_items'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/order-items`,
    actions: {
      fetch: {
        url: '',
        dataKey: 'data',
        dataTransformer: (response) => {
          return response.data || []
        }
      }
    }
  }

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
      order_id: this.attr(null),
      price: this.attr(null),
      quantity: this.attr(null),
      ...super.fields()
    }
  }
}
