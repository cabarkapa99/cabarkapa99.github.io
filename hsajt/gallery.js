const  horizontalGallery = document.getElementById('horizontal-gallery');
// ucitano u index.js
//const prev = document.getElementById('prev');
//const next = document.getElementById('next');
const gallery = document.getElementById('gallery-container');

// creiramo niz stringova s url-om slika
const pictures = [];
pictures.push('./slike/aleksandar-hadzievski1.jpeg');
pictures.push('./slike/aleksandar-hadzievski2.jpg');
pictures.push('./slike/aleksandar-hadzievski3.jpeg');
pictures.push('./slike/aleksandar-hadzievski4.jpeg');
pictures.push('./slike/aleksandar-hadzievski5.jpeg');

//pravimo element na stranici od url-a
const napraviSliku = function(picture){
    const pic = document.createElement('div');
    pic.className = "pic";
    pic.style.backgroundImage = `url(${picture})`;
    horizontalGallery.appendChild(pic);
}
for(const picture of pictures){
    napraviSliku(picture);
}

const showSlide = document.getElementById('show-slide');
const img = document.getElementById('show-slide-image');

//dodajemo eventListenere za svaku sliku
const pics = document.getElementsByClassName('pic');
for(let i = 0; i < pics.length; i++){
    pics[i].addEventListener('click', function(){
        img.src = pictures[i];
        showSlide.style.display = 'block';
    });
}

//racunamo sirinu i margine pojedinacnog elementa
const pic = pics[0];
const picStyle = getComputedStyle(pic) || pic.currentStyle;
const picStyleMargins = (Number.parseInt(picStyle.marginLeft.substr(0, 2))) * 2;
const picWidth = pic.scrollWidth + picStyleMargins;

//next prev i scroll
window.onload = function(){
    horizontalGallery.scrollLeft = 0;
}
let scrl = 0;
horizontalGallery.scrollLeft = 0;
prev.addEventListener('click', function(){
    scrl = horizontalGallery.scrollLeft / picWidth;
    if(scrl > 0){
        scrl--;
        horizontalGallery.scrollLeft = picWidth*scrl;
    }
});
next.addEventListener('click', function(){
    scrl = horizontalGallery.scrollLeft / picWidth;
    if(scrl < pics.length){
        scrl++;
        horizontalGallery.scrollLeft = picWidth*scrl;
    }
});

//close dugme
const closeX = document.getElementById('close');
closeX.addEventListener('click', function(){
    showSlide.style.display = 'none';
    
});


