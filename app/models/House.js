import { generateId } from "../utils/GenerateId.js"

export class House {
  /**
   * @param {{ housepic: string; adress: string; bedrooms: number; bathrooms: number; ftsquared: number; hoa: boolean; inlivablecondition: boolean; price: number; timelisted: string | number | Date; description: string;}} data
   */
  constructor(data) {
    this.id = generateId()
    this.housepic = data.housepic
    this.adress = data.adress
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.ftsquared = data.ftsquared
    this.hoa = data.hoa
    this.inlivablecondition = data.inlivablecondition
    this.price = data.price
    this.description = data.description
    this.timelisted = data.timelisted ? new Date(data.timelisted).toLocaleString() : new Date().toLocaleString()
  }

  get houseCard() {
    return `
    <div class="col-10 shadow d-flex mt-2">
        <img class="img"
          src="${this.housepic}"
          alt="adress">
        <div class="p-2 bebigger">
          <h3>${this.adress}</h3>
          <p>${this.timelisted}</p>
          <h5>ft^2</h5>
          <h6><i class="mdi mdi-bed-empty"></i>: ${this.bedrooms} <i class="mdi mdi-shower"></i>: ${this.bathrooms}</h6>
          <p>${this.hoa ? '<i class="mdi mdi-check-bold"></i>has hoa' : '<i class="mdi mdi-close-thick"></i>no hoa'}</p>
          <p>${this.inlivablecondition ? '<i class="mdi mdi-check-bold"></i>can move right in' : '<i class="mdi mdi-close-thick"></i>needs fixing'}</p>
        </div>
        <div class="p-2">
          <p>Description:</p>
          <p>${this.description}</p>
          <div class="p-2">
            <h4>Price: $${this.price}</h4>
          </div>
        </div>
      </div>`
  }
}