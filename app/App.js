import { HousesController } from "./Controllers/HousesController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  housesController = new HousesController()
}

window["app"] = new App();
