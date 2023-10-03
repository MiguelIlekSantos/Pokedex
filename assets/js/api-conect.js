
class Pokemon {
    name;
    number;
    type;
    types = [];
    photo;

}

function convertAPIToMine(pokeDetail){
    const pokemon = new Pokemon

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types
    pokemon.type = type


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

var offset = 0;
var limit = 10;
var pokeList = document.getElementById('poke-list');


function addZeros(number) {
    if (number < 10) {
        return '00' + number
    } else if (number < 100) {
        return '0' + number
    } else {
        return number
    }
}

function printfPokeHTML(pokeDetails) {
    
    return `
        <li class="poke-card">
            <div class="border border-${pokeDetails.type}"></div>
            <div class="content">
                <div class="sub-card-one">
                    <h1>${pokeDetails.name}</h1>
                    <br>
                    ${pokeDetails.types.map((type) => `<p class="p-${type}">${type}</p>`).join('')}
                    <a id="${pokeDetails.number}" class="p-${pokeDetails.type} link-window" href="#">Saiba Mais <span class="span-${pokeDetails.type}">+</span></a>
                </div>
                <div class="sub-card-two">
                    <p class="underline-${pokeDetails.type}"><span class="span-${pokeDetails.type}">#</span>${addZeros(pokeDetails.number)}</p>
                    <figure>
                        <img class="filter-${pokeDetails.type}" src="${pokeDetails.photo}" alt="${pokeDetails.name}">
                    </figure>
                </div>
            </div>
        </li>
        
        `    
   
}

const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((jsonBody) => convertAPIToMine(jsonBody))
}

function requestInfo(offset, limit) {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((pokeDetail) => Promise.all(pokeDetail))
        .then((pokeFinal) => {
            const list = pokeFinal.map(printfPokeHTML);
            const FinalList = list.join('')
            pokeList.innerHTML += FinalList;
        })

}

requestInfo(offset, limit);



const btnMore = document.getElementById('btn-more');
btnMore.addEventListener('click', () => {
    offset += limit;
    requestInfo(offset, limit);
})









