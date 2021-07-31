import { Database } from '@vuex-orm/core'
import Order from '@/models/Order'
import OrderItem from '@/models/OrderItem'

const database = new Database()

database.register(Order)
database.register(OrderItem)

export default database
