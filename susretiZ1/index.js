document.addEventListener('scroll', ()=>{
    const nav = document.querySelector('nav');
    let w = Number.parseInt(window.scrollY);
    let n = Number.parseInt(nav.clientHeight);
    nav.classList.toggle('scrolled', w > n);
})