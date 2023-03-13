let pokemons = [];
let allPokemons = [];
let allNames = [];
let beginsWith = [];
let allPokes = [];
let ids = [];
let searchedPokemons = [];
let urls = [];
let count = 1;

async function load30Pokemon() {
    loading(`loading ...`);
    for (i = count; i < count + 30; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
    }
   
    renderPokemonInfo();
    count += 30;
}


function displayLoad() {
    document.getElementById('waitingDots').classList.add('d-none');
    document.getElementById('main').classList.remove('d-none');
}


function renderPokemonInfo() {
    for (j = count - 1; j < pokemons.length; j++) {
       renderMain(j);
    }
    displayLoad();
    document.getElementById('more').classList.remove('d-none');
    loading(`Load more Pokemon`);
}


function checkPic(j) {
    if (pokemons[j].sprites.other.dream_world.front_default) {
        return pokemons[j].sprites.other.dream_world.front_default;
    }
    else if (pokemons[j].sprites.other.home.front_default) {
        return pokemons[j].sprites.other.home.front_default;
    }
    else {
        return "./img/picNotFound.png";
    }
}


function renderTypes(j) {
    for (let i = 0; i < pokemons[j].types.length; i++) {
        document.getElementById(`types${j}`).innerHTML += `<span> ${pokemons[j].types[i].type.name}</span> `;
    }
}


function renderStats(j) {
    for (let i = 0; i < pokemons[j].stats.length; i++) {
        document.getElementById(`statsContainer${j}`).innerHTML += renderStatsTemplate(i, j);
    }
}


function renderAbilities(j) {
    document.getElementById(`statsContainer${j}`).innerHTML += `<div class="abilities line"><span>Abilities</span></div>`;
    for (let i = 0; i < pokemons[j].abilities.length; i++) {
        document.getElementById(`statsContainer${j}`).innerHTML += `<span class="ability ${pokemons[j].types[0].type.name}">  ${pokemons[j].abilities[i].ability.name}</span>`;
    }
}


function show(param1, param2) {
    document.getElementById(`${param1}`).classList.remove('d-none');
    document.getElementById(`${param2}`).classList.add('d-none');
}


function getMax(j) {
    let numbers = [];
    for (let i = 0; i < pokemons[j].stats.length; i++) {
        numbers.push(pokemons[j].stats[i].base_stat);
        numbers.sort(function (a, b) { return a - b });
    }
    return numbers;
}


function getCorrectBar(i, j) {
    let numbers = getMax(j);
    return (100 / numbers[5] * pokemons[j].stats[i].base_stat);
}


function renderMoves(j) {
    for (let i = 0; i < pokemons[j].moves.length; i++) {
        document.getElementById(`movesContainer${j}`).innerHTML += `<span>${pokemons[j].moves[i].move.name} </span>`;

    }
}


function renderBaseExperience(j) {
    document.getElementById(`statsContainer${j}`).innerHTML += renderBaseExperienceTemplate(j);
}


async function getAllPokemons() {
    let baseUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1280';
    let response = await fetch(baseUrl);
    allPokemons = await response.json();
    for (let i = 0; i < allPokemons.results.length; i++) {
        allNames.push(allPokemons.results[i].name + '_' + [i]);
    }
}


function search() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    beginsWith = allNames.filter((oneName) => oneName.startsWith(`${search}`));
    getIds();
    searchButton.disabled = true;
}


async function getPokemonsFromSearch(ids) {
        for (let i = 0; i < ids.length; i++) {
        if (ids[i] < 1010)  urls = `https://pokeapi.co/api/v2/pokemon/${ids[i]}/`;
        else newCountUrl(ids, i);
        let response = await fetch(urls);
        let searchedPokemon = await response.json();
        searchedPokemons.push(searchedPokemon);
        pokemons[ids[i]] = searchedPokemon;
    }
    renderSearch();
}


function newCountUrl(ids, i) {
    let newCount = + (ids[i] + 8990);
    urls = `https://pokeapi.co/api/v2/pokemon/${newCount}/`;
}


function getIds() {
    for (let i = 0; i < beginsWith.length; i++) {
        let element = beginsWith[i];
        ids.push(getSecondPart(`${element}`));
    }
    getPokemonsFromSearch(ids);
}


function getSecondPart(string) {
    id = string.split('_')[1];
    id = parseInt(id);
    return id + 1;
}


function renderSearch() {
    document.getElementById(`main`).innerHTML = ``;
    if (ids.length == 0) document.getElementById('main').innerHTML = `No matches found`;
    for (let i = 0; i < ids.length; i++) {
        let j = ids[i];
      renderMain(j);
    }
    document.getElementById('more').classList.add('d-none');
}


function reset() {
    location.reload();
}


function change(j) {
    document.getElementById(`stats${j}`).classList.toggle('menuActive');
    document.getElementById(`moves${j}`).classList.toggle('menuActive');
}


function loading(text) {
    document.getElementById('more').innerHTML = text;
}


function renderFirstPart(j) {
    renderTypes(j);
    renderStats(j);
    getMax(j);
}


function renderSecondPart(j) {
    renderMoves(j);
    renderAbilities(j);
    renderBaseExperience(j);
}


function renderMain(j){
    document.getElementById(`main`).innerHTML += pokemonMainTemplate(j);
    renderFirstPart(j);
    renderSecondPart(j);
}