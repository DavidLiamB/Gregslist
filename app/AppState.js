import { Car } from "./models/Car.js"
import { House } from "./models/House.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/IsValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])


  /** @type {Car[]} */
  cars = [
    new Car({
      year: 2004,
      make: 'Mazda',
      model: 'Miata',
      mileage: 60000,
      runs: false,
      imgUrl: 'https://images.unsplash.com/photo-1561043845-2f5e09749871?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWlhdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      isNew: false,
      price: 12000,
      color: '#080f14',
      description: 'This one is just for Jeremy, no one else contact me'
    }),
    new Car({
      year: 1998,
      make: 'Suzuki',
      model: 'Escudo',
      mileage: 80,
      runs: true,
      imgUrl: 'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2021/06/Suzuki-Escudo-Pikes-Peak-Motor-1.jpg',
      isNew: true,
      price: 400000,
      color: '#940109',
      description: 'The fastest car in Gran Turismo 2 on Playstation'
    }),
  ]

  Houses = [
    new House({
      housepic: 'https://images.unsplash.com/photo-1598977946456-ae589f348af6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFiYW5kb25lZCUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      adress: 'Adress',
      bedrooms: 0,
      bathrooms: 0,
      ftsquared: 0,
      hasHoa: true,
      inlivablecondition: false,
      price: 0,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nobis repellat deleniti dolore sint. Incidunt exercitationem et ipsum dolores saepe nisi nesciunt, rerum voluptate animi consequuntur voluptatibus odit officia recusandae excepturi consequatur adipisci ducimus architecto laudantium eius possimus aut.'
    }),
  ]

  // NOTE Used to load initial data
  init() {
    this.cars = loadState('cars', [Car])
    this.Houses = loadState('Houses', [House])
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
