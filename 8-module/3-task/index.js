export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (!product || product === null) return
   
    let existing = this.cartItems.findIndex(item => item.product.name === product.name )
    
    if (existing === -1) {
      let cartItem = {
        'product': product,
        'count': 1
      }
      
      this.cartItems.push(cartItem)
      this.onProductUpdate(cartItem)
    } else {
      this.cartItems[existing].count++
      this.onProductUpdate(this.cartItems[existing])
    }
   
  }

  updateProductCount(productId, amount) {
    let index = this.cartItems.findIndex(item => item.product.id === productId )
    
    this.cartItems[index].count += amount

    if (!this.cartItems[index].count) {
      
      this.cartItems.splice(index, 1)

      
    }

    this.onProductUpdate(this.cartItems)
  }

  isEmpty() {
    if(this.cartItems.length === 0) {return true} else {return false}
  }

  getTotalCount() {
    let result
    return result = this.cartItems.reduce((sum,item) => sum + item.count, 0)
  }

  getTotalPrice() {
    let result
    return result = this.cartItems.reduce((sum,item) => sum + (item.product.price * item.count), 0)

  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    

    this.cartIcon.update(this);
  }
}

