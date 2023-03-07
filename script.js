let currentPokemon;

async function loadPokemon(){
    let url = `https://pokeapi.co/api/v2/pokemon/pikachu`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Server antortet: ' , currentPokemon);
   renderPokemonInfo();
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemon.name;
    document.getElementById('pic').src = `${currentPokemon.sprites.other.dream_world.front_default}`;
}