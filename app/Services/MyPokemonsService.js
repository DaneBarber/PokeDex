import { ProxyState } from "../AppState.js"
import { Pokemon } from "../Models/Pokemon.js";
import { sandboxApi } from "./AxiosService.js"

class MyPokemonsService {
  async preparePokemon() {
    let pokemonToEdit = ProxyState.activePokemon
    pokemonToEdit.prepared = !pokemonToEdit.prepared
    const res = await sandboxApi.put('barber/pokemon/' + pokemonToEdit.id, pokemonToEdit)
    const editedPokemonIndex = ProxyState.myPokemons.findIndex(p => p.id == res.data.id)
    const newPokemon = new Pokemon(res.data)
    ProxyState.myPokemons.splice(editedPokemonIndex, 1, newPokemon)
    ProxyState.myPokemons = ProxyState.myPokemons
    return newPokemon
  }
  async removePokemon(pokemonId) {
    await sandboxApi.delete('barber/pokemon/' + pokemonId)
    ProxyState.activePokemon = null
    return ProxyState.myPokemons.find(p => p.id == pokemonId)
  }
  setActivePokemon(pokemonId) {
    const activePokemon = ProxyState.myPokemons.find(p => p.id == pokemonId)
    ProxyState.activePokemon = activePokemon
  }
  async getMyPokemons() {
    const res = await sandboxApi.get('barber/pokemon')
    console.log('my pokemon res', res.data);
    ProxyState.myPokemons = res.data.map(p => new Pokemon(p)).sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })

  }
  async addPokemon() {
    const foundPokemon = ProxyState.myPokemons.find(p => p.name == ProxyState.activePokemon.name)
    if (foundPokemon) {
      throw new Error("You already have that pokemon")
    }

    const res = await sandboxApi.post('barber/pokemon', ProxyState.activePokemon)

    ProxyState.myPokemons = [...ProxyState.myPokemons, new Pokemon(res.data)].sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })

    return res.data
  }

}

export const myPokemonsService = new MyPokemonsService()