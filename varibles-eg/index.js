// var a = 10;
// console.log(a);
// var a = 20;
// console.log(a);

// {
//     var a = 30;
//     console.log(a);
// }

// {
//     let a = 40;
//     console.log(a);
// }

// {
//     const a = 50;
//     console.log(a);
// }

// console.log(a);

// const a = 60;
// console.log(a);



// for(var i = 0; i < 35; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
//     console.log(i);
// }

// for(let j = 0; j < 5; j++) {
//     setTimeout(function() {
//         console.log(j);
//     }
//     , 1000);
// }

// for(const i = 0;i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }
//     , 1000);
// }


let cartTotal = 0;
// var cartTotal = 0;
// const cartTotal = 0;

function addToCart(price) {
  cartTotal += price;
}

addToCart(500);
addToCart(300);
console.log(cartTotal);