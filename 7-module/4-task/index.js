import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    

  }

  render() {
    this.elem = createElement(`
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: ${100 / (this.steps - 1) * this.value}%;">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${100 / (this.steps - 1) * this.value}%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">

      </div>
    </div>
    `);

    

    let i = 0; 
    while(i < this.steps) {
      this.elem.querySelector('.slider__steps').innerHTML += `<span></span>`;
      i++
    };

    let firstStep = this.elem.querySelectorAll('.slider__steps span')

    // let firstStep = slider.querySelector(`.slider__steps > span:nth-child(${this.value + 1})`);
    firstStep[this.value].classList.add('slider__step-active');

    // console.log(firstStep)
    

    this.elem.addEventListener('click', this.sliderClickHandler.bind(this));

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.sliderHandler.bind(this));


    thumb.ondragstart = () => false;
    
    thumb.onpointerdown = (e) => {
      e.preventDefault();}

    thumb.onpointermove = (e) => {
      e.preventDefault();}

    return this.elem;
  }

  sliderHandler(event) {
    event.preventDefault();

    

    // let steps = this.steps
    // let slider = document.querySelector('.slider')
    // let slider = this.elem
    let thumb = this.elem.querySelector('.slider__thumb')
    let sliderProgress = this.elem.querySelector('.slider__progress')
    
    this.elem.classList.add('slider_dragging')

    // console.log(slider)

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;



    let onPointerMove = event => {
      event.preventDefault();
      // console.log(this.elem)
      let sliderCoord = Math.round(event.clientX - shiftX - this.elem.getBoundingClientRect().left);
      let rightEdge = this.elem.offsetWidth - thumb.offsetWidth;
      let segmentsAmount = this.steps - 1;
      let percentPerStep = 100 / segmentsAmount;
      let spanCollector = this.elem.querySelectorAll('.slider__steps span')

      

      if (sliderCoord < 0) {sliderCoord = 0}
      
        if (sliderCoord > rightEdge) {
          sliderCoord = rightEdge;
        }

      let leftPercent = Math.round(sliderCoord / rightEdge * 100)
      
      thumb.style.left = leftPercent + '%';
      sliderProgress.style.width = leftPercent + '%';

      let value = Math.round(leftPercent / percentPerStep);

      this.elem.querySelector('.slider__value').textContent = value;
      if (!spanCollector[value].classList.contains('slider__step-active')) {
        !spanCollector[value].classList.add('slider__step-active')};

        if (spanCollector[value + 1]) {spanCollector[value + 1].classList.remove('slider__step-active');}

        if (spanCollector[value - 1]) {spanCollector[value - 1].classList.remove('slider__step-active');}


      // console.log(leftPercent)

    }

    let onPointerUp = event => {
      this.elem.classList.remove('slider_dragging')
      document.removeEventListener('pointermove', onPointerMove);

      this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this.elem.querySelector('.slider__value').textContent, 
      bubbles: true 
      }));
      
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

  }

  sliderClickHandler(event) {
    let segmentsAmount = this.steps - 1;
    let percentPerStep = 100 / segmentsAmount;

    let clickPercent = Math.round(Math.round(event.clientX - this.elem.getBoundingClientRect().left) / this.elem.getBoundingClientRect().width * 100);
    this.value = Math.round(clickPercent / percentPerStep);

    this.elem.querySelector('.slider__progress').style.width = (percentPerStep * this.value) + '%';
    this.elem.querySelector('.slider__thumb').style.left = (percentPerStep * this.value) + '%';

    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')

    this.elem.querySelector('.slider__value').textContent = this.value;
    
    this.elem.querySelector(`span:nth-child(${this.value + 1})`).classList.add('slider__step-active');

    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this.value, 
      bubbles: true 
    }));
  }

}



