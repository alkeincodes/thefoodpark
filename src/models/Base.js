import { Model } from '@vuex-orm/core'
import { set } from '@/utils/helpers'

export default class Base extends Model {
  static fields() {
    return {
      initial: Model.attr(''),
      created_at: Model.attr(null),
      updated_at: Model.attr(null)
    }
  }

  watchFields = []

  setInitial(model) {
    model = model || this
    set(
      model,
      'initial',
      JSON.stringify(
        Object.fromEntries(
          this.watchFields.map((field) => [field, model[field]])
        )
      )
    )
  }

  async resetToInitial() {
    const initialObj = JSON.parse(this.initial)
    return await this.$update({
      id: this.$id,
      ...initialObj
    })
  }

  get hasChanged() {
    if (!this.initial || !this.current) return false
    return this.initial !== this.current
  }

  static beforeCreate(model) {
    model.setInitial(model)
  }
}
