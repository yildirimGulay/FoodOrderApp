import { ShoppingAction } from "../actions"
import { FoodAvailability, ShoppingState, FoodModel, OfferModel } from "../models"



const initialState = {
    availability: {} as FoodAvailability,
    availableFoods: {} as [FoodModel],
    offers: {} as [OfferModel]
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {


    switch (action.type) {
        case "ON_AVAILABILITY":
            return {
                ...state,
                availability: action.payload

            }

        case 'ON_FOODS_SEARCH':
            return {
                ...state,
                availableFoods:action.payload
            }

            case "ON_OFFER_SEARCH":
                return {
                    ...state,
                    offers: action.payload
                }
        
            
    
        default:
            return state;
    }

}


export {ShoppingReducer}