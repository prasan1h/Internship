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