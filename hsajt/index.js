const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const hamburger = document.getElementById('hamburger');
const logo = document.getElementById('logo');
const list = document.getElementById('navigation-list');

const prev = document.getElementById('prev');
const next = document.getElementById('next');

const openList = function(){
    line1.style.transform = "rotate(45deg)";
    line2.style.transform = "scaleY(0)";
    line3.style.transform = "rotate(-45deg)";
    logo.style.display = "none";
    list.style.transform = "translate(0)";
    clicked = true;

    prev.style.display = 'none';
    next.style.display = 'none';
}
const closeList = function(){
    line1.style.transform = "rotate(0deg)";
    line2.style.transform = "scaleY(1)";
    line3.style.transform = "rotate(0deg)";
    list.style.transform = "translate(150%)";
    logo.style.display = "block";
    clicked = false;

    prev.style.display = 'inline';
    next.style.display = 'inline';
}

let clicked = false;

hamburger.addEventListener('click', function(){
    if(clicked === false){
        openList();
    }else{
        closeList();
    }
});

list.addEventListener('click', function(){
    if(clicked === true)
        closeList();
});

function bgScreenFunction(q){
    if(q.matches){

        //za velike ekrane
        const bScreen = document.getElementById('big-screen');

        const observer = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                list.style.display='block';
            }else{
                list.style.display='none';
            }
        }, {threshold: 0.1});
        observer.observe(bScreen);

    }
}
let x = window.matchMedia("(min-width: 1024px)");
bgScreenFunction(x);
x.addEventListener(bgScreenFunction);
