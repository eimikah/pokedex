const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    return await APIResponse.json();
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = "Carregando...";
  pokemonNumber.textContent = "";
  pokemonImage.style.opacity = 0;

  const data = await fetchPokemon(pokemon);
  if (data) {
    const animated = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const defaultImg = data.sprites.front_default;
    pokemonImage.src = animated ?? defaultImg;
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `#${data.id}`;
    searchPokemon = data.id;
    input.value = "";
    pokemonImage.onload = () => (pokemonImage.style.opacity = 1);
  } else {
    pokemonName.textContent = "Não encontrado";
    pokemonNumber.textContent = "";
    pokemonImage.style.opacity = 0;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    searchPokemon++;
    renderPokemon(searchPokemon);
  }
  if (e.key === "ArrowLeft" && searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
