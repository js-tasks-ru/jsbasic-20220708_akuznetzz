function truncate(str, maxlength) {
  
  let newStr = (str.length <= maxlength) ? str : str.slice(0, maxlength - 1) + '…';

  return newStr;

}
