import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
    
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuHolder = document.querySelector('[data-ribbon-holder]');
    ribbonMenuHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);

    this.cart = new Cart(this.cartIcon);

    await fetch('../../9-module/2-task/products.json')
      .then(response => response.json())
      .then(data => {
        this.productsGrid = new ProductsGrid(data)
        let productsGridHolder = document.querySelector('[data-products-grid-holder]');
        productsGridHolder.innerHTML = ''
        productsGridHolder.append(this.productsGrid.elem)
        return data
      })
    
      

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      document.body.addEventListener('product-add', event => {
        let addedProduct = this.productsGrid.products.filter(item => item.id === event.detail)
        this.cart.addProduct(addedProduct[0])
      })

      this.stepSlider.elem.addEventListener('slider-change', event => {
        this.productsGrid.updateFilter({
          maxSpiciness: event.detail 
        });
      })

      this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
        console.log(event.detail)
        this.productsGrid.updateFilter({
          category: event.detail 
        });
      })


      document.querySelector('#nuts-checkbox').onchange = () => {
        this.productsGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked
        })
      }
      
      document.querySelector('#vegeterian-checkbox').onchange = () => {
        this.productsGrid.updateFilter({
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
        })
      }
    
  }
}
