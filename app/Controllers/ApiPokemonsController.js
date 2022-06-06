import { ProxyState } from "../AppState.js";
import { apiPokemonsService } from "../Services/ApiPokemonsService.js";
import { Pop } from "../Utils/Pop.js"

function _drawPokemons() {
  let template = ''
  ProxyState.pokemons.forEach(p => template += /*html*/ `<li onclick="app.apiPokemonsController.setActivePokemon('${p.name}')" class="selectable">${p.name}</li>`)
  document.getElementById('api-pokemons').innerHTML = template
}

function _drawActivePokemon() {
  if (!ProxyState.activePokemon) {
    document.getElementById('active-pokemon').innerHTML = ''
  } else {
    document.getElementById('active-pokemon').innerHTML = ProxyState.activePokemon.Template
  }
}

export class ApiPokemonsController {
  constructor() {
    this.getApiPokemons()
    ProxyState.on('pokemons', _drawPokemons)
    ProxyState.on('active-pokemon', _drawActivePokemon)
    ProxyState.on('myPokemons', _drawActivePokemon)
  }

  async getApiPokemons() {
    try {
      await apiPokemonsService.getApiPokemons()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async setActivePokemon(pokemonIndex) {
    try {
      await apiPokemonsService.setActivePokemon(pokemonIndex)
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }
}