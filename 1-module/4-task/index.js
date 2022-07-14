function checkSpam(str) {
  
  let newStr = str.toLowerCase();
  
  let result = (newStr.includes('1xbet') || newStr.includes('xxx') ) ? true : false;
  
  return result;
}
