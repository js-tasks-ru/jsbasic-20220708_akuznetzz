import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset

    // console.log(document.querySelector('.container'));

    let firstContainerRight = document.querySelector('.container').getBoundingClientRect().right
    
    let windowWidth = document.documentElement.clientWidth
    
    let countedLeft = firstContainerRight + 20

    if ((windowWidth - countedLeft - this.elem.offsetWidth) < 10) {
        countedLeft = windowWidth - this.elem.offsetWidth - 10}

    // console.log(window.pageYOffset)
    if (!window.pageYOffset || windowWidth < 767) {
      this.elem.style = 'none'

    } else {
      
      this.elem.style.zIndex = 1000;
      this.elem.style.position = 'fixed';
      this.elem.style.top = 50 + 'px';
      this.elem.style.left = countedLeft + 'px';
    }
    
  }
}
