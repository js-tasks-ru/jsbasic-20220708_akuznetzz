import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    

  }

  render() {
    let slider = createElement(`
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
      slider.querySelector('.slider__steps').innerHTML += `<span></span>`;
      i++
    };

    let firstStep = slider.querySelectorAll('.slider__steps span')

    firstStep[this.value].classList.add('slider__step-active');


    

    slider.addEventListener('click', this.sliderClickHandler.bind(this));

    let thumb = slider.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.sliderHandler.bind(this));


    thumb.ondragstart = () => false;
    
    thumb.onpointerdown = (e) => {
      e.preventDefault();}

    thumb.onpointermove = (e) => {
      e.preventDefault();}

    return slider;
  }

  sliderHandler(event) {
    event.preventDefault();

    

    let steps = this.steps
    let slider = document.querySelector('.slider')
    let thumb = document.querySelector('.slider__thumb')
    let sliderProgress = document.querySelector('.slider__progress')
    
    slider.classList.add('slider_dragging')

    

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

    function onPointerMove(event) {
      event.preventDefault();
      let sliderCoord = Math.round(event.clientX - shiftX - slider.getBoundingClientRect().left);
      let rightEdge = slider.offsetWidth - thumb.offsetWidth;
      let segmentsAmount = steps - 1;
      let percentPerStep = 100 / segmentsAmount;
      let spanCollector = document.querySelectorAll('.slider__steps span')

      

      if (sliderCoord < 0) {sliderCoord = 0}
      
        if (sliderCoord > rightEdge) {
          sliderCoord = rightEdge;
        }

      let leftPercent = Math.round(sliderCoord / rightEdge * 100)
      
      thumb.style.left = leftPercent + '%';
      sliderProgress.style.width = leftPercent + '%';

      let value = Math.round(leftPercent / percentPerStep);

      document.querySelector('.slider__value').textContent = value;
      if (!spanCollector[value].classList.contains('slider__step-active')) {
        !spanCollector[value].classList.add('slider__step-active')};

        if (spanCollector[value + 1]) {spanCollector[value + 1].classList.remove('slider__step-active');}

        if (spanCollector[value - 1]) {spanCollector[value - 1].classList.remove('slider__step-active');}


      // console.log(leftPercent)

    }

    function onPointerUp(event) {
      slider.classList.remove('slider_dragging')
      document.removeEventListener('pointermove', onPointerMove);

      document.dispatchEvent(new CustomEvent('slider-change', { 
      detail: document.querySelector('.slider__value').textContent, 
      bubbles: true 
      }));
      
    }


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



