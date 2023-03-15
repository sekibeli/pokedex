let allPokemons = [];
let allNames = [];
let allPokes = [];
let urls = [];
let count = 0;
let pokemons = [];

async function load30Pokemon() {
    for (i = count; i < count + 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemons.push(pokemon);
        renderAll(i, pokemons);
    }
    count = i;
  }


function renderAll(j, pokemons) {
    document.getElementById(`main`).innerHTML += pokemonMainTemplate(j, pokemons);
    getMax(j, pokemons);
    renderTypes(j, pokemons);
    renderStats(j, pokemons);
    renderMoves(j, pokemons);
    renderAbilities(j, pokemons);
    renderBaseExperience(j, pokemons);
}


function getMax(j, pokemons) {
    let numbers = [];
    for (let i = 0; i < pokemons[j].stats.length; i++) {
        numbers.push(pokemons[j].stats[i].base_stat);
        numbers.sort(function (a, b) { return a - b });
    }
    return numbers;
}


function checkPic(j, pokemons) {
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


function renderTypes(j, pokemons) {
    for (let i = 0; i < pokemons[j].types.length; i++) {
        document.getElementById(`types${j}`).innerHTML += `<span> ${pokemons[j].types[i].type.name}</span> `;
    }
}


function renderStats(j, pokemons) {
    for (let i = 0; i < pokemons[j].stats.length; i++) {
        document.getElementById(`statsContainer${j}`).innerHTML += renderStatsTemplate(i, j, pokemons);
    }
}


function renderAbilities(j, pokemons) {
    document.getElementById(`statsContainer${j}`).innerHTML += `<div class="abilities line"><span>Abilities</span></div>`;
    for (let i = 0; i < pokemons[j].abilities.length; i++) {
        document.getElementById(`statsContainer${j}`).innerHTML += `<span class="ability ${pokemons[j].types[0].type.name}">  ${pokemons[j].abilities[i].ability.name}</span>`;
    }
}


function show(param1, param2) {
    document.getElementById(`${param1}`).classList.remove('d-none');
    document.getElementById(`${param2}`).classList.add('d-none');
}


function getCorrectBar(i, j, pokemons) {
    let numbers = getMax(j, pokemons);
    return (100 / numbers[5] * pokemons[j].stats[i].base_stat);
}


function renderMoves(j, pokemons) {
    for (let i = 0; i < pokemons[j].moves.length; i++) {
        document.getElementById(`movesContainer${j}`).innerHTML += `<span>${pokemons[j].moves[i].move.name} </span>`;

    }
}


function renderBaseExperience(j, pokemons) {
    document.getElementById(`statsContainer${j}`).innerHTML += renderBaseExperienceTemplate(j, pokemons);
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
    let beginsWith = [];
    clearMain();
    let search = document.getElementById('search').value;
    if (search.length > 0) {
        search = search.toLowerCase();
        beginsWith = allNames.filter((oneName) => oneName.startsWith(`${search}`));
        getIds(beginsWith);
    }
}


async function getPokemonsFromSearch(ids) {
    let searchedPokemons = [];
    for (let index = 0; index < ids.length; index++) {
        if (ids[index] < 1010) urls = `https://pokeapi.co/api/v2/pokemon/${ids[index]}/`;
        else newCountUrl(ids, index);
        let response = await fetch(urls);
        let searchedPokemon = await response.json();
        searchedPokemons.push(searchedPokemon);
        renderAll(index, searchedPokemons);
    }
    if (ids.length == 0) document.getElementById('main').innerHTML = `No matches found`;
    document.getElementById('more').classList.add('d-none');
}


function newCountUrl(ids, i) {
    let newCount = + (ids[i] + 8990);
    urls = `https://pokeapi.co/api/v2/pokemon/${newCount}/`;
}


function getIds(beginsWith) {
    let ids = [];
    clearMain();
    for (let i = 0; i < beginsWith.length; i++) {
        let element = beginsWith[i];
        ids.push(getSecondPartOfString(`${element}`));
    }
    getPokemonsFromSearch(ids);
}


function getSecondPartOfString(string) {
    id = string.split('_')[1];
    id = parseInt(id);
    return id + 1;
}


function change(j) {
    document.getElementById(`stats${j}`).classList.toggle('menuActive');
    document.getElementById(`moves${j}`).classList.toggle('menuActive');
}


function clearMain() {
    document.getElementById(`main`).innerHTML = ``;
}


function wrap() {
    for (let i = 0; i < pokemons.length; i++) {
        renderAll(i, pokemons);
    }
}


function reset() {
    clearMain();
    document.getElementById('search').value = '';
    document.getElementById('more').classList.remove('d-none');
    wrap();
}