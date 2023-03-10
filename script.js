let pokemons = [];

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

}

function renderPokemonInfo() {
    for (j = count - 1; j < pokemons.length; j++) {

        document.getElementById(`main`).innerHTML += `
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
                     <li>About</li>
                    <li id="stats${j}" onclick="show('statsContainer${j}', 'movesContainer${j}')">Base Stats</li>
                     <li id="moves${j}" onclick="show('movesContainer${j}', 'statsContainer${j}')">Moves</li>
             </nav>
            
        <div id="about" class="info"></div>
        <div id="statsContainer${j}" class="statsContainer"></div>
        <div id="movesContainer${j}" class="movesContainer d-none"></div>
       
        </div>
        </div>`;

        renderTypes(j);
        renderStats(j);
        getMax(j);
        renderMoves(j);
    }
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
        console.log(pokemons[j].moves[i].move.name);
    }
}