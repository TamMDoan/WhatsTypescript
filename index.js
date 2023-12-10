"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
//require("./style.css");
//console.log("Testing ts");
//const form = document.querySelector('#defineform');


function fetchWordData(word){
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
                            //console.log(def);
                            //console.log(def.definitions[0].definition);
                            // make an if-else here
                            // if the pos is already created,
                            //      add the def under it
                            // else make a new pos & add the def under that
                            if(document.getElementById(`definitions-${def.partOfSpeech}`) != null){
                                console.log("in if");
                                const defintionMarkUp = `<li>${def.definitions[0].definition}</li>`;
                                document.getElementById(`definitions-${def.partOfSpeech}`).insertAdjacentHTML("beforeend", defintionMarkUp);
                            }
                            else{
                                console.log("in else");
                                const posMarkUp = `<li id="pos" class="${def.partOfSpeech}">${def.partOfSpeech}</li><ul id="definitions-${def.partOfSpeech}"></ul>`;
                                document.getElementById('definitionBody').insertAdjacentHTML("beforeend", posMarkUp);
                                const defintionMarkUp = `<li>${def.definitions[0].definition}</li>`;
                                document.getElementById(`definitions-${def.partOfSpeech}`).insertAdjacentHTML("beforeend", defintionMarkUp);
                            }
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
