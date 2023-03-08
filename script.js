let pokemons = [];

let pokemonsOnScreen;
let count = 1;

async function load30Pokemon(){
    
    for (i = count; i <= count + 30; i++){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemon = await response.json();
    pokemons.push(pokemon);
   
  
    }
    console.log('Server antwortet: ' , pokemons);
    renderPokemonInfo();
}

function renderPokemonInfo(){
    for (j=0; j<pokemons.length; j++)

    document.getElementById(`main`).innerHTML += `
    <div class="card"><div class="pokedexCard" id="pokedex${j}">
        <h2 id="pokemonName${j}">${pokemons[j].name}</h2>
        <img class="pokeImg" src=${pokemons[j].sprites.other.dream_world.front_default}>
    </div>  <div class="info-container"></div></div>`;
    
}