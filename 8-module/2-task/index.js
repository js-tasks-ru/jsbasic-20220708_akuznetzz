import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products)
  }

  render(products) {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
      
    </div>
    </div>
    `)

    this.inner = this.elem.querySelector('.products-grid__inner')
    
    this.createCards(this.products)

    return this.elem
  }

  updateFilter(filter) {

    for (let key in filter) {
      this.filters[key] = filter[key]
    }

    

    let comparing = item => {
   
      
      let filterNuts = item => {if (this.filters.noNuts) {return !item.nuts} else {return true}} 
      let filterVegeterian = item => {if (this.filters.vegeterianOnly) {return item.vegeterian} else {return true}}
      let maxSpiciness = item => {if (this.filters.maxSpiciness) {return item.spiciness <= this.filters.maxSpiciness} else {return true}}
      let category = item => {if (this.filters.category) {return item.category === this.filters.category} else {return true}}

      if (filterNuts(item) && filterVegeterian(item) && maxSpiciness(item) && category(item)) {return true}
    }
    
    let filtredProducts = this.products.filter(comparing)

    this.createCards(filtredProducts)


  }

  createCards(array) {
    this.inner.innerHTML = ''

    array.forEach(item => {
      let productCard = new ProductCard(item)
      this.inner.append(productCard.elem)
    })

  }

}
