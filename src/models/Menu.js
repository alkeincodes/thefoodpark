import Base from '@/models/Base'
import Category from '@/models/Category'

export default class Menu extends Base {
  static entity = 'menus'

  static apiConfig = {
    baseURL: `${process.env.VUE_APP_API_URL}/api/admin/menus`,
    actions: {
      fetch: {
        url: '',
        dataKey: 'data',
        dataTransformer: response => {
          return response.data || []
        }
      },
      createMenu (params) {
        return this.post('', params)
      },
      deleteMenu (params) {
        return this.delete(`/${params.id}`, params)
      }
    }
  }

  static fields () {
    return {
      id: this.attr(null),
      category_id: this.attr(null),
      category: this.belongsTo(Category, 'category_id'),
      name: this.attr(null),
      price: this.attr(null),
      image: this.attr(null),
      ...super.fields()
    }
  }
}
