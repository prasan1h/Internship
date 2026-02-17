var swiper = new Swiper(".mySwiper", {
slidesPerView: 3,
spaceBetween: 40,
loop: true,
height: 400,
innerWidth: 300,
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
pagination: {
    el : ".swiper-pagination",
    clickable : true,
},
autoplay: {
    delay: 2500,
    disableOnInteraction: false,
},
}); 

var feature_swiper = new Swiper(".myFeaturedBikes", {
slidesPerView: 1,
spaceBetween: 40,
loop: true,
height: 400,
innerWidth: 400,
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
pagination: {
    el : ".swiper-pagination",
    clickable : true,
    dynamicBullets: true,
},
autoplay: {
    delay: 2500,
    disableOnInteraction: false,
},
}); 

var swiperBikes = new Swiper(".swiperBikesCard", {
slidesPerView: 3,
spaceBetween: 30,
loop: true,
height: 250,
innerWidth: 300,
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
pagination: {
    el : ".swiper-pagination",
    clickable : true,
},
// autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
// },
});