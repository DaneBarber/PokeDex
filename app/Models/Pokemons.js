export class Pokemons {
  constructor(data) {
    this.name = data.name
    this.url = data.url
  }

  get Template() {
    return /*html*/ `
        <li>
          <a href="" ${this.name}>
        </li>
      `
  }

}