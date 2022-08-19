import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.eventListeners();
    

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

    firstStep[this.value].classList.add('slider__step-active');

    return this.elem;
  }

  
  eventListeners() {
    
    let slider = this.elem
    let thumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress')
    let segmentsAmount = this.steps - 1;
    let percentPerStep = 100 / segmentsAmount;
    let spanCollector = this.elem.querySelectorAll('.slider__steps span')
    let sliderValue = this.elem.querySelector('.slider__value')
   

    thumb.ondragstart = () => false;
    
    thumb.onpointerdown = (e) => {
      e.preventDefault();}

    thumb.onpointermove = (e) => {
      e.preventDefault();}
    

    thumb.onpointerdown = event => {
      event.preventDefault();

      slider.classList.add('slider_dragging')

      document.onpointermove = event => {
        event.preventDefault();

        let sliderCoord = event.clientX - slider.getBoundingClientRect().left
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;

        if (sliderCoord < 0) {sliderCoord = 0}
        if (sliderCoord > rightEdge) {sliderCoord = rightEdge}

        let leftPercent = Math.round(sliderCoord / slider.offsetWidth * 100)
        
        thumb.style.left = leftPercent + '%';
        sliderProgress.style.width = leftPercent + '%';

        this.value = Math.round(leftPercent / percentPerStep);

        sliderValue.textContent = this.value;
        if (!spanCollector[this.value].classList.contains('slider__step-active')) {
          !spanCollector[this.value].classList.add('slider__step-active')};

        if (spanCollector[this.value + 1]) {spanCollector[this.value + 1].classList.remove('slider__step-active');}

        if (spanCollector[this.value - 1]) {spanCollector[this.value - 1].classList.remove('slider__step-active');}

      }

      document.onpointerup = event => {
        event.preventDefault();  

        slider.classList.remove('slider_dragging')
       

        thumb.dispatchEvent(new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
        }));

        document.onpointermove = null;
        document.onpointerup = null;
      }



    }

    slider.addEventListener('click', event => {
      event.preventDefault();

      let clickPercent = Math.round(Math.round(event.clientX - this.elem.getBoundingClientRect().left) / this.elem.getBoundingClientRect().width * 100);
      this.value = Math.round(clickPercent / percentPerStep);

      sliderProgress.style.width = (percentPerStep * this.value) + '%';
      thumb.style.left = (percentPerStep * this.value) + '%';

      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')

      sliderValue.textContent = this.value;
      
      this.elem.querySelector(`span:nth-child(${this.value + 1})`).classList.add('slider__step-active');

      slider.dispatchEvent(new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
      }));
    });

  }

}



