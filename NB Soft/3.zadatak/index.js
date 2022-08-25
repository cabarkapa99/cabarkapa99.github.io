$('.slider-container').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots:true,
});
const navButtons = document.querySelectorAll('.slick-dots li button');
for(const btn of navButtons){
    btn.innerHTML = '&#9711;';
}
const arrowBtns = document.querySelectorAll('.slick-arrow');
for(const btn of arrowBtns){
    if(btn.className.includes('slick-prev')){
        btn.innerHTML = '&#8592;';
    }else{
        btn.innerHTML = '&#8594;';
    }
}