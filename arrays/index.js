const arr1 = [1, 2, 3];
const arr2 = new Array(4, 5, 6);

console.log(arr1);
console.log(arr2);

const arr3 = [1, 'hello', true, null, undefined, { name: 'John' }, [1, 2, 3]];
console.log(arr3);

const arr4 = [[1, 2], [4, 3], [5, 6]];
const arr5 = arr4.flat();
const arr6 = arr5.flatMap(x => [x*2]);
const arr7 = arr5.flat(x => [x,x*2]);

console.log(arr4);
console.log(arr5);
console.log(arr6);
console.log(arr7);


const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const f1 = fruits.splice(1, 1);

const months = ["Jan", "Feb", "Mar", "Apr"];
const spliced = months.toSpliced(0, 3);

console.log(f1);
console.log(spliced);


const citrus = fruits.slice(3);
console.log(citrus);

const f2 = fruits.toString();
console.log(f2);

console.log(fruits.includes("Banana"));
console.log(arr5.find((i) => {return i>1}));
console.log(fruits.sort());
console.log(fruits.reverse());

const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n % 2 === 0) {
    return n === 2;
  }
  for (let factor = 3; factor * factor <= n; factor += 2) {
    if (n % factor === 0) {
      return false;
    }
  }
  return true;
}

console.log(array.filter(isPrime));