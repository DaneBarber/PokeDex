export class Pokemon {
  constructor(data) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.nickName = data.nickName || ''
    this.img = data.img || data.sprites.front_default
    this.weight = data.weight
    this.height = data.height
    this.prepared = data.prepared || false
  }

  get Template() {
    return /*html*/ `
    <div class="bg-light shadow rounded p-3">
      <h1>${this.name}</h1>
      <p>${this.nickName}</p>
      <div class="d-flex justify-content-between">
        <h6>height: ${this.height}</h6>
        <h6>weight: ${this.weight}</h6>
      </div>
        ${this.Buttons}
      </div>
      `
  }

  get Buttons() {
    if (this.id) {
      return /*html*/ `
      <div class="d-flex align-items-center justify-content-between p-2">
        <button class="btn btn-primary" onclick="app.myPokemonsController.removePokemon('${this.id}')">Remove Pokemon</button>
        <div>
          <input class="form-check-input" type="checkbox" value="" id="myPokemon" ${this.prepared ? 'checked' : ''}  onclick="app.myPokemonsController.preparePokemon()">
          <label class="form-check-label" for="myPokemon">Ready</label>
        </div>
      </div>

      `
    }
    return /*html*/ `<button class="btn btn-success" onclick="app.myPokemonsController.addPokemon()">Add Pokemon</button>`

  }

}