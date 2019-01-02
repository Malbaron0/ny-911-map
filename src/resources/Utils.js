export function isObjectEmpty (obj) {
   return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function mergeArrays(arr1, arr2) {
   var arr = arr1.concat(arr2);
   arr = arr.filter(function (item, index, inputArray) {
     return inputArray.indexOf(item) === index;
   });
   return arr;
 }