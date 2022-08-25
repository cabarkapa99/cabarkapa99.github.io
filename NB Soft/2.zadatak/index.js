const data = {}; //ovde cemo da sacuvamo unete podatke kako bismo ih prikazali

const registerBtn = document.getElementById('register');    //submit dugme
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();     //iskljucujemo default slanje
    if(validirajFormu()){
        //ukoliko je prosla validacija saljemo POST XMLHttpRequest na url
        //u objektu data se nalaze sada svi uneti podaci tkd saljemo data
        let url = '/';
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.addEventListener('load', function(){
            if(xhr.status === 200){
                window.location.reload();
            }
            else{
                console.error(xhr.statusText);
            }
        });
        xhr.addEventListener('error', () =>{
            console.error('Problem priilikom slanja zahteva');
        });
        xhr.send(JSON.stringify(data));

        //nakon sto smo poslali podatke sklanjamo formu
        const form = document.querySelector('form');
        form.classList.add('hide');

        // upisujemo sve podatke u elemente za prikaz
        const imeIPrezime = document.querySelector('#podaci #ime-prezime');
        imeIPrezime.innerText = `Ime: ${data.name} Prezime: ${data.surname}`;

        const polIGodine = document.querySelector('#podaci #pol-godine');
        polIGodine.innerText = `Pol: ${data.pol} , Godina rodjenja: ${data.year}`;
        
        const adr = document.querySelector('#podaci #adresa');
        adr.innerText = `Adresa: ${data.address}`;

        //prikazujemo poruku i poslate podatke
        const conf = document.getElementById('confirmation');
        conf.classList.remove('hide');
    }

})
const validirajFormu = function(){
    //dohvatamo polje po polje i proveravamo
    // vracamo true ako je sve u redu, a false u suprotnom
    //ukoliko je unos korektan upisujemo ga u data objekat 
    // kako bismo sacuvali podatke za kasnije

    const nameInput = document.getElementById('Name');
    const name = nameInput.value.trim();

    if(!(/^[a-z ,.'-]+$/i.test(name) && name != '' && name.length < 15)){
        error('Greska u polju sa imenom!', nameInput);

        return false;
    }else{
        data.name = name;
    }

    const surnameInput = document.getElementById('Surname');
    const surname = surnameInput.value.trim();

    if(!(/^[a-z ,.'-]+$/i.test(surname) && surname != '' && surname.length < 15)){
        error('Greska u polju sa prezimenom!', surnameInput);

        return false;
    }else{
        data.surname = surname;
    }

    const polInput = document.getElementById('pol');
    const pol = polInput.value;

    if(pol === ""){
        error('Odaberite pol', polInput);

        return false;
    }else{
        data.pol = pol;
    }

    const yearInput = document.getElementById('year');
    const year = yearInput.value.trim();
    if(!(/^\d+$/.test(year) && year != '' && year.length === 4 )){
        error('Unesite godinu rodjenja od 4 cifre!', yearInput);

        return false;
    }else{
        data.year = year;
    }

    const addressInput = document.getElementById('address');
    const address = addressInput.value.trim();
    if(!(/*/^[a-z0-9]+$/i*//^[\w\-\s]+$/.test(address))){
        error('Greska u polju za adresu!', addressInput);
        return false;
    }else{
        data.address = address;
    }

    const termsInput = document.getElementById('terms');
    if(!termsInput.checked){
        error('Prihvatite terms and conditions', termsInput);
        return false;
    }
        
    return true;
}
const error = function(msg, el){        // f-cija za ispis greske
    const g = document.getElementById('greska');
    const greska = document.querySelector('#greska span');
    g.style.display='block';
    greska.innerText = msg;
    el.focus();
    el.addEventListener('input', ()=>{
        g.style.display='none';
    })
}
