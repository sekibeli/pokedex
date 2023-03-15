function pokemonMainTemplate(j, pokemons){
    return `
    <div class="card">
        <div class="pokedexCard ${pokemons[j].types[0].type.name}" id="pokedex${j}">
             <div class="name">
                    <h2 id="pokemonName${j}">${pokemons[j].name}</h2>
                     <div class="types" id="types${j}"></div>
            </div>
            <span class="id" id="id${j}">#${pokemons[j].id}</span>
            <img class="pokeImg" src=${checkPic(j, pokemons)}>
            <img class="poke_icon" src="./img/pokemon_bg_wht.png">
        </div>  
        <div id="heiWei">
            <span>${(pokemons[j].height)/10} m</span><br>
            <span>${(pokemons[j].weight)/10} kg</span>
            </div>
        <div class="info-container">
             <nav class="line">
                 <ul class="menu">
                     <li class="menuActive" id="stats${j}" onclick="show('statsContainer${j}', 'movesContainer${j}'), change(${j})">Base Stats</li>
                     <li id="moves${j}" onclick="show('movesContainer${j}', 'statsContainer${j}'), change(${j})">Moves</li>
             </nav>
        <div id="statsContainer${j}" class="statsContainer"></div>
        <div id="movesContainer${j}" class="movesContainer d-none"></div>
      </div>
    </div>`;
    }

    function renderStatsTemplate(i, j, pokemons){
        return ` 
        <div class="infoStats">
            <span class="statName">${pokemons[j].stats[i].stat.name}</span>
            <span class="statAmount">${pokemons[j].stats[i].base_stat}</span>  
            
                <div class="progress" role="progressbar" aria-label="Example 20px high" 
                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 5px">
                    <div class="progress-bar ${pokemons[j].types[0].type.name}" style="width: ${getCorrectBar(i, j, pokemons)}%"></div>
                </div>
        </div>`;
        }

        function renderBaseExperienceTemplate(j, pokemons) {
            return  `<div class="abilities line"><span>Base Experience</span></div><span class="ability ${pokemons[j].types[0].type.name} ">${pokemons[j].base_experience}</span>`;
          }