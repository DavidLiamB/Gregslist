import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
  const houses = AppState.Houses
  let content = ''
  houses.forEach(house => content += house.houseCard)
  setHTML('houses', content)
}

export class HousesController {
  constructor() {
    console.log('HousesController;kj');
    _drawHouses()
    AppState.on('Houses', _drawHouses)
  }

  createHouse(event) {
    event.preventDefault()
    const form = event.target
    const houseData = getFormData(form)
    // @ts-ignore
    houseData.hasHoa = houseData.hasHoa == 'on'
    // @ts-ignore
    houseData.inlivablecondition = houseData.inlivablecondition == 'on'
    // @ts-ignore
    const newHouse = new House(houseData)
    // console.log(newHouse);
    housesService.createHouse(newHouse)
  }
}