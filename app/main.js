import { ApiPokemonsController } from "./Controllers/ApiPokemonsController.js";
import { MyPokemonsController } from "./Controllers/MyPokemonsController.js";


class App {

  myPokemonsController = new MyPokemonsController();
  apiPokemonsController = new ApiPokemonsController();

}

window["app"] = new App();
