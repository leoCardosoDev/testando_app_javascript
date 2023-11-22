import Cart from './Cart'

describe('Cart', () => {
  let cart
  let product = {
    title: 'Adidas running shoes - men',
    price: 35388, // 353.88 | R$ 353,88
  }

  let product2 = {
    title: 'Adidas running shoes - women',
    price: 41872, // 353.88 | R$ 353,88
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {
    it('Should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('Should multiply quantity and price and receive the total amount ', () => {
      const item = {
        product,
        quantity: 2, // 70776
      }
      cart.add(item)
      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('Should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })
      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('Should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })
      cart.add({
        product: product2,
        quantity: 1,
      })
      cart.remove(product)
      expect(cart.getTotal().getAmount()).toEqual(41872)
    })
  })

  describe('checkout()', () => {
    it('Should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      })
      cart.add({
        product: product2,
        quantity: 3,
      })
      expect(cart.checkout()).toMatchSnapshot()
    })

    it('Should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      })
      cart.checkout()
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('Should return an object with the total and the list of items when summary is called', () => {
      cart.add({
        product,
        quantity: 2,
      })
      cart.add({
        product: product2,
        quantity: 3,
      })
      expect(cart.summary()).toMatchSnapshot()
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })
  })

  describe('special conditions', () => {
    it('Should apply percentage discount when above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }
      cart.add({
        product,
        condition,
        quantity: 3
      })
      expect(cart.getTotal().getAmount()).toEqual(74315)
    })

    it('Should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      }
      cart.add({
        product,
        condition,
        quantity: 4
      })
      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for add quantities', () => {
      const condition = {
        quantity: 2,
      }
      cart.add({
        product,
        condition,
        quantity: 5
      })
      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('Should NOT apply percentage discount is below or equals minumum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }
      cart.add({
        product,
        condition,
        quantity: 2
      })
      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('Should NOT apply quantity discount is below or equals quantities', () => {
      const condition = {
        quantity: 2,
      }
      cart.add({
        product,
        condition,
        quantity: 1
      })
      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('Should receive two or more conditions and determine/apply the best discount. First case', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2
      }
      const condition2 = {
        quantity: 2
      }
      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('Should receive two or more conditions and determine/apply the best discount. Second case', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2
      }
      const condition2 = {
        quantity: 2
      }
      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })
  })
})
