import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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
    } else {
      this.cartItems[existing].count++

    }

    this.onProductUpdate(this.cartItems)
   
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
    if(this.cartItems.length > 0) {return false} else {return true}
  }

  getTotalCount() {
    let result
    return result = this.cartItems.reduce((sum,item) => sum + item.count, 0)
  }

  getTotalPrice() {
    let result
    return result = this.cartItems.reduce((sum,item) => sum + (item.product.price * item.count), 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2) }</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalCart = new Modal();
    
    this.modalCart.setTitle('Your order')
    this.modalCart.setBody(this.createBody())
    this.modalCart.open()

    this.form = this.modalCart.modal.querySelector('.cart-form')

    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.onSubmit(event)
      
    })

 
    
  }

  onProductUpdate(cartItem) {

    if(this.modalCart) {
      if (this.cartItems.length === 0) {this.modalCart.close()} else {
      this.modalCart.modal.querySelector('.modal__body').innerHTML = '';
      this.modalCart.modal.querySelector('.modal__body').append(this.createBody());
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // console.log(this.form)
    event.target.querySelector('BUTTON').classList.add('is-loading')

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.form)
    })
    .then(response => {
      this.modalCart.setTitle('Success!');
      this.cartItems = [];
      this.modalCart.modal.querySelector('.modal__body').innerHTML = '';
      this.modalCart.modal.querySelector('.modal__body').append(createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `))
      // this.unProductUpdate(this.cartItems)
    })
  


  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  createBody() {
    let modalBody = document.createElement('DIV')
    this.cartItems.forEach(item => modalBody.append(this.renderProduct(item.product, item.count)))
    modalBody.append(this.renderOrderForm())
    this.productList = modalBody.querySelectorAll('.cart-product')

    this.productList.forEach(item => {
      item.addEventListener('click', event => {

        let currentProductId = event.target.closest('.cart-product').dataset.productId
        let index = this.cartItems.findIndex(item => item.product.id == currentProductId )

        if (event.target.closest('.cart-counter__button_minus')) {
          this.updateProductCount(currentProductId, -1)
          this.onProductUpdate(this.cartItems[index])
        }

        if (event.target.closest('.cart-counter__button_plus')) {
          this.updateProductCount(currentProductId, 1)
          this.onProductUpdate(this.cartItems[index])
        }
      })
    })
    return modalBody


  }
}

