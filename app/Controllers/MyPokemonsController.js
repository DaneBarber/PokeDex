import { ProxyState } from "../AppState.js";
import { myPokemonsService } from "../Services/MyPokemonsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawMyPokemons() {
  let template = ''
  ProxyState.myPokemons.forEach(p => template += /*html*/ `<li class="selectable" onclick="app.myPokemonsController.setActivePokemon('${p.id}')">${p.name} ${p.prepared ? '<i class="mdi mdi-pokeball"></i>' : ''} </li>`)
  document.getElementById('my-pokemons').innerHTML = template
}

function _drawPrepared() {
  let total = ProxyState.myPokemons.length
  let preparedTotal = ProxyState.myPokemons.filter(p => p.prepared).length
  document.getElementById('total').innerText = total.toString()
  document.getElementById('prepared').innerText = preparedTotal.toString()
}


export class MyPokemonsController {
  constructor() {
    this.getMyPokemons()
    ProxyState.on('myPokemons', _drawMyPokemons)
    ProxyState.on('myPokemons', _drawPrepared)
  }

  async removePokemon(pokemonId) {
    try {
      const removedPokemon = await myPokemonsService.removePokemon(pokemonId)
      Pop.toast(`${removedPokemon.name} has been removed!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async preparePokemon() {
    try {
      let preparedPokemon = await myPokemonsService.preparePokemon()
      Pop.toast(`${preparedPokemon.name} was prepared for battle!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  setActivePokemon(pokemonId) {
    try {
      myPokemonsService.setActivePokemon(pokemonId)
      // @ts-ignore
      bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('my-pokemons-offcanvas')).toggle()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async getMyPokemons() {
    try {
      await myPokemonsService.getMyPokemons()
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }

  async addPokemon() {
    try {
      const newPokemon = await myPokemonsService.addPokemon()
      Pop.toast(`${newPokemon.name} was added!`, 'success')
    } catch (error) {
      Pop.toast(error.message, 'error')
      console.log(error);
    }
  }
}