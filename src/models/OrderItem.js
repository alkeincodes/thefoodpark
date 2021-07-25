import Base from '@/models/Base'

export default class User extends Base {
  static entity = 'order-items'

  static fields () {
    return {
      id: this.attr(null),
      order_id: this.attr(null),
      name: this.attr(null),
      price: this.attr(0),
      quantity: this.attr(null),
      total: this.attr(0)
    }
  }
}
