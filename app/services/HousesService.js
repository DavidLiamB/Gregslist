import { AppState } from "../AppState.js"
import { saveState } from "../utils/Store.js"


function _saveHouses() {
  saveState('Houses', AppState.Houses)
}
class HousesService {
  constructor() {
    AppState.on('Houses', _saveHouses)
  }
  createHouse(newHouse) {
    AppState.Houses.push(newHouse)
    AppState.emit('Houses')
  }
}

export const housesService = new HousesService()