import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render()
  }

  render() {
    let productGrid = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
      
    </div>
    </div>
    `)

    let inner = productGrid.querySelector('.products-grid__inner')
    this.products.forEach(elem => {
      let productCard = new ProductCard(elem)
      inner.append(productCard.elem)
    })
    
    

    return productGrid
  }

  updateFilter(filters) {
    
    if (filters.nuts) {
      
    }


  }

}
