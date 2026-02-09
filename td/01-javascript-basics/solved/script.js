async function getHttp(url) {
    const response = await fetch(url);
    return await response.json();
}

async function loadGame(event) {
    const gameDetail = document.getElementById('game-detail');
    gameDetail.classList.remove('hidden');
    gameDetail.classList.add('loading');

    const gameId = event.target.id.split('-')[1];
    const game = await getHttp('https://pokeapi.co/api/v2/version-group/' + gameId);
    
    document.getElementById('game-name').innerText = game.name;
    document.getElementById('game-generation').innerText = game.generation.name;

    const regions = document.getElementById('game-regions');
    regions.innerHTML = '';
    game.regions.forEach(region => {
        const listItem = document.createElement('li');
        listItem.textContent = region.name;
        regions.appendChild(listItem);
    });

    const pokedexes = document.getElementById('game-pokedexes');
    pokedexes.innerHTML = '';
    game.pokedexes.forEach(pokedex => {
        const listItem = document.createElement('li');
        listItem.textContent = pokedex.name;
        pokedexes.appendChild(listItem);
    });

    gameDetail.classList.remove('loading');
}

async function loadGames() {
    const data = await getHttp('https://pokeapi.co/api/v2/version-group');
    const games = data.results;

    const gamesList = document.getElementById('games-list');
    games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = game.name;
        const gameId = game.url
            .slice(0, game.url.length - 1)
            .split('/')
            .pop();
        listItem.id = `game-${gameId}`;
        listItem.addEventListener('click', loadGame);
        gamesList.appendChild(listItem);
    });
}
document.addEventListener('DOMContentLoaded', loadGames);
