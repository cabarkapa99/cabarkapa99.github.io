/* TODO:

    Treba da se odradi opcija kada postoji popust
    Treba da se odradi smanjivanje tj skaliranje
    Treba da se odradi cuvanje template-a

*/

let popust = {
    postoji: false,
    procenat: 0
};
let Data;
const postojiPopust = function(){
    const daBtn = document.querySelector('.popust-prompt .popust-wrapper .da-button');
    const neBtn = document.querySelector('.popust-prompt .popust-wrapper .ne-button');
    const okBtn = document.querySelector('.input-popust-wrapper .confirm-discount');

    const popustWrapper = document.querySelector('.popust-prompt .popust-wrapper');
    const inputWrapper = document.querySelector('.popust-prompt .input-popust-wrapper');

    daBtn.addEventListener('click', ()=>{
        popustWrapper.classList.add('hidden');
        inputWrapper.classList.remove('hidden');
        popust.postoji = true;
    })

    okBtn.addEventListener('click', ()=>{
        let procentValue = document.querySelector('.input-popust-wrapper input').value
        popust.procenat = procentValue != "" ? Number.parseInt(procentValue) : 0;
        console.log(popust)
        openUploadSection();
    })
    neBtn.addEventListener('click', ()=>{
        openUploadSection();
    })
}
postojiPopust();

function openUploadSection(){
    const popustSection = document.querySelector('.popust-prompt');
    popustSection.classList.add('hidden');
    const uploadSection = document.querySelector('.upload-files-prompt');
    uploadSection.classList.remove('hidden');
}

const uploadFiles = function(){
    const dragDropZone = document.querySelector('.dragDrop-wrapper');

    dragDropZone.addEventListener('dragover', (e)=>{
        e.preventDefault();
        dragDropZone.classList.add('dragged');
    });
    dragDropZone.addEventListener('dragleave', (e)=>{
        dragDropZone.classList.remove('dragged');
    });
    dragDropZone.addEventListener('drop', (e)=>{
        e.preventDefault();
        dragDropZone.classList.remove('dragged');
        const files = e.dataTransfer.files;
        // console.log(files);
        handleFiles(files);
    })

    const browseBtn = document.querySelector('.browse-files-wrapper button');
    browseBtn.addEventListener('click', ()=>{
        const realBrowseBtn = document.querySelector('.browse-files-wrapper input');
        realBrowseBtn.click();
    })
}
uploadFiles();

function handleFiles(files){

    let promises = [];

    for(const file of files){
        let promise = new Promise((resolve, reject)=>{
            let reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function (e) {
                let data = e.target.result;
                let workbook = XLSX.read(data, { type: 'binary' });
            
                // access the data from the first sheet
                let sheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[sheetName];
                let sheetData = XLSX.utils.sheet_to_json(worksheet);
                // do something with the data
                resolve(sheetData);
            }
        })
        promises.push(promise);
    }
    
    Promise.all(promises).then(values=>{
        let allFiles = [];
        for(const value of values){
            allFiles = allFiles.concat(value);
        }
        showData(allFiles);
    })

    document.querySelector('.design-prompt').classList.remove('hidden');
    document.querySelector('.upload-files-prompt').classList.add('hidden');
}


function showData(data){
    let contentWrapper;
    if(popust.postoji){
        document.querySelector('.popust-image-wrapper').classList.remove('hidden');
        document.querySelector('.popust-bg-color').classList.remove('hidden');
        document.querySelector('.popust-image-wrapper .popust p').innerText = popust.procenat + "%";
        contentWrapper = document.querySelector('.design-prompt .popust-image-wrapper .content-wrapper');
    }else{
        document.querySelector('.image-wrapper').classList.remove('hidden');
        contentWrapper = document.querySelector('.design-prompt .content-wrapper');
    }
    console.log(data)
    Data = data;
    const designData = data[0];
    let entries = Object.entries(designData);
    contentWrapper.querySelector('.sifra p').innerText = entries[0][0] + ": " + entries[0][1];
    contentWrapper.querySelector('.naziv p').innerText = entries[1][0] + ": " + entries[1][1];
    contentWrapper.querySelector('.cena p').innerText = entries[2][0] + ": " + entries[2][1] + " rsd";
    if(popust.postoji){
        document.querySelector('.popust-image-wrapper .novaCena p').innerText = "Nova cena: " + (entries[2][1] - (entries[2][1] * popust.procenat / 100)) + " rsd"; 
    }
}
const dragFields = function(){

    const polja = document.getElementsByClassName('polje');
    // const wrapper = document.querySelector('.content-wrapper');
    // let polje = document.querySelector('.cena');
    for(const polje of polja){
        let offsetX, offsetY, drag = false;

        polje.addEventListener('mousedown', (event) => {
            drag = true;
            offsetX = event.clientX - polje.offsetLeft;
            offsetY = event.clientY - polje.offsetTop;
            for(const polje of polja){
                polje.classList.remove('selected');
            }
            polje.classList.add('selected');
            getFieldsStyle(polje);
        });
        document.addEventListener('mousemove', (event) => {
            if (drag) {
                event.preventDefault();

                /* pokusaj da se napravi da polja ne mogu da izadju iz slike */
                // let sirinaPolja = getComputedStyle(polje).width;
                // sirinaPolja = sirinaPolja.slice(0, sirinaPolja.length-2);
                // let visinaPolja = getComputedStyle(polje).height;
                // visinaPolja = visinaPolja.slice(0, visinaPolja.length-2);

                // let bodyRect = document.body.getBoundingClientRect();
                // let wrapperRect = wrapper.getBoundingClientRect();
                // console.log(bodyRect ,wrapperRect)

                // if((event.clientX - offsetX >= 0) && (event.clientX - offsetX + sirinaPolja <= wrapperRect.right)){
                // }
                // console.log(event.clientX - offsetX);
                polje.style.left = event.clientX - offsetX + 'px';
                polje.style.top = event.clientY - offsetY + 'px';
            }
        });
        document.addEventListener('mouseup', () => {
            drag = false;
        });
    }

}

dragFields();

function getFieldsStyle(polje){
    let p = polje.querySelector('p');
    let style = getComputedStyle(p);
    let color = rgbToHex(style.color);

    document.querySelector('.style-wrapper div input[type="color"]').value = color;
    document.querySelector('.style-wrapper div input[type="number"]').value = style.fontSize.slice(0, style.fontSize.length-2);
    document.querySelector('.style-wrapper div input[type="checkbox"]').checked = style.border.includes("none") ? false : true;
}
function rgbToHex(rgbColor){
    let rgbValues = rgbColor.slice(4, rgbColor.length - 1).split(',');
    let hexColor = "#";
    for(const value of rgbValues){
        let x = Number.parseInt(value).toString(16);
        if(x.length === 1){
            x = "0" + x;
        }
        hexColor += x;
    }
    return hexColor;
}
//ovde cuvamo primenjene stilove da bismo ih primenili na ostale
let Style = {
    sifra:{
        color:"#808080",
        fontSize:"16px",
        border:"none",
        top:"0%",
        left:"0%"
    },
    naziv:{
        color:"#808080",
        fontSize:"16px",
        border:"none",
        top:"0%",
        left:"0%"
    },
    cena:{
        color:"#808080",
        fontSize:"16px",
        border:"none",
        top:"0%",
        left:"0%"
    },
    popust:{
        color:"#808080",
        fontSize:"16px",
        border:"none",
        top:"0%",
        left:"0%"
    },
    novaCena:{
        color:"#808080",
        fontSize:"16px",
        border:"none",
        top:"0%",
        left:"0%"
    },
    backGround:"#e6cc00"
}

const applyStyles = function(){
    const inputs = document.querySelectorAll('.style-wrapper div input');

    for(const input of inputs){
        input.addEventListener('change', ()=>{
            let polje;
            if(popust.postoji){
                polje = document.querySelector('.popust-image-wrapper .selected p');
            }else{
                polje = document.querySelector('.selected p');
            }
            // console.log(polje.parentElement.classList);
            if(input.id === "color"){
                polje.style[`${input.id}`] = input.value;
                Style[polje.parentElement.classList[1]][`${input.id}`] = input.value;
            }else if(input.id === "fontSize"){
                polje.style[`${input.id}`] = input.value + "px";
                Style[polje.parentElement.classList[1]][`${input.id}`] = input.value + "px";
            }else if(input.id === "bg-color"){
                document.querySelector('.popust-image-wrapper').style.backgroundColor = input.value;
                Style.backGround = input.value;
            }else{
                if(input.checked){
                    polje.style.border="1px solid";
                    Style[polje.parentElement.classList[1]].border="1px solid";
                }else{
                    polje.style.border="none";
                    Style[polje.parentElement.classList[1]].border="none";
                }
            }

        })
    }
    console.log(Style);
}
applyStyles();

function izracunajDimenzijeUProcentima(dimenzijaOmotaca, dimenzijaElementa){
    let omotacX = Number.parseFloat(dimenzijaOmotaca);
    let elementX = Number.parseFloat(dimenzijaElementa.slice(0, dimenzijaElementa.length-2));
    //dimenzija omotaca : pomerenost elementa = 100% : x
    //100%pomerenostElementa = XdimenzijaOmotaca
    //100%pomerenostElementa / dimenzijaOmotaca = x
    let rezultat = ((100 * elementX)/omotacX) + "%";
    return rezultat; 
}

function computeStyle(){
    let wrapper;
    let popustWrapper;
    let popustWrapperRect;
    if(popust.postoji){
        wrapper = document.querySelector('.popust-image-wrapper .content-wrapper');
        popustWrapper = document.querySelector('.popust-image-wrapper');
        popustWrapperRect = popustWrapper.getBoundingClientRect();
    }else{
        wrapper = document.querySelector('.content-wrapper');
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const naziv = wrapper.querySelector('.naziv');
    const nazivLeft = naziv.style.left != "" ? naziv.style.left : "0px";
    const nazivTop = naziv.style.top != "" ? naziv.style.top : "0px";
    const cena = wrapper.querySelector('.cena');
    const sifra = wrapper.querySelector('.sifra');
    const cenaTop = cena.style.top != "" ? cena.style.top : "0px";
    const cenaLeft = cena.style.left != "" ? cena.style.left : "0px";
    const sifraTop = sifra.style.top != "" ? sifra.style.top : "0px";
    const sifraLeft = sifra.style.left != "" ? sifra.style.left : "0px";

    Style.naziv.top = izracunajDimenzijeUProcentima(wrapperRect.height, nazivTop);
    Style.naziv.left = izracunajDimenzijeUProcentima(wrapperRect.width, nazivLeft);

    Style.cena.top = izracunajDimenzijeUProcentima(wrapperRect.height, cenaTop);
    Style.cena.left = izracunajDimenzijeUProcentima(wrapperRect.width, cenaLeft);

    Style.sifra.top = izracunajDimenzijeUProcentima(wrapperRect.height, sifraTop);
    Style.sifra.left = izracunajDimenzijeUProcentima(wrapperRect.width, sifraLeft);

    if(popust.postoji){
        const popustPolje = popustWrapper.querySelector('.popust');
        const novaCena = popustWrapper.querySelector('.novaCena');
        const popustPoljeTop = popustPolje.style.top != "" ? popustPolje.style.top : "0px";
        const novaCenaTop = novaCena.style.top != "" ? novaCena.style.top : "0px";
        const popustPoljeLeft = popustPolje.style.left != "" ? popustPolje.style.left : "0px";
        const novaCenaLeft = novaCena.style.left != "" ? novaCena.style.left : "0px";

        Style.popust.top = izracunajDimenzijeUProcentima(popustWrapperRect.height, popustPoljeTop);
        Style.popust.left = izracunajDimenzijeUProcentima(popustWrapperRect.width, popustPoljeLeft);

        Style.novaCena.top = izracunajDimenzijeUProcentima(popustWrapperRect.height, novaCenaTop);
        Style.novaCena.left = izracunajDimenzijeUProcentima(popustWrapperRect.width, novaCenaLeft);
    }

}
const showPreview = function(){
    console.log(Data);
    computeStyle();
    console.log(Style);
    let wrapper = document.querySelector('.preview-wrapper');
    let template;
    let slicicaTemplate;
    if(popust.postoji){
        template = document.querySelector('.preview-wrapper .popust-template');
        slicicaTemplate = template.content.querySelector('.popust-image-wrapper');    
    }else{
        template = document.querySelector('.preview-wrapper .template');
        slicicaTemplate = template.content.querySelector('.image-wrapper');    
    }
    
    for(const data of Data){
        let slicica = slicicaTemplate.cloneNode(true);

        const contentWrapper = slicica.querySelector('.content-wrapper');
        let entries = Object.entries(data);

        contentWrapper.querySelector('.sifra p').innerText = entries[0][0] + ": " + entries[0][1];
        let sifraFontSize = Number.parseInt(Style.sifra.fontSize.slice(0, Style.sifra.fontSize.length-2)) / 3;
        contentWrapper.querySelector('.sifra p').style.fontSize = Number.parseInt(sifraFontSize) + "px";
        contentWrapper.querySelector('.sifra p').style.color = Style.sifra.color;
        contentWrapper.querySelector('.sifra p').style.border = Style.sifra.border;
        contentWrapper.querySelector('.sifra').style.top = Style.sifra.top;
        contentWrapper.querySelector('.sifra').style.left = Style.sifra.left;

        contentWrapper.querySelector('.naziv p').innerText = entries[1][0] + ": " + entries[1][1];
        let nazivFontSize = Number.parseInt(Style.naziv.fontSize.slice(0, Style.naziv.fontSize.length-2)) / 3;
        contentWrapper.querySelector('.naziv p').style.fontSize = Number.parseInt(nazivFontSize) + "px";
        contentWrapper.querySelector('.naziv p').style.color = Style.naziv.color;
        contentWrapper.querySelector('.naziv p').style.border = Style.naziv.border;
        contentWrapper.querySelector('.naziv').style.top = Style.naziv.top;
        contentWrapper.querySelector('.naziv').style.left = Style.naziv.left;

        contentWrapper.querySelector('.cena p').innerText = entries[2][0] + ": " + entries[2][1] + " rsd";
        if(popust.postoji){
            slicica.querySelector('.novaCena p').innerText = "Nova cena: " + (entries[2][1] - (entries[2][1] * popust.procenat / 100)) + " rsd"; 
            slicica.querySelector('.popust p').innerText = popust.procenat + "%";

            slicica.style.backgroundColor = Style.backGround;

            slicica.querySelector('.popust').style.top = Style.popust.top;
            slicica.querySelector('.popust').style.left = Style.popust.left;

            let popustFontSize = Number.parseInt(Style.popust.fontSize.slice(0, Style.popust.fontSize.length-2)) / 1;
            slicica.querySelector('.popust p').style.fontSize = Number.parseInt(popustFontSize) + "px";
            slicica.querySelector('.popust p').style.color = Style.popust.color;
            slicica.querySelector('.popust p').style.border = Style.popust.border;

            slicica.querySelector('.novaCena').style.top = Style.novaCena.top;
            slicica.querySelector('.novaCena').style.left = Style.novaCena.left;

            let novaCenaFontSize = Number.parseInt(Style.novaCena.fontSize.slice(0, Style.novaCena.fontSize.length-2)) / 1.5;
            slicica.querySelector('.novaCena p').style.fontSize = Number.parseInt(novaCenaFontSize) + "px";
            slicica.querySelector('.novaCena p').style.color = Style.novaCena.color;
            slicica.querySelector('.novaCena p').style.border = Style.novaCena.border;
        }
        let cenaFontSize = Number.parseInt(Style.cena.fontSize.slice(0, Style.cena.fontSize.length-2)) / 3;
        contentWrapper.querySelector('.cena p').style.fontSize = Number.parseInt(cenaFontSize) + "px";
        contentWrapper.querySelector('.cena p').style.color = Style.cena.color;
        contentWrapper.querySelector('.cena p').style.border = Style.cena.border;
        contentWrapper.querySelector('.cena').style.top = Style.cena.top;
        contentWrapper.querySelector('.cena').style.left = Style.cena.left;

        wrapper.appendChild(slicica);
    }

    document.querySelector('.design-prompt').classList.add('hidden');
    document.querySelector('.preview-wrapper').classList.remove('hidden');
}

const makePreview = function(){
    const btn = document.querySelector('.next-button-wrapper button');
    btn.addEventListener('click', showPreview);
}
makePreview();

