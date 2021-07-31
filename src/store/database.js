import { Database } from '@vuex-orm/core'
import Order from '@/models/Order'
import OrderItem from '@/models/OrderItem'
import Menu from '@/models/Menu'
import Category from '@/models/Category'

const database = new Database()

database.register(Order)
database.register(OrderItem)
database.register(Menu)
database.register(Category)

export default database
