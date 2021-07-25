import Vue from 'vue'

export const set = (target, property, value) => {
  let properties = target
  let parentProperties = target
  let parentKey = ''

  if (property.split('.').length > 1) {
    const keys = property.split('.')
    keys.forEach((key, index) => {
      if (index < property.split('.').length - 1) {
        if (!properties) {
          Vue.set(parentProperties, parentKey, {})
          properties = parentProperties[parentKey]
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!properties.hasOwnProperty(key)) {
          Vue.set(properties, key, {})
        }
        parentProperties = properties
        parentKey = key
        properties = properties[key]
      } else {
        Vue.set(properties, key, value)
      }
    })
  } else {
    Vue.set(properties, property, value)
  }

  if (target.$update) {
    target.$update(target)
  }

  return target
}

export const finalPrice = (price, offSale) => {
  return `P${parseInt(price - (price * (offSale / 100))).toFixed(2)}`
}
