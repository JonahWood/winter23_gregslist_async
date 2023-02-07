import { appState } from "../AppState.js";
import { House } from "../Models/house.js";
import { houseService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHouses() {
    let template = ''
    appState.houses.forEach(h => template += h.HouseCard)
    setHTML('listings', template)
    setHTML('modal-content', House.HouseForm({}))
    setHTML('form-button', House.FormButton())
}

export class HousesController {
    constructor () {
    this.getHouses()
    appState.on('houses', _drawHouses)
    }
    async getHouses() {
    try {
        await houseService.getHouses()
    } catch (error) {
        Pop.error(error.message) 
        console.error(error)
    }
    }
    async createHouse() {
    try {
        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        console.log(formData);
        await houseService.createHouse(formData)
    } catch (error) {
        console.error(error)
        Pop.error(error.message)
    }
    }
    async removeHouse(houseId) {
    try {
        if (await Pop.confirm()) {
        await houseService.removeHouse(houseId)
        }
    } catch (error) {
        console.error(error)
        Pop.error(error.message)
    }
    }

    drawForm(houseId) {
        try {
            if (houseId) {
            let house = appState.houses.find(house => house.id == houseId)
            setHTML('modal-content', House.HouseForm(house))
            }
            else {
            setHTML('modal-content', House.HouseForm({}))
            }
        } catch (error) {
            console.error(error)
            Pop.error(error.message)
        }
        }
    
        async editHouse(houseId) {
            try {
                window.event.preventDefault()
                const form = window.event.target
                const formData = getFormData(form)
                console.log(formData);
                await houseService.editHouse(formData, houseId)
            } catch (error) {
                console.error(error)
                Pop.error(error.message)
            }}
}