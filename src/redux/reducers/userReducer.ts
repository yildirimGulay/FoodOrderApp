import { UserAction } from "../actions"
import {  UserModel, UserState,FoodModel, OrderModel } from "../models"


const initialState: UserState = {
    user: {} as UserModel,
    location: "" as string,
    postCode: "" as string,
    error: undefined,
    cart: {} as [FoodModel],
    orders: {} as [OrderModel]

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {


    switch (action.type) {
        case "ON_UPDATE_LOCATION":
            return {
                ...state,
                location: action.payload,
                postCode: action.postCode
            } 

            case 'ON_UPDATE_CART':
            
                if(!Array.isArray(state.cart)){
                    return {
                        ...state,
                        cart: [action.payload]
                    }
                }

                const existingFoods = state.cart.filter(item => item._id === action.payload._id);

                //Check for Existing Product to update unit
                if (existingFoods.length > 0){
                    let updatedCart = state.cart.map((food) => {
                        if(food._id == action.payload._id){
                           food.unit = action.payload.unit;
                        }
                        return food
                    })
    
                    return {
                        ...state,
                        cart:  updatedCart.filter( item => item.unit > 0)
                    }
    
                }else{ // Add to cart if not added
                    return {
                        ...state,
                        cart: [...state.cart, action.payload]
                    }
                }


                case 'ON_USER_LOGIN':

                    return {
                        ...state,
                        user: action.payload
                    }

             //console.log('User Token'+ action.payload)

             case 'ON_CREATE_ORDER':

             if(!Array.isArray(state.orders)) {
                 return {
                     ...state,
                     cart: [],
                     orders: [action.payload]
                 }
             }else {
                 return {
                     ...state,
                     cart: [],
                     orders: [...state.orders,action.payload]
                 }
                }

                case 'ON_VIEW_ORDER':
                    return{
                        ...state,
                        orders:action.payload
                    }
                    case 'ON_DELETE_CARD':
                        return{
                            ...state,
                           cart:[]
                        }

            default:
            return state;
    }

}



export {UserReducer}