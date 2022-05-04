let events = [];//niz u koji smestamo objekte dogadjaje
let brojacProslihDogadjaja = 0;

const eventsContainer = document.getElementById('horizontal-scroll');

//f-ja koja pravi dogadjaj na stranici
const napraviDogadjaj = function(dogadjaj){

    const divEvent = document.createElement('div');
    divEvent.className = "event";

    const nameh = document.createElement('h3');
    const nameText = document.createTextNode('"' + dogadjaj.name + '"');
    nameh.appendChild(nameText);
    divEvent.appendChild(nameh);

    const locationh = document.createElement('h4');

    const locIcon = document.createElement('i');
    locIcon.className = "fa fa-map-marker";
    locationh.appendChild(locIcon);

    const locationText = document.createTextNode(' ' + dogadjaj.location);
    locationh.appendChild(locationText);
    divEvent.appendChild(locationh);

    const dateh = document.createElement('h5');

    const dateIcon = document.createElement('i');
    dateIcon.className = "fa fa-calendar-check-o";
    dateh.appendChild(dateIcon);

    const dateText = document.createTextNode(' ' + dogadjaj.date);
    dateh.appendChild(dateText);
    divEvent.appendChild(dateh);

    if(isActive(dogadjaj.when)){
        const a = document.createElement('a');
        if(dogadjaj.link === ''){
            a.href = "#events-container"
        }else{
            a.href = dogadjaj.link;
        }
        const aText = document.createTextNode('TICKETS');
        a.appendChild(aText);
        divEvent.appendChild(a);
    }else{
        const note = document.createElement('p');
        const noteText = document.createTextNode('This event has ended');
        note.appendChild(noteText);
        divEvent.appendChild(note);
        brojacProslihDogadjaja++;
    }


    eventsContainer.appendChild(divEvent);
};

//dohvatamo dogadjaje iz json fajla na serveru
const getEvents = async function(){
    let res = await fetch('https://github.com/cabarkapa99/cabarkapa99.github.io/blob/main/hsajt/files/events.json');
    let data = await res.json();
    return data;
}
const prikaziDogadjaje = async function(){
    events = await getEvents();

    // sortiramo objekte dogadjaja u nizu prema datumu
    events.sort(compareEvents);

    //prikazujemo sve dogadjaje na stranici
    for(const event of events){
        napraviDogadjaj(event);
    }
    //kada prvi put udje u events oni se scroluju
    const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            skrolujDogadjaje();
            observer.unobserve(eventsContainer);
        }
    },{threshold: 1});
    observer.observe(eventsContainer);
}
prikaziDogadjaje();


const compareEvents = function(ev1, ev2){
    let d1 = ev1.when.substr(0, 2);
    let d2 = ev2.when.substr(0, 2);

    let m1 = ev1.when.substr(2, 2);
    let m2 = ev2.when.substr(2, 2);

    let y1 = ev1.when.substr(4, 4);
    let y2 = ev2.when.substr(4, 4);

    let date1 = y1 + '-' + m1 + '-' + d1;
    let date2 = y2 + '-' + m2 + '-' + d2;

    const dat1 = new Date(date1);
    const dat2 = new Date(date2);

    if(dat1 > dat2){
        return 1;
    }else if(dat1 < dat2){
        return -1;
    }else{
        return 0;
    }
};


// proveravamo da li je dogadjaj i dalje aktivan
function isActive(when){
    let today = new Date();
    let d = when.substr(0, 2);
    let m = when.substr(2, 2);
    let y = when.substr(4, 4);
    let dat = y + '-' + m + '-' + d;
    let date = new Date(dat);

    if(date >= today){
        return true;
    }else{
        return false;
    }
}

function skrolujDogadjaje(){
    //racunamo sirinu i margine prvog elementa sa stranice
    const evDivs = document.getElementsByClassName('event');
    const evDiv = evDivs[0];
    const evDivStyle = getComputedStyle(evDiv) || evDiv.currentStyle;
    const evDivStyleMargins = (Number.parseInt(evDivStyle.marginLeft.substr(0, 2))) * 2;
    
    //scrolujemo toliko da prosli dogadjaji budu levo neprikazani
    eventsContainer.scrollLeft = brojacProslihDogadjaja * (evDiv.scrollWidth + evDivStyleMargins);
    console.log(evDivStyleMargins);
}
