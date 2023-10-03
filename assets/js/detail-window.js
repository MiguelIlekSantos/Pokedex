x
const pokeCards = document.querySelector('#poke-list');

const detailsWindow = document.getElementById('details-window')
const windowPokeName = document.getElementById('window-poke-name')
const windowClassPoke = document.getElementById('window-class-poke')
const windowNumberPoke = document.getElementById('window-number-poke')
const windowSpanPoke = document.getElementById('window-span-poke')
const windowPokeImg = document.getElementById('window-poke-img')
const windowSpeciesPoke = document.getElementById('window-species-poke')
const windowHeightPoke = document.getElementById('window-height-poke')
const windowWeightPoke = document.getElementById('window-weight-poke')
const windowAbilitiesPoke = document.getElementById('window-abilities-poke')
const windowHpPoke = document.getElementById('window-hp-poke')
const windowAttackPoke = document.getElementById('window-attack-poke')
const windowDefensePoke = document.getElementById('window-defense-poke')
const windowSpAtkPoke = document.getElementById('window-spAtk-poke')
const windowSpDefPoke = document.getElementById('window-spDef-poke')
const windowSpeedPoke = document.getElementById('window-speed-poke')
const windowTotalPoke = document.getElementById('window-total-poke')
const meterOne = document.getElementById('meter-one')
const meterTwo = document.getElementById('meter-two')
const meterThree = document.getElementById('meter-three')
const meterFour = document.getElementById('meter-four')
const meterFive = document.getElementById('meter-five')
const meterSeven = document.getElementById('meter-six')
const meterSix = document.getElementById('meter-seven')


function createWindow(pokemon){

    detailsWindow.style.display = "flex";
    detailsWindow.classList = (`details-window back-color-${pokemon.type}`);
    windowPokeName.innerHTML = pokemon.name
    windowClassPoke.innerHTML = pokemon.types.map((type) => `<p class="p-${type}">${type}</p>`).join(''); 
    windowNumberPoke.classList.add(`underline-${pokemon.type}`);
    windowNumberPoke.innerHTML = "#"+ addZeros(pokemon.number);
    windowSpanPoke.classList.add(`span-${pokemon.type}`);
    windowPokeImg.src = pokemon.photo;
    windowPokeImg.alt = pokemon.name;
    windowSpeciesPoke.innerHTML = pokemon.species;
    windowHeightPoke.innerHTML = pokemon.height;
    windowWeightPoke.innerHTML = pokemon.weight;
    windowAbilitiesPoke.innerHTML = pokemon.abilities;
    windowAbilitiesPoke.classList.add(`p-${pokemon.type}`);
    windowHpPoke.innerHTML = pokemon.healthy
    windowAttackPoke.innerHTML = pokemon.attack
    windowDefensePoke.innerHTML = pokemon.defense
    windowSpAtkPoke.innerHTML = pokemon.spAtk
    windowSpDefPoke.innerHTML = pokemon.spDef
    windowSpeedPoke.innerHTML = pokemon.speed
    windowTotalPoke.innerHTML = pokemon.total
    meterOne.value = pokemon.healthy
    meterTwo.value = pokemon.attack
    meterThree.value = pokemon.defense 
    meterFour.value = pokemon.spAtk
    meterFive.value = pokemon.spDef
    meterSeven.value = pokemon.speed 
    meterSix.value = pokemon.total 
            


}

class PokemonDetail {
    name;
    number;
    type;
    types = [];
    photo;
    species;
    height;
    weight;
    abilities;
    healthy;
    attack;
    defense;
    spAtk;
    spDef;
    speed;
    total;
}

function convertAPIToMine(pokeDetail){
    const pokemon = new PokemonDetail

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.species = pokeDetail.species.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name).join(' <br> ');
    pokemon.abilities = abilities

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)

    pokemon.healthy = stats[0]
    pokemon.attack = stats[1]
    pokemon.defense = stats[2]
    pokemon.spAtk = stats[3]
    pokemon.spDef = stats[4]
    pokemon.speed = stats[5]

    pokemon.total = stats[0] + stats[1] + stats[2] + stats[3] + stats[4] + stats[5]
    
    return pokemon
}


pokeCards.addEventListener('click', (event) => {
    if(event.target.tagName === 'A'){        
        id = event.target.id;
        const newUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`

        fetch(newUrl)
            .then((response) => response.json())
            .then((pokeInfo) => convertAPIToMine(pokeInfo))  
            .then((finalInfo) => createWindow(finalInfo))  
    }
});




