var counter = 0;
 
function bubbleSort(myArr){
  var size = myArr.length;
  counter = 0;
 
  for( var pass = 1; pass < size; pass++ ){ // outer loop
    for( var left = 0; left < (size - pass); left++){ // inner loop       
      var right = left + 1;
      counter++;
      if( myArr[left] > myArr[right] ){
        swap(myArr, left, right);
      }
    }
  }
  console.log('Bubble Sort: ', counter );
  return myArr;
}
 
function selectionSort( myArr ){
  var size = myArr.length;
  counter = 0;
 
  for( var slot = 0; slot < size -1; slot ++ ){ // outer loop
    var smallest = slot;
    for( var check = slot + 1; check < size; check++ ){ // inner loop
      counter++;
      if( myArr[check] < myArr[smallest] ){
        smallest = check;
      }
    }
    swap( myArr, smallest, slot );
  }
  console.info( 'Selection  Sort: ', counter );
  return myArr;
}
 
function insertionSort( vector ) {
  var innerCounter = 0;
  counter = 0;
  for (var i=1; i < vector.length; i++) {
    var temp = vector[i];
    var j = i-1;
    counter++;
    while (j >= 0 && vector[j] > temp) {
      innerCounter++;
      vector[j + 1] = vector[j];
      j--;
    }
    vector[j+1] = temp;
  }
  console.info('Insertion Sort: ', innerCounter || counter );
  return vector;
};


var TEST_SIZE = 1000,
    sortedArr = [],
    reverseArr = [],
    randomArr = [];
 
for( var x = TEST_SIZE; x > 0; x-- ){
  reverseArr.push(x);
}

for( var x = 1; x >= TEST_SIZE; x++ ){
  sortedArr.push(x);
}


while(randomArr.length <= TEST_SIZE){
    var ind = Math.floor(Math.random() * TEST_SIZE);
    if(!randomArr.indexOf(ind)){
        randomArr.push(ind)
     }
}

console.log(sortedArr);
console.log(reverseArr);
console.log(randomArr);
