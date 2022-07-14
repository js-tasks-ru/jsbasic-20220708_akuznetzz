function factorial(n) {
  
  //let result;

  let result = 1;
  
  for (let i = n; i > 1; i-- ) {
    
    if (i === 0) {
      
      break;
    
    } else result *= i;

    // result = (i === 0) ? 1 : result *= i;

  } return result;
}
