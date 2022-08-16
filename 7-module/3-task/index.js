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

    let firstStep = slider.querySelector(`.slider__steps > span:nth-child(${this.value + 1})`);
    firstStep.classList.add('slider__step-active');

    slider.addEventListener('click', this.sliderHandler.bind(this));

    return slider;
  }

  sliderHandler(event) {
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
