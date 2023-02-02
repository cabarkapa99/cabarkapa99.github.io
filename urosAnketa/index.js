
const getProjects = async function(){
    let res = await fetch("http://127.0.0.1:5500//pitanja.json");
    let data = await res.json();
    return data;
}

async function showProjects(){
    let projects = await getProjects();

    let templateQuestion = document.querySelector('.template-question');
    let question = templateQuestion.content.querySelector('.question-wrapper');

    const container = document.querySelector('.container');

    let indexOfList = 0;
    for(const project of projects){
        indexOfList++;
        const q = question.cloneNode(true);
        q.querySelector('.question h3').innerText = project.naslov;
        let list = q.querySelector('.answer select');
        list.id=indexOfList;
        givenPoints[indexOfList] = list.value;
        container.appendChild(q);
    }

    showGrades();
    console.log(givenPoints)
}
showProjects();

const givenPoints = {
    // listID : value of list    
}

function showGrades(){
    let maxPoints = 5;
    let selectLists = document.querySelectorAll('.answer select');
    console.log(selectLists)

    for(const list of selectLists){
        for(let i = 0; i <= maxPoints; i++){
            let option = document.createElement('option');
            option.value=`${i}`;
            option.innerText=`${i}`;
            list.appendChild(option);
        }

        list.addEventListener('change', ()=>{
            let previosValue = givenPoints[list.id];
            console.log(previosValue);
            givenPoints[list.id]=list.value;
            console.log(givenPoints);
            updateGradesLists(previosValue);
        })
    }
}

function updateGradesLists(previosValue){
    // na osnovu zapisa u objektu updateuje liste za izbor poena
    let selectLists = document.querySelectorAll('.answer select');
    for(const list of selectLists){
        for(let id in givenPoints){

            let previosOption = list.querySelector(`option[value="${previosValue}"]`);

            //ne diramo liste koje nemaju value ili im je value 0 i ne diramo onu listu koja je selektovala vrednost
            if(givenPoints[id] != "" && givenPoints[id] != "0" && id != list.id){
                let option = list.querySelector(`option[value="${givenPoints[id]}"]`);
                option.classList.add('hidden');
                if(previosOption != null){
                    previosOption.classList.remove('hidden');
                }
            }else if(givenPoints[id] === "0" && previosOption != null && id != list.id){
                previosOption.classList.remove('hidden');
            }
        }
    }
}