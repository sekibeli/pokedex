let pokemons = [];
let allPokemons = [];
let allNames = [];
let beginsWith = [];
let allPokes = [];
let ids = [];
let searchedPokemons = [];

let pokemonsOnScreen;
let count = 1;

async function load30Pokemon() {

    for (i = count; i < count + 30; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);



    }
    console.log('Server antwortet: ', pokemons);
    renderPokemonInfo();
    count += 30;
    console.log(count);
    loadTheRest();
  

}

async function loadTheRest(){
    for (let i = 30; i < 1300; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
}
}

function renderPokemonInfo() {
    for (j = count - 1; j < pokemons.length; j++) {

        document.getElementById(`main`).innerHTML += pokemonMainTemplate(j);

        renderTypes(j);
        renderStats(j);
        getMax(j);
        renderMoves(j);
        renderAbilities(j);
        renderBaseExperience(j)
    }
}

function pokemonMainTemplate(j){
return `
<div class="card">
    <div class="pokedexCard ${pokemons[j].types[0].type.name}" id="pokedex${j}">
         <div class="name">
                <h2 id="pokemonName${j}">${pokemons[j].name}</h2>
                 <div class="types" id="types${j}"></div>
        </div>
        <span class="id" id="id${j}">#${pokemons[j].id}</span>
        <img class="pokeImg" src=${pokemons[j].sprites.other.dream_world.front_default}>
        <img class="poke_icon" src="./img/pokemon_bg_wht.png">
    </div>  
    <div id="heiWei">
        <span>${(pokemons[j].height)/10} m</span><br>
        <span>${(pokemons[j].weight)/10} kg</span>
        </div>
    <div class="info-container">
         <nav class="line">
             <ul class="menu">
                
                <li id="stats${j}" onclick="show('statsContainer${j}', 'movesContainer${j}')">Base Stats</li>
                 <li id="moves${j}" onclick="show('movesContainer${j}', 'statsContainer${j}')">Moves</li>
         </nav>
        

    <div id="statsContainer${j}" class="statsContainer"></div>
    <div id="movesContainer${j}" class="movesContainer d-none"></div>
   
    </div>
    </div>`;
}

function renderTypes(j) {
    for (let i = 0; i < pokemons[j].types.length; i++) {
        document.getElementById(`types${j}`).innerHTML += `<span> ${pokemons[j].types[i].type.name}</span> `;
    }
}

function renderStats(j){
    for (let i = 0; i < pokemons[j].stats.length; i++) {
        document.getElementById(`statsContainer${j}`).innerHTML += ` <div class="infoStats"><span class="statName">${pokemons[j].stats[i].stat.name}</span>
        <span class="statAmount">${pokemons[j].stats[i].base_stat}</span>  <div class="progress" role="progressbar" aria-label="Example 20px high" 
        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 5px">
        <div class="progress-bar ${pokemons[j].types[0].type.name}" style="width: ${getCorrectBar(i,j)}%"></div>
      </div></div>`;
    }
}

function renderAbilities(j){
    document.getElementById(`statsContainer${j}`).innerHTML += `<div class="abilities line"><span>Abilities</span></div>`;
    for ( let i=0; i< pokemons[j].abilities.length; i++){
        document.getElementById(`statsContainer${j}`).innerHTML += `<span class="ability ${pokemons[j].types[0].type.name}">  ${pokemons[j].abilities[i].ability.name}</span>`;
    }
}


function show(param1, param2){
    document.getElementById(`${param1}`).classList.remove('d-none');
    document.getElementById(`${param2}`).classList.add('d-none');
}


function getMax(j){
let numbers = [];
for (let i=0; i< pokemons[j].stats.length; i++){
numbers.push(pokemons[j].stats[i].base_stat);
numbers.sort(function(a,b){return a-b});
}
return numbers;
}


function getCorrectBar(i, j){
    let numbers = getMax(j);
      return (100 / numbers[5] * pokemons[j].stats[i].base_stat);
}


function renderMoves(j){
    for (let i=0; i< pokemons[j].moves.length; i++){
        document.getElementById(`movesContainer${j}`).innerHTML += `<span>${pokemons[j].moves[i].move.name} </span>`;
       
    }
}

function renderBaseExperience(j){
    document.getElementById(`statsContainer${j}`).innerHTML += `<div class="abilities line"><span>Base Experience</span></div><span class="ability ${pokemons[j].types[0].type.name} ">${pokemons[j].base_experience}</span>`;
   
       
    }
    // async function getAllPokemons(){
    //     setTimeout(2);
    //     let baseUrl = ' https://pokeapi.co/api/v2/pokemon/?limit=1400';
    //     let response = await fetch(baseUrl);
    //     allPokemons = await response.json();
    //    for(let i = 0; i < allPokemons.results.length; i++){
    //     allPokes.push(allPokemons.results[i]);
    //    }
    // }

    // function search(){
    //     let search = document.getElementById('search').value;
    //     search = search.toLowerCase();
    //     for (let i = 0; i < allPokes.length; i++) {
    //         let beginsWith = allPokes.name.filter((oneName) => oneName.startsWith(`${search}`));
            
    //     }
    //     console.log(beginsWith);
    // }
        
    async function getAllPokemons(){
        setTimeout(2);
        let baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1400';
        let response = await fetch(baseUrl);
        allPokemons = await response.json();
        for (let i = 0; i< allPokemons.results.length; i++){
            allNames.push(allPokemons.results[i].name + '_'+[i]);
        
        }
        console.log(allPokemons);
               

    }

    function search(){
        let search = document.getElementById('search').value;
   search = search.toLowerCase();
   console.log(search);
        beginsWith = allNames.filter((oneName) => oneName.startsWith(`${search}`));
        console.log(beginsWith);

        getIds();
      

       
       
         
        }
       

       async  function getPokemonsFromSearch(ids){
        let urls = [];
        for (let i= 0; i<ids.length; i++){
            if(ids[i] <1010){
            urls = `https://pokeapi.co/api/v2/pokemon/${ids[i]}/`;
                        }
            else {
                let newCount = + (ids[i]+8991);
                urls = `https://pokeapi.co/api/v2/pokemon/${newCount}/`;

            }
            console.log(urls);
            let response = await fetch(urls);
            let searchedPokemon = await response.json();
            searchedPokemons.push(searchedPokemon);
            pokemons[ids[i]] = searchedPokemon;
           
        }
        console.log('searched Pokes: ', searchedPokemons);
        console.log(urls);
        setTimeout(renderSearch,3);

        }
        function getIds(){
            for (let i = 0; i < beginsWith.length; i++) {
                let element = beginsWith[i];
                console.log(element);
                ids.push(getSecondPart(`${element}`));
               
            } 
            console.log('Ids', ids);
            getPokemonsFromSearch(ids);

        }
    function getSecondPart(string){
         id = string.split('_')[1];
        id = parseInt(id);
        return id+1;
        
    }

    function renderSearch() {
        document.getElementById(`main`).innerHTML = ``;
        for (let i=0; i< ids.length; i++) {
            let j = ids[i];
            console.log('Achtung: ', pokemons[j].types[0].type.name);
            document.getElementById(`main`).innerHTML += pokemonMainTemplate(j);
    
            renderTypes(j);
            renderStats(j);
            getMax(j);
            renderMoves(j);
            renderAbilities(j);
            renderBaseExperience(j)
        }
    }