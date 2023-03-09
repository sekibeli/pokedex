let pokemons = [];

let pokemonsOnScreen;
let count = 1;

async function load30Pokemon(){
    
    for (i = count; i < count + 30; i++){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemon = await response.json();
    pokemons.push(pokemon);
    
   
  
    }
    console.log('Server antwortet: ' , pokemons);
    renderPokemonInfo();
    count += 30;
    console.log(count);
   
}

function renderPokemonInfo(){
    for (j=count-1; j<pokemons.length; j++){

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
    </div>  <div class="info-container"></div></div>`;
      
    renderTypes(j);
    }
}

function renderTypes(j){
    for (let i = 0; i<pokemons[j].types.length; i++){
document.getElementById(`types${j}`).innerHTML += `<span> ${pokemons[j].types[i].type.name}</span> ` ;
    }
}

// window.addEventListener ('scroll',function () {
//    load30Pokemon();
//   });