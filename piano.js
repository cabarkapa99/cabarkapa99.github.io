const c = document.getElementById('c');
const cis = document.getElementById('c#');
const d = document.getElementById('d');
const dis = document.getElementById('d#');
const e = document.getElementById('e');
const f = document.getElementById('f');
const fis = document.getElementById('f#');
const g = document.getElementById('g');
const gis = document.getElementById('g#');
const a = document.getElementById('a');
const ais = document.getElementById('a#');
const h = document.getElementById('h');

const vpiano = document.getElementById('piano-video');

function stopPiano(){
    vpiano.pause();
}
vpiano.addEventListener('playing',()=>{
    setTimeout(stopPiano,2000);
});
function changeKeyColor(e){
    e.target.classList.add('shadow');
    setTimeout(()=>{
        e.target.classList.remove('shadow');
    }, 1000)
}

c.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 24;
    changeKeyColor(e);
});
cis.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 38;
    changeKeyColor(e);
});
d.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 48;
    changeKeyColor(e);
});
dis.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 62;
    changeKeyColor(e);
});
e.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 72;
    changeKeyColor(e);
});
f.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 96;
    changeKeyColor(e);
});
fis.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 110;
    changeKeyColor(e);
});
g.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 120;
    changeKeyColor(e);
});
gis.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 134;
    changeKeyColor(e);
});
a.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 144;
    changeKeyColor(e);
});
ais.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 158;
    changeKeyColor(e);
});
h.addEventListener('click', (e)=>{
    vpiano.muted=false;
    vpiano.play();
    vpiano.currentTime = 168;
    changeKeyColor(e);
});