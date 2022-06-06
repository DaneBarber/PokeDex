import { ProxyState } from "../AppState.js"
import { Pokemon } from "../Models/Pokemon.js"
import { pokeApi } from "../Services/AxiosService.js"

class ApiPokemonsService {

  async setActivePokemon(pokemonIndex) {
    const res = await pokeApi.get('pokemon/' + (pokemonIndex))
    console.log('from setting Active Pokemon ' + res.data)
    debugger
    ProxyState.activePokemon = new Pokemon(res.data)
  }
  async getApiPokemons() {
    const res = await pokeApi.get('/pokemon?limit=100')
    // NOTE ALWAYS LOG THE RES AND LOOK AT THE DATA
    // console.log('api pokemons res', res.data);
    ProxyState.pokemons = res.data.results
  }
}

export const apiPokemonsService = new ApiPokemonsService()