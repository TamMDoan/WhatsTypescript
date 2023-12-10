"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
//require("./style.css");
//console.log("Testing ts");
//const form = document.querySelector('#defineform');


function fetchWordData(word){
    let num = 0;
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word).then(res => {return res.json()}).then(
        data => {
            console.log(data);
            console.log(data[0].meanings);
            document.getElementById('wordHeading').innerHTML = word;
            //console.log(data[0].word);
            data.forEach(
                result => {
                    const definition = result.meanings;
                    //console.log(definition[0]);
                    definition.forEach(
                        def => {

                            const definitionId = "definitions" + num;
                            console.log(def);
                            console.log(def.definitions[0].definition);
                            const posMarkUp = `<li id="pos">${def.partOfSpeech}</li><ul id="definitions${num}"></ul>`;
                            document.getElementById('definitionBody').insertAdjacentHTML("beforeend", posMarkUp);
                            const defintionMarkUp = `<li>${def.definitions[0].definition}</li>`;
                            document.getElementById(`definitions${num}`).insertAdjacentHTML("beforeend", defintionMarkUp);

                            num++;
                        }
                    )
                }
            )
            
        });
};

function clearPrev(){
    console.log(document.getElementById('definitionBody'.innerHTML));
    if(document.getElementById('pos') != null){
        const posList = document.getElementById('definitionBody');
        console.log("in clearPrev(): " + posList.hasChildNodes());
        while(posList.hasChildNodes()){
            if(posList.firstElementChild == null){
                break;
            }
            console.log(posList.firstElementChild);
            posList.removeChild(posList.firstElementChild);
            
        }
        //document.getElementById('pos').remove();
    }
    
}

function testingReload(event){
    event.preventDefault();
    clearPrev();
    console.log("in the function");
    const wordToSearch = document.getElementById('wordToSearch').value;
    console.log(wordToSearch);
    fetchWordData(wordToSearch);
    return false; // prevent reload
};
