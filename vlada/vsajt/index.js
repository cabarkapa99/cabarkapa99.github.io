//prevodimo na engleski jezik dinamicki
function translate(){
    //dohvatamo switch element koji je ustv checkbox
    const checkBox = document.getElementById('toggle-lang-switch');
    checkBox.addEventListener('change', ()=>{
        //dohvatamo sve elemente na srpskom i sve na engleskom
        const en = document.getElementsByClassName('en');
        const rs = document.getElementsByClassName('rs');
        if(checkBox.checked){
            for(const e of en){
                // e.style.display='initial';
                e.classList.remove('hide');
            }
            for(const r of rs){
                // r.style.display='none';
                r.classList.add('hide');
            }
        }else{
            for(const e of en){
                // e.style.display='none';
                e.classList.add('hide');
            }
            for(const r of rs){
                // r.style.display='initial';
                r.classList.remove('hide');
            }
        }
    })
}
translate();

function heroSlideShow(){
    // vrtimo hero slideshow tj carousel
    //dohvatamo potrebne elemente
    const slider = document.getElementById('hero-slider');
    const heroSlides = document.getElementsByClassName('hero-slide');
    const sliderNav = document.querySelectorAll('.carousel-nav');
    let slideDuration;
    //dodeljujemo listenere tako da moze da se krece kroz slajdove rucno
    for(const nav of sliderNav){
        nav.addEventListener('click', (e)=>{
            const slideNav = e.target;
            const id = slideNav.id;
            let slideNumber;
            //proveravamo koji slajd treba prikazati
            switch (id){
                case "first-slide-nav":
                    slideNumber = 1;
                    break;
                case "second-slide-nav":
                    slideNumber = 2;
                    break;
                case "third-slide-nav":
                    slideNumber = 3;
                    break;
                case "fourth-slide-nav":
                    slideNumber = 4;
                    break;
            }
            // sve druge vracamo na pocetno stanje
            for(const nav of sliderNav){
                nav.style.backgroundColor = 'var(--gold)';
            }
            // podesavamo pozicije
            nextSlide = slideNumber - 1;
            currentSlide = nextSlide - 1;
            prevSlide = currentSlide -1;
            //prekidamo trenutni prikaz i prikazujemo odabrani slajd
            clearInterval(slideDuration);
            showSlide();
            slideDuration = setInterval(showSlide, 5000);
        })
    }

    //podesavamo sirinu slajda na sirinu pogleda pregledaca
    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    for(const slide of heroSlides){
        slide.style.width=width + 'px';
    }

    //podesavamo pocetne pozicije slajdova i zapocinjemo 
    // vremensku rotaciju
    let nextSlide = 1;
    let currentSlide = nextSlide - 1;
    let prevSlide = currentSlide - 1;

    slideDuration = setInterval(showSlide, 5000);

    //obelezavamo trenutno prikazan slajd
    sliderNav[currentSlide].style.backgroundColor = 'var(--navy)';

    function showSlide(){
        //ovde skrolujemo do konkretnog slajda
        if(nextSlide === heroSlides.length){
            nextSlide = 0;
        }
        slider.style.translate = '-' + (width * nextSlide) +'px';
        slider.style.transition='translate 1s';
        //pomeramo brojace pozicija slajda da znamo dokle smo stigli
        nextSlide++;
        currentSlide = nextSlide - 1;
        prevSlide = currentSlide - 1;

        //menjamo boje da bismo pokazali korisniku na kom smo slajdu trenutno
        sliderNav[currentSlide].style.backgroundColor = 'var(--navy)';
        if(prevSlide >= 0){
            sliderNav[prevSlide].style.backgroundColor = 'var(--gold)';
        }else{
            sliderNav[sliderNav.length - 1].style.backgroundColor = 'var(--gold)';
        }
    }
}
heroSlideShow();

function prikaziAboutKartice(){
    //kada prvi put udje u about one iskoce

    const kartice = document.getElementById('about-cards');
    const about = document.getElementById('about');

    const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            kartice.style.display='flex';
            // observer.unobserve(about);
        }else{
            kartice.style.display='none';
        }
    },{threshold: 0.15});
    observer.observe(about);
}
prikaziAboutKartice();


function bgScreenFunction(q){
    if(q.matches){

        //za velike ekrane
        // da se sakriva i pojavljuje nav bar
        const bScreen = document.getElementById('hero');
        const list = document.getElementById('nav-list');

        const observer = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                list.style.display='block';
            }else{
                list.style.display='none';
            }
        }, {threshold: 0.2});
        observer.observe(bScreen);

    }
}
let x = window.matchMedia("(min-width: 1024px)");
bgScreenFunction(x);
x.addEventListener('change',bgScreenFunction);

function prikaziUsluge(){
    //kada prvi put udje u usluge one iskoce

    const prviRedUsluga = document.getElementById('services-first-row');
    const drugiRedUsluga = document.getElementById('services-second-row');
    const services = document.getElementById('services');

    //za prvi red usluga
    const observer1 = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            prviRedUsluga.style.display='flex';
            // observer1.unobserve(services);

        }else{
            prviRedUsluga.style.display='none';
        }
    },{rootMargin: "200% 0px -25% 0px"});
    observer1.observe(services);

    //za drugi red usluga
    const observer2 = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            drugiRedUsluga.style.display='flex';
            // observer2.unobserve(services);
        }else{
            drugiRedUsluga.style.display='none';
        }
    },{rootMargin: "200% 0px -60% 0px"});
    observer2.observe(services);
}
prikaziUsluge();

function verifikujKontakt(){
    const sendButtons = document.querySelectorAll('#contact-form form input[type=submit]');
    for(const button of sendButtons){
        button.addEventListener('click', (e)=>{
            let polje;

        })
    }
}
verifikujKontakt();