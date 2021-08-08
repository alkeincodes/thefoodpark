import Base from '@/models/Base'
import Menu from '@/models/Menu'

export default class Category extends Base {
  static entity = 'categories'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/admin/categories`,
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

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      description: this.attr(null),
      menus: this.hasMany(Menu, 'category_id'),
      ...super.fields()
    }
  }
}
