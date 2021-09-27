import { FETCH_POKEMONS, FETCH_POKEMON } from './actionType';

const initialState = {
  pokemons: [],
  pokemon: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case FETCH_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };

    default:
      return state;
  }
}
