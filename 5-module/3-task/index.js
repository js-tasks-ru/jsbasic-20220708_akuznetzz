function initCarousel() {
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let carousel = document.querySelector('.carousel');
  let carouselInner = document.querySelector('.carousel__inner');
  let position = 0;
  leftArrow.style.display = 'none';
  
  carousel.addEventListener('click', (event) => {
    
    if (event.target.closest('.carousel__arrow').classList.contains("carousel__arrow_right")) {
      if (position < (3 * carouselInner.offsetWidth)) {
      position += carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(-${position}px)`;
      leftArrow.style.display = '';
      }; 
    
      if (position == (3 * carouselInner.offsetWidth)) {rightArrow.style.display = 'none'};
    };

    if (event.target.closest('.carousel__arrow').classList.contains("carousel__arrow_left")) {
      if (position > 0) {
      position -= carouselInner.offsetWidth;
      carouselInner.style.transform = `translateX(-${a}px)`;
      rightArrow.style.display = '';
      };
      
      if (position === 0) {leftArrow.style.display = 'none'};
    };

  });

}
