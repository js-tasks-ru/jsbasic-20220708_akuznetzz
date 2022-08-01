function toggleText() {
  
  let button = document.querySelector('.toggle-text-button'); 
  
  button.addEventListener('click', () => {
     
    if (!text.hidden) {
      
      text.hidden = true;
     
    } else text.hidden = false;
  });
};
