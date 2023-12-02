import find from 'lodash/find'
import remove from 'lodash/remove'
import { calculateDiscount } from './discount_utils'
import { Money } from './money'

export default class Cart {
  items = []

  add(item) {
    const itemToFind = { product: item.product }
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind)
    }
    this.items.push(item)
  }

  getTotal() {
    return this.items.reduce(
      (acc, { quantity, product, condition }) => {
        const amount = Money({ amount: quantity * product.price })
        let discount = Money({ amount: 0 })
        if (condition) {
          discount = calculateDiscount(amount, quantity, condition)
        }
        return acc.add(amount).subtract(discount)
      },
      Money({ amount: 0 }),
    )
  }

  remove(product) {
    remove(this.items, { product })
  }

  checkout() {
    const { total, items } = this.summary()
    this.items = []
    return {
      total: total.getAmount(),
      items,
    }
  }

  summary() {
    const total = this.getTotal()
    const formatted = total.toFormat('$0,0.00')
    const items = this.items
    return {
      total,
      formatted,
      items,
    }
  }
}
