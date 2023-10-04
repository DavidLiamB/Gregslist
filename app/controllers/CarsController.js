import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars
  let content = ''
  cars.forEach(car => content += car.CarCard)
  setHTML('cars', content)
}

export class CarsController {
  constructor() {
    console.log('Cars Controller is loaded', AppState.cars);
    _drawCars()

    AppState.on('cars', _drawCars)
  }

  createCar(event) {
    try {
      event.preventDefault()

      const form = event.target

      // if (money < 100) {
      //   throw new Error("Not enough money")
      // }

      // const carData = {
      //   make: form.make.value,
      //   model: form.model.value
      // }

      const carData = getFormData(form)

      carData.isNew = carData.isNew == 'on'

      carData.runs = carData.runs == 'on'

      // if (carData.isNew == 'on') {
      //   carData.isNew = true
      // }

      console.log('Creating car!', carData);

      carsService.createCar(carData)

      form.reset()

    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async removeCar(carId) {
    // const wantsToDelete = window.confirm("Are you sure you want to delete this car?")
    const wantsToDelete = await Pop.confirm("Are you sure you want to delete this car?")

    if (!wantsToDelete) {
      return
    }

    console.log('They want to delete!');
    carsService.removeCar(carId)
  }
}