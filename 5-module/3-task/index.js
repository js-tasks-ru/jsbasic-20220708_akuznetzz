function initCarousel() {
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let position = 0;
  leftArrow.style.display = 'none';
  
  rightArrow.addEventListener('click', () => {
    
    if (position < (3 * carouselInner.offsetWidth)) {
      
      position += carouselInner.offsetWidth;
      
      carouselInner.style.transform = `translateX(-${position}px)`;
      
      leftArrow.style.display = '';
      
    };
   
    if (position == (3 * carouselInner.offsetWidth)) {rightArrow.style.display = 'none'};
 
  })

  leftArrow.addEventListener('click', () => {
    
    if (position > 0) {
        
      position -= carouselInner.offsetWidth;
        
      carouselInner.style.transform = `translateX(-${position}px)`;
        
      rightArrow.style.display = '';
      
    };
    
    if (position == 0) {leftArrow.style.display = 'none'};
})

}
