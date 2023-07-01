//menjamo nav na skrol
document.addEventListener('scroll', ()=>{
    const nav = document.querySelector('nav');
    let w = Number.parseInt(window.scrollY);
    let n = Number.parseInt(nav.clientHeight);
    nav.classList.toggle('scrolled', w > n);
})

// faq klik za odg
let questions = document.getElementsByClassName('question-cover');
let answers = document.getElementsByClassName('faq-answer');

let qs = document.getElementsByClassName('faq-question');

for(let i = 0; i < questions.length; i++){
    questions[i].addEventListener('click', ()=>{
        const k = questions[i].parentElement.querySelector(".question-content span");
        if(k.innerText === "+"){
            k.innerText = "X"
        }else{
            k.innerText = "+"
        }
        for(const answer of answers){
            if(!(answer.classList.contains('hide')) && answer != answers[i]){
                answer.classList.add('hide');
                qs[i].classList.remove('clicked');
            }
        }
        answers[i].classList.toggle('hide');
        qs[i].classList.toggle('clicked');

    })
}

// funkcionalnost za upitnik

//dohvatamo sva pitanja i sve odgovore
const surveyQuestions = document.querySelectorAll('.survey-question');
const surveyBtns = document.querySelectorAll('.survey-question button');

// console.log(surveyQuestions, surveyBtns)

//ova f-ja vraca pitanje na koje je dato odgovor kako bi znali koje je sledece
function findQuestion(element){
    let firstParent = element.parentElement;
    if(firstParent.classList.contains('survey-question')){
        return firstParent;
    }else{
        let secondParent = firstParent.parentElement;
        return secondParent.parentElement;
    }
}
//u ovom objektu belezimo odgovore
const answ = {
    "1":0,
    "2":0,
    "3":0,
    "4":0,
    "5":0,
    "6":0
}
//ova f-ja upisuje poene u objekat za odg
function findBestTherapist(btn){

    if(btn.value != ""){
        let values = btn.value.split(' ');
        for(const value of values){
            answ[value]++;
        }
    }
    // console.log(answ)
}
//ova f-ja proverava ko je najbolji match i vraca sve sa max poena
function bestTherapist(){
    let max = 0;
    let numMax = 0;
    const returnValues = [];
    for(let num in answ){
        if(answ[num] >= max){
            max = answ[num];
        }
    }
    for(let num in answ){
        if(answ[num] === max){
            returnValues.push(num);
            numMax++;
        }
    }
    return returnValues;
}
//ova f-ja prikazuje poslednje pitanje koje se prikazuje samo ako nije jasno ko ima max poena
// i ostavlja opcije samo onih izmedju kojih je rezultat jednak
function showLastQuestion(arrayOfTherapists){
    let lastQustion = surveyQuestions[7];
    let lastQuestionsBtns = lastQustion.querySelectorAll('button');
    for(let btn of lastQuestionsBtns){
        btn.classList.add('hide');
        for(let therapist of arrayOfTherapists){
            if(btn.value === therapist){
                btn.classList.remove('hide');
            }
        }
    }
    surveyQuestions[6].classList.add('hide');
    lastQustion.classList.remove('hide');
}
// ova f-ja na kraju povezuje max broj poena sa terapeutom i prikazuje korisniku rezultat
function showResultsOfSurvey(){
    let theTherapist = bestTherapist()[0];
    const therapists = {
        "1":"Jovana Aleksic",
        "2":"Bojan Jovanovic",
        "3":"Milena Ivkovic",
        "4":"Natalija Avramovic",
        "5": "Jovan Radosavljevic",
        "6":"Jovana Letic"
    }
    console.log(therapists[theTherapist]);
    const answer = document.querySelector('.survey-answer');
    let span = answer.querySelector('h3 span');
    span.innerText = therapists[theTherapist];

    answer.querySelector('a').href=`#${therapists[theTherapist]}`;

    if(surveyQuestions[6].classList.contains('hide')){
        surveyQuestions[7].classList.add('hide');
    }else{
        surveyQuestions[6].classList.add('hide');
    }

    answer.classList.remove('hide');
}
// ovde dajemo odgovorima funkcionalnost
// kretanje kroz upitnik unapred
// bodovanje 
// prikaz rezultata
for(const btn of surveyBtns){
    btn.addEventListener('click', (e)=>{

        //bodovanje
        findBestTherapist(e.target);

        // kretanje unapred sa upitnikom
        const question = findQuestion(e.target);
        for(let i = 0; i < surveyQuestions.length-2; i++){
            if(surveyQuestions[i] === question){
                surveyQuestions[i].classList.add('hide');
                surveyQuestions[i+1].classList.remove('hide');
            }
        }

        //dodati rezultate na kraju
        if(question === surveyQuestions[6]){
            let t = bestTherapist();
            //ukoliko je vise terapeuta osvojilo isti br pitanja
            if(t.length > 1){
                showLastQuestion(t);
            }else{
                showResultsOfSurvey();
            }
        }
        if(question === surveyQuestions[7]){
            showResultsOfSurvey();
        }
    })
}

// ovde ide hamburger

function hamburger(){
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    const hamburger = document.getElementById('hamburger');
    const list = document.querySelector('nav ul');
    const nav = document.querySelector('nav');


    const openList = function(){
        line1.style.transform = "rotate(45deg)";
        line2.style.transform = "scaleY(0)";
        line3.style.transform = "rotate(-45deg)";
        list.style.display = "flex";
        if(!nav.classList.contains('scrolled')){
            nav.classList.add('scrolled');
            addedScrolled = true;
        }
        clicked = true;
    }
    const closeList = function(){
        line1.style.transform = "rotate(0deg)";
        line2.style.transform = "scaleY(1)";
        line3.style.transform = "rotate(0deg)";
        list.style.display = "none";
        if(addedScrolled){
            nav.classList.remove('scrolled');
            addedScrolled = false;
        }
        clicked = false;
    }

    let addedScrolled = false;
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

}
hamburger();


//za male ekrane za prikaz biografija
function showBio(){
    const btns = document.querySelectorAll('.read-bio');
    for(const btn of btns){
        const bio = btn.previousElementSibling;
        btn.addEventListener('click',()=>{
            if(btn.innerText != "Sakrij biografiju"){
                bio.style.display="block";
                btn.innerText="Sakrij biografiju";
            }else{
                bio.style.display="none";
                btn.innerText="Vidi biografiju";
            }
        })
    }
}
showBio();

function sendMessage(){
    const btns = document.querySelectorAll('button.contact-therapist');
    const modal = document.querySelector('.contact-modal-container');

    for(const btn of btns){
        btn.addEventListener('click', ()=>{
            let parent = btn.parentElement;
            let mail = parent.querySelector('span.mail').innerText;
            modal.querySelector('.contact-modal span.mail').innerText = mail;
            modal.style.display="flex";
        })
    }
}
sendMessage();

function closeModal(){
    const modal = document.querySelector('.contact-modal-container');
    const closeBtn = modal.querySelector('.contact-modal button');

    closeBtn.addEventListener('click', ()=>{
        modal.style.display="none";
    })
}
closeModal();

function verifyForm(){
    const verified = {
        ime: true,
        mail: true,
        msg: true
    };
    const border = "1px solid var(--beige)";
    const nameInput = document.querySelector('#ime');
    const mailInput = document.querySelector('#mail');
    const msgInput = document.querySelector('#msg');
    const to = document.querySelector("#contact-wrapper .contact-info .contact-info-mail span").innerText;
    // /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(nameInput.value.trim())
    const sendBtn = document.querySelector('#submit');
    sendBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if(nameInput.value.trim() === "" || nameInput.value.trim().length > 30 || !/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(nameInput.value.trim())){
            nameInput.style.border = "1px solid red";
            verified.ime = false;
        }else{
            nameInput.style.border=border;
            verified.ime = true;
        }
        if(mailInput.value.trim() === "" || mailInput.value.trim().length > 30 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailInput.value.trim())){
            mailInput.style.border="1px solid red";
            verified.mail = false;
        }else{
            mailInput.style.border=border;
            verified.mail = true;
        }
        if(msgInput.value.trim() === "" || msgInput.value.trim().length > 300){
            msgInput.style.border="1px solid red";
            verified.msg = false;
        }else{
            msgInput.style.border=border;
            verified.msg = true;
        }

        if(verified.ime && verified.mail && verified.msg){
            console.log('poslato');
            fetch('https://terapijskisusreti.com/sendMail.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `to=${encodeURIComponent(to)}&name=${encodeURIComponent(nameInput.value.trim())}&email=${encodeURIComponent(mailInput.value.trim())}&message=${encodeURIComponent(msgInput.value.trim())}`
              })
              .then(response => response.text())
              .then(text => {
                // alert(text);
                // form.reset();
                console.log(text)
                sendBtn.innerText = text;
                sendBtn.disabled = true;
                // window.location.reload();
              })
              .catch(error => {
                alert('Oops! Something went wrong.');
                console.error(error);
              });
        }
    });
}
verifyForm();
function verifyFormModal(){
    const verified = {
        ime: true,
        mail: true,
        msg: true
    };
    const border = "1px solid var(--beige)";
    const nameInput = document.querySelector('#ime-modal');
    const mailInput = document.querySelector('#mail-modal');
    const msgInput = document.querySelector('#msg-modal');
    // /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(nameInput.value.trim())
    const sendBtn = document.querySelector('#submit-modal');
    sendBtn.addEventListener('click', (e)=>{
        const to = document.querySelector(".contact-modal-container .contact-modal .contact-info-mail .mail").innerText;
        e.preventDefault();
        if(nameInput.value.trim() === "" || nameInput.value.trim().length > 30 || !/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(nameInput.value.trim())){
            nameInput.style.border = "1px solid red";
            verified.ime = false;
        }else{
            nameInput.style.border=border;
            verified.ime = true;
        }
        if(mailInput.value.trim() === "" || mailInput.value.trim().length > 30 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailInput.value.trim())){
            mailInput.style.border="1px solid red";
            verified.mail = false;
        }else{
            mailInput.style.border=border;
            verified.mail = true;
        }
        if(msgInput.value.trim() === "" || msgInput.value.trim().length > 300){
            msgInput.style.border="1px solid red";
            verified.msg = false;
        }else{
            msgInput.style.border=border;
            verified.msg = true;
        }

        if(verified.ime && verified.mail && verified.msg){
            console.log('poslato');
            fetch('https://terapijskisusreti.com/sendMail.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `to=${encodeURIComponent(to)}&name=${encodeURIComponent(nameInput.value.trim())}&email=${encodeURIComponent(mailInput.value.trim())}&message=${encodeURIComponent(msgInput.value.trim())}`
              })
              .then(response => response.text())
              .then(text => {
                // alert(text);
                // form.reset();
                sendBtn.innerText = text;
                sendBtn.disabled = true;
                // window.location.reload();
              })
              .catch(error => {
                alert('Oops! Something went wrong.');
                console.error(error);
              });
        }
    });
}
verifyFormModal();

function showLatestPost(){
    const naslov = document.querySelector(".news-wrapper h4");
    const text = document.querySelector(".news-wrapper p");
    const slika = document.querySelector(".news-wrapper .news-image img");
    let pronadjenaSlika = false;
    let link;
    fetch('https://blog.terapijskisusreti.com/wp-json/wp/v2/posts', {
        headers: {
          'origin': 'https://terapijskisusreti.com'
        }
      })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }   
        return response.json();
    })
    .then(data => {
        // Process the retrieved data
        naslov.innerText = data[0].title.rendered; 
        let text = data[0].excerpt.rendered;
        console.log(text);
        text.innerText = data[0].excerpt.rendered.substring(data[0].excerpt.rendered.indexOf(">") + 1, data[0].excerpt.rendered.indexOf("&"));
        link = data[0].link;
        document.querySelector(".news-wrapper").addEventListener("click", ()=>{
            window.open(link, "_blank");
        });
        console.log(data);
        console.log(data.content);
        if(!pronadjenaSlika){
            slika.src="./images/Logo SUSRETI/Logo horizontala boja.png";
        }
        if(naslov.innerText != "" && text.innerText != ""){
            document.querySelector(".news-wrapper").classList.add("got");
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
    });
}
showLatestPost()

window.addEventListener('scroll', function() {

    var scrollPosition = window.scrollY;
    var opacity = 0.7 + (scrollPosition / 2000); // Adjust the divisor for desired effect
  
    document.documentElement.style.setProperty('--opacity', opacity);

});

function animations(){
    const aboutObserver = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            entry.target.classList.toggle("animate", entry.isIntersecting)
        })
    },{ threshold: 0.8})
    const aboutObserver2 = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("animate");
                aboutObserver2.unobserve(entry.target)
            }
        })
    },{ threshold: 0.5})


    const teamObserver = new IntersectionObserver(entries =>{
        entries.forEach(entry=>{
            entry.target.classList.toggle("animate-bg-team", entry.isIntersecting);            
        })
    },{rootMargin:"-200px 0px -200px 0px"})
    teamObserver.observe(document.querySelector("#team"));

    let teamTreshholdValue = 0.51;
    function myFunction2(y) {
        if (y.matches) { // If media query matches
            teamTreshholdValue = 0.25;
        } else {
            teamTreshholdValue = 0.51;
        }
      }
      
      var y = window.matchMedia("(max-width: 1023px)")
      myFunction2(y) // Call listener function at run time
      y.addEventListener("change", myFunction2) // Attach listener function on state changes
    const teamObserverTeam = new IntersectionObserver(entries =>{
        entries.forEach(entry=>{
            let img = entry.target.querySelector(".team-member-image-wrapper");
            let bio = entry.target.querySelector(".team-member-biography-wrapper");
            let contact = entry.target.querySelector(".contact-info");
            let btn = entry.target.querySelector(".contact-therapist-small");
            img.classList.toggle("animate", entry.isIntersecting);
            bio.classList.toggle("animate", entry.isIntersecting);
            contact.classList.toggle("animate", entry.isIntersecting);
            btn.classList.toggle("animate", entry.isIntersecting);
        })
    }, {threshold:teamTreshholdValue})
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach(member=>{
        teamObserverTeam.observe(member);
    })

    const faqObserver = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.animation="rubberBand";
                entry.target.style.animationDuration="1s";
                faqObserver.unobserve(entry.target)
            }
        })

    }, {threshold:1})
    const faqs = document.querySelectorAll(".faq-question");
    faqs.forEach(faq=>{
        faqObserver.observe(faq);
    })

    const contactObserver = new IntersectionObserver(entries=>{
        let entry = entries[0];
        if(entry.isIntersecting){
            entry.target.classList.add("animate-bg-team");
            contactObserver.unobserve(entry.target);
        }
    }, {threshold:1})
    contactObserver.observe(document.querySelector("#contact"))

    const blogObserver = new IntersectionObserver(entries=>{
        let entry = entries[0];
        if(entry.isIntersecting){
            entry.target.classList.add("animate");
            blogObserver.unobserve(entry.target);
        }
    }, {threshold:1})
    blogObserver.observe(document.querySelector(".news-container .news-wrapper"))


    function myFunction(x) {
        if (x.matches) { // If media query matches
            // aboutObserver2.observe(document.querySelector("#about-picture"));
            aboutObserver2.observe(document.querySelector("#text-wrapper"));
            aboutObserver2.observe(document.querySelector("#key-words"));
            aboutObserver2.observe(document.querySelector("#savet"));
        } else {
            // aboutObserver.observe(document.querySelector("#about-picture"));
            aboutObserver.observe(document.querySelector("#text-wrapper"));
            aboutObserver.observe(document.querySelector("#key-words"));
            aboutObserver.observe(document.querySelector("#savet"));
        }
      }
      
      var x = window.matchMedia("(max-width: 1023px)")
      myFunction(x) // Call listener function at run time
      x.addEventListener("change", myFunction) // Attach listener function on state changes

}
animations();
