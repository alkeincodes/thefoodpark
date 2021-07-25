import { Database } from '@vuex-orm/core'
import Order from '@/models/Order'

const database = new Database()

database.register(Order)

export default database
