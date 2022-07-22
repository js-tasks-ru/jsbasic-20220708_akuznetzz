function getMinMax(str) {
  
  let arr = str.split(' ')
  .filter(item => Number(item) )
  .map(item => Number(item))
  .sort((a, b) => a-b);

let result = {
  min : arr[0],
  max : arr[arr.length-1]
};

return result;
}
