//dohvatamo elemente za prikaz nastranici
const imgContainer = document.getElementById('imgContainer');
const dataContainer = document.getElementById('dataContainer');

const s = document.getElementById('greska');

const fileBtn = document.getElementById('uploadPic');
fileBtn.addEventListener('change', ()=>{
    //kad se unese fajl proveravamo da li je uneta 1 slika
    if(fileBtn.files.length === 1){
        const fileList = fileBtn.files;
        const file = fileList[0];
        if(file.type.startsWith('image/')){
            //pravimo url za sliku i pravimo sliku
            const imgUrl = URL.createObjectURL(file);
            const img = document.createElement('img');
            img.src = imgUrl;
            img.classList.add('pic');
            // img.onload = () =>{
            //     //kad se slikaucita sklanjamo url object
            //     URL.revokeObjectURL(img.src);
            // }
            //dodajemo sliku u body
            imgContainer.appendChild(img);
            //ukoliko je bila prikazana greska, brisemo je
            s.style.display = 'none';
        }else{
            greska(s, 'Odaberite sliku!');
        }
    }else{
        greska(s, 'Greska pri odabiru slike!');
    }
});

//dohvatamo drugi element za gresku
const s2 = document.getElementById('ExcelGreska');
//globalna varijabla za niz podataka iz excela
let rowsArray;


const excBtn = document.getElementById('uploadExcel');
excBtn.addEventListener('change', ()=>{
    //prvo mora da bude izabrana slika
    if(document.querySelector('img') != null){
        //proveravamo da li je izabran jedan fajl i da li je to excel fajl
        if(excBtn.files.length === 1){
            const fileList = excBtn.files;
            const file = fileList[0];
            let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if(regex.test(file.name.toLowerCase())){
                //proveravamo da li browser podrzava html5
                if(typeof(FileReader) != 'undefined'){
                    s2.style.display='none';
                    const reader = new FileReader();

                    //za sve osim IE
                    if(reader.readAsBinaryString){
                        reader.onload = (e)=>{
                            rowsArray = processExcel(e.target.result);
                            napraviPregled(rowsArray);
                        };
                        reader.readAsBinaryString(file);
                    }else{
                        //za IE
                        reader.onload = (e)=>{
                            let data = "";
                            let bytes = new Uint8Array(e.target.result);
                            for(let i=0; i<bytes.byteLength; i++){
                                data += String.fromCharCode(bytes[i]);
                            }
                            rowsArray = processExcel(data);
                            napraviPregled(rowsArray);
                        };
                        reader.readAsArrayBuffer(file);
                    }
                }else{
                    greska(s2, 'Ovaj browser ne podrzava HTML5, probajte drugi!');
                }

            }else{
                greska(s2, 'Odaberite Excel fajl!');
            }
        }else{
            greska(s2, 'Greska pri odabiru fajla!');
        }
    }else{
        greska(s, 'Prvo izaberite sliku!');
    }
});

//ova  fja koristi api da bi procitala podatke iz excelred po red
function processExcel(data){
    let workbook = XLSX.read(data, {type: 'binary'});
    const firstSheet = workbook.SheetNames[0];
    let rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    return rows;
}
const previewBtn = document.getElementById('previewBtn');

//prikazujemo na stranici podatke iz prvog reda
function napraviPregled(rowsArray){

    //kreiramo input koji odredjuje velicinu pomeraja
    const korakInput = document.createElement('input');
    korakInput.type='number';
    korakInput.value='1';
    korakInput.id='korakInput';
    korakInput.min = '1';
    korakInput.max = '100';
    dataContainer.appendChild(korakInput);

    //labela za taj input
    const korakLabel = document.createElement('label');
    korakLabel.innerText=' Korak pomeranja u %';
    korakLabel.for='korakInput';
    korakLabel.id='korakLabel';
    dataContainer.appendChild(korakLabel);

    //funkcija koja odredjuje korak pomeraja
    function korak(){
        const korakInput = document.getElementById('korakInput');
        const korak = parseInt(korakInput.value);
        return korak;
    }
    const firsrRow = rowsArray[0];
    for( const column in firsrRow){

        let nazivPolja;
        if(column.toLowerCase() != 'naziv'){
            nazivPolja = column + ': ';
        }else{
            nazivPolja = '';
        }

        let vrednostPolja;
        if(column.toLowerCase() === 'cena'){
            vrednostPolja = firsrRow[column] + ' rsd';
        }else{
            vrednostPolja = firsrRow[column];
        }
        
        const div = document.createElement('div');
        div.classList.add('polje');
        div.innerText = nazivPolja + vrednostPolja;
        imgContainer.appendChild(div);

        //pravimo div za upravljanje prikazanim podacima
        const ctrlDiv = document.createElement('div');
        ctrlDiv.classList.add('ctrlPolje');

        const levo = document.createElement('span');
        levo.innerText = '\u2190';
        ctrlDiv.appendChild(levo);
        let x = 0;
        let y = 0;
        levo.addEventListener('click', ()=>{
            const k = korak();
            x-=k;
            div.style.top =`${y}%`;
            div.style.left = `${x}%`;
        });

        const desno = document.createElement('span');
        desno.innerText = '\u2192';
        ctrlDiv.appendChild(desno);
        desno.addEventListener('click', ()=>{
            const k = korak();
            x+=k;
            div.style.top =`${y}%`;
            div.style.left = `${x}%`;
        });

        const gore = document.createElement('span');
        gore.innerText = '\u2191';
        ctrlDiv.appendChild(gore);
        gore.addEventListener('click', ()=>{
            const k = korak();
            y-=k;
            div.style.top =`${y}%`;
            div.style.left = `${x}%`;
        });

        const dole = document.createElement('span');
        dole.innerText = '\u2193';
        ctrlDiv.appendChild(dole);
        dole.addEventListener('click', ()=>{
            const k = korak();
            y+=k;
            div.style.top =`${y}%`;
            div.style.left = `${x}%`;
        });

        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.innerText = ' Font Size: ';
        fontSizeLabel.for = 'fontSizeInput';
        ctrlDiv.appendChild(fontSizeLabel);

        const fontSizeInput = document.createElement('input');
        fontSizeInput.type='number';
        fontSizeInput.min='18';
        fontSizeInput.max='64';
        fontSizeInput.value='18';
        fontSizeInput.id='fontSizeInput';
        fontSizeInput.addEventListener('change', ()=>{
            div.style.fontSize = fontSizeInput.value + 'px';
        })
        ctrlDiv.appendChild(fontSizeInput);

        const colorLabel = document.createElement('label');
        colorLabel.innerText = ' Boja teksta: ';
        ctrlDiv.appendChild(colorLabel);

        const colorInput = document.createElement('input');
        colorInput.type='color';
        colorInput.value='black';
        colorInput.id='colorInput';
        colorInput.addEventListener('change', ()=>{
            div.style.color=colorInput.value;
        })
        ctrlDiv.appendChild(colorInput);

        const borderLabel = document.createElement('label');
        borderLabel.innerText = ' Border: '
        ctrlDiv.appendChild(borderLabel);

        const borderInput = document.createElement('input');
        borderInput.type='checkbox';
        borderInput.id='borderInput';
        borderInput.addEventListener('change', ()=>{
            if(borderInput.checked){
                div.style.border = '1px solid' + colorInput.value;
            }else{
                div.style.border = 'none';
            }
        })
        ctrlDiv.appendChild(borderInput);

        dataContainer.appendChild(ctrlDiv);
        //sada prikazujemo dugme preview
        previewBtn.style.display='inline';
        
    }
}

const greska = function(node, poruka){
    node.innerText = poruka;
    node.style.display = 'inline';
}
previewBtn.addEventListener('click', ()=>{
    const prevDiv = document.getElementById('preview');
    
    //sada za svaki red iz excel tabele pravimo tag
    for(const row of rowsArray){
        let niz =[];
        for(const column in row){
            let nazivPolja;
            if(column.toLowerCase() != 'naziv'){
                nazivPolja = column + ': ';
            }else{
                nazivPolja = '';
            }
    
            let vrednostPolja;
            if(column.toLowerCase() === 'cena'){
                vrednostPolja = row[column] + ' rsd';
            }else{
                vrednostPolja = row[column];
            }
            const colStr = nazivPolja + vrednostPolja;
            niz.push(colStr);
        }

        const tag = krejirajTag(niz);
        prevDiv.appendChild(tag);
    }
    /****Ovde bi trebalo zatvoriti url za sliku!!! *****/ 

    //kada se otvor preview otvara se i close dugme
    //ono brise svu decu i gasi preview prozor
    const cls = document.getElementById('close');
    cls.addEventListener('click', ()=>{
        prevDiv.style.display = 'none';
        const nodes = prevDiv.children;
        for(let i=nodes.length; i>0; i--){
            prevDiv.removeChild(nodes[i-1]);
        }
        cls.style.display='none';
    })
    cls.style.display = 'inline';
    prevDiv.style.display='block';
})

function krejirajTag(niz){
    //dobijamo niz stringova koji treba da se nadju na slici
    //pravimo imgContainer
    const container = document.createElement('div');
    container.classList.add('previewImgContainer');
    //dohvatamo postojeci imgContainer zbog podataka
    const nodes = imgContainer.children;
    const Cstyle = getComputedStyle(imgContainer);
    const w = Cstyle.width;
    const h = Cstyle.height;
    const picSrc = nodes[0].src;
    //pravimo sliku
    const pic = document.createElement('img');
    pic.src = picSrc;
    pic.classList.add('pic');
    container.appendChild(pic);
    //sada pravimo polja sa stringovima iz niza 
    // i preuzimamo stil iz pocetnog imgContainera
    for(let i=1; i<nodes.length; i++){
        const polje = document.createElement('div');
        polje.classList.add('polje');
        polje.innerText = niz[i-1];
        const style = getComputedStyle(nodes[i]);
        const l = parseInt(style.left) * 100 / parseInt(w);
        const t = parseInt(style.top) * 100 / parseInt(h);
        polje.style.top = t + '%';
        polje.style.left = l + '%';
        polje.style.fontSize = (parseFloat(style.fontSize) / 3) +  'px';
        polje.style.color = style.color;
        polje.style.border = style.border;
        container.appendChild(polje);
    }
    return container; 
}