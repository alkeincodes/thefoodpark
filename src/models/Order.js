import Base from '@/models/Base'
import OrderItem from '@/models/OrderItem'

export default class User extends Base {
  // This is the name used as module name of the Vuex Store.
  static entity = 'orders'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.attr(null),
      cashier_id: this.attr(null),
      order_items: this.hasMany(OrderItem, 'order_id'),
      received_cash: this.attr(0),
      total_price: this.attr(0)
    }
  }
}
