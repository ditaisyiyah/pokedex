import { FETCH_POKEMONS, FETCH_POKEMON } from './actionType';

function getPokemons(pokemons) {
  return {
    type: FETCH_POKEMONS,
    payload: pokemons,
  };
}
function getPokemon(pokemon) {
  return {
    type: FETCH_POKEMON,
    payload: pokemon,
  };
}

export function getPokemonsCreator(pokedexAPI) {
  return async function (dispatch, getState) {
    try {
      const pokemons = [];
      for (let i = 0; i < 20; i++) {
        const response = await fetch(`${pokedexAPI}/${i + 1}/`);
        if (!response.ok) throw new Error('Something went wrong!');

        const { name, types, sprites } = await response.json();
        pokemons.push({
          name: name
            .split('')
            .map((el, i) => {
              return i == 0 ? el.toUpperCase() : el;
            })
            .join(''),
          types: types.map((el) => el.type.name),
          picture: sprites.other.dream_world.front_default,
        });
      }

      dispatch(getPokemons(pokemons));
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function getPokemonCreator(pokedexAPI, id) {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(`${pokedexAPI}/${id}/`);
      if (!response.ok) throw new Error('Something went wrong!');

      const { name, types, sprites, height, weight, abilities, stats, moves } =
        await response.json();
      const pokemon = {
        name: name
          .split('')
          .map((el, i) => {
            return i == 0 ? el.toUpperCase() : el;
          })
          .join(''),
        types: types.map((el) => el.type.name),
        picture: sprites.other.dream_world.front_default,
        about: {
          Height: height + ' m',
          Weight: weight + ' kg',
          Abilities: abilities
            .map((el) =>
              el.ability.name
                .split('')
                .map((el, j) => (j == 0 ? el.toUpperCase() : el))
                .join('')
            )
            .join(', '),
        },
        baseStats: stats.map((el) => {
          return {
            name: el.stat.name
              .split('')
              .map((el, j) => (j == 0 ? el.toUpperCase() : el))
              .join(''),
            value: el.base_stat,
          };
        }),
        moves: moves.map((el) =>
          el.move.name
            .split('')
            .map((el, j) => (j == 0 ? el.toUpperCase() : el))
            .join('')
        ),
      };

      dispatch(getPokemon(pokemon));
    } catch (error) {
      console.log(error.message);
    }
  };
}
