const generisiOdgovore = function(){
    const anketaDivs = document.querySelectorAll('.anketa');
    for(const anketadiv of anketaDivs){
        for(let polje in od15do35){
            let odgovor = document.createElement('div');
            odgovor.classList.add('rezultat');
            odgovor.classList.add(polje);

            anketadiv.appendChild(odgovor);
        }
    }
}
generisiOdgovore()

function prikaziOdgovore(){
    let nizAnketaKlasa = ['.svi', '.od15do35', '.od35do55', '.od55', '.muskarci', '.zene'];
    let nizObjekataOdgovra = [svi, od15do35, od35do55, od55, muskarci, zene];

    for(let i = 0; i<6; i++){
        generisiOdgovoreZaAnketu(nizAnketaKlasa[i], nizObjekataOdgovra[i]);
    }
}
prikaziOdgovore();

function generisiOdgovoreZaAnketu(anketaClass, data){
    let anketa = document.querySelector(anketaClass);
    let rezultati = anketa.querySelectorAll('.rezultat');

    let spisakPitanja = [];

    for(let pitanje in primerPitanja){
        spisakPitanja.push(pitanje);
    }
    

    //ovde prolazimo kroz ukupan broj odgovra
    for(let i = 0; i < rezultati.length; i++){
        
        let naslov = spisakPitanja[i];
        let htmlElement = anketaClass + " ." + rezultati[i].classList[1];

        //provera brojeva odgovra za piechart
        if((i+1) === 1 || (i+1) === 5 ||(i+1) === 7 || (i+1) === 10 || (i+1) === 11 || (i+1) === 17
        || (i+1) === 18 || (i+1) === 19 || (i+1) === 21 || (i+1) === 22 || (i+1) === 23 || (i+1) === 24 || 
        (i+1) === 30 || (i+1) === 31 || (i+1) === 32 || (i+1) === 33 || (i+1) === 34){

            let odgovor = data[rezultati[i].classList[1]];
            let nizPodataka = [['A', 'B']];
            for(let o in odgovor){
                let niz = [o, odgovor[o]];
                nizPodataka.push(niz);
            }
            nacrtajPieChart(naslov, nizPodataka, htmlElement);
        }
        if((i+1)===2 || (i+1)===20 || (i+1)===27){
            let odgovor = data[rezultati[i].classList[1]];
            let nizPodataka = [['A', 'Prosecna ocena']];
            for(let o in odgovor){
                // let niz = [o, odgovor[o].prosek];
                // nizPodataka.push(niz);
                let zbirVrednosti = 0;
                for(let i in odgovor[o]){
                    if(!(i === 'prosek')){
                        let vrednost = Number.parseInt(i);
                        console.log(i, o)
                        console.log(odgovor[o][i])
                        let ukupnaVrednost = vrednost * odgovor[o][i];
                        zbirVrednosti += ukupnaVrednost;
                    }
                }
                let niz = [o, zbirVrednosti];
                nizPodataka.push(niz);
            }
            nizPodataka.sort(function(x, y){
                if(x[1] < y[1]){
                    return 1;
                }
                if(x[1] > y[1]){
                    return -1;
                }
                return 0;
            })
            nacrtajColumnChart(naslov, nizPodataka, htmlElement);
        }
        if((i+1)===3 || (i+1)===8 ||(i+1)===25 ||(i+1)===26 ||(i+1)===35){
            let odgovor = data[rezultati[i].classList[1]];
            let nizPodataka = [['A','Br. korisnika']];
            for(let o in odgovor){
                let niz = [o, odgovor[o]];
                nizPodataka.push(niz);
            }
            nizPodataka.sort(function(x, y){
                if(x[1] < y[1]){
                    return 1;
                }
                if(x[1] > y[1]){
                    return -1;
                }
                return 0;
            })
            nacrtajBarChart(naslov, nizPodataka, htmlElement);
        }
        if((i+1)===4 || (i+1)===6 || (i+1)===9 || ((i+1)>=12 && (i+1)<=16) || (i+1)===28 || (i+1)===29){
            let odgovor = data[rezultati[i].classList[1]];
            let nizPodataka = [['A', 'Prosecna ocena'], ['Prosecna ocena', odgovor.prosek]];
            
            
            nacrtajColumnChartLikerta(naslov, nizPodataka, htmlElement);
        }
    }

}

function nacrtajPieChart(naslov, nizPodataka, htmlElement){
            // Load google charts
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
        
            // Draw the chart and set the chart values
            function drawChart() {
            var data = google.visualization.arrayToDataTable(nizPodataka);
        
            // Optional; add a title and set the width and height of the chart
            var options = {'title':naslov,sliceVisibilityThreshold:0};
        
            // Display the chart inside the <div> element with id="piechart"
            var chart = new google.visualization.PieChart(document.querySelector(htmlElement));
            chart.draw(data, options);
            }
}
function nacrtajColumnChart(naslov, nizPodataka, htmlElement){
            // Load google charts
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
        
            // Draw the chart and set the chart values
            function drawChart() {
            var data = google.visualization.arrayToDataTable(nizPodataka);
            let ticks = [];
            for(let i=0; i<nizPodataka.length; i++){
                ticks.push(i);
            }
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                             { calc: "stringify",
                               sourceColumn: 1,
                               type: "string",
                               role: "annotation" }]);
        
            // Optional; add a title and set the width and height of the chart
            var options = {'title':naslov,sliceVisibilityThreshold:0,legend: { position: "none" }, vAxis:{ticks:ticks}};
        
            // Display the chart inside the <div> element with id="piechart"
            var chart = new google.visualization.ColumnChart(document.querySelector(htmlElement));
            chart.draw(view, options);
            }
}
function nacrtajColumnChartLikerta(naslov, nizPodataka, htmlElement){
                // Load google charts
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);
            
                // Draw the chart and set the chart values
                function drawChart() {
                var data = google.visualization.arrayToDataTable(nizPodataka);

                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                                 { calc: "stringify",
                                   sourceColumn: 1,
                                   type: "string",
                                   role: "annotation" }]);
            
                // Optional; add a title and set the width and height of the chart
                var options = {'title':naslov,sliceVisibilityThreshold:0,legend: { position: "none" }, vAxis:{ticks:[0, 1, 2, 3, 4, 5]}, chartArea:{width:200}};
            
                // Display the chart inside the <div> element with id="piechart"
                var chart = new google.visualization.ColumnChart(document.querySelector(htmlElement));
                chart.draw(view, options);
                }
}
function nacrtajBarChart(naslov, nizPodataka, htmlElement){
                // Load google charts
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);
            
                // Draw the chart and set the chart values
                function drawChart() {
                var data = google.visualization.arrayToDataTable(nizPodataka);
                var view = new google.visualization.DataView(data);
                view.setColumns([0, 1,
                                 { calc: function(dt, row){
                                    let x = dt.getValue(row, 1);
                                    let percentage = (x*100/69).toFixed(2);
                                    let string = x + " (" + percentage +"%)";
                                    return string
                                 },
                                   type: "string",
                                   role: "annotation" }]);
            
                // Optional; add a title and set the width and height of the chart
                var options = {'title':naslov,sliceVisibilityThreshold:0, legend: { position: "none" }};
            
                // Display the chart inside the <div> element with id="piechart"
                var chart = new google.visualization.BarChart(document.querySelector(htmlElement));
                chart.draw(view, options);
                }
}
