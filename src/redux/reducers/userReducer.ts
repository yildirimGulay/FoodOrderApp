import {UserAction} from '../actions';
import {
  UserModel,
  UserState,
  FoodModel,
  OrderModel,
  OfferModel,
  PickedAddress,
} from '../models';

const initialState: UserState = {
  user: {} as UserModel,
  location: '' as string,
  postCode: '' as string,
  error: undefined,
  cart: {} as [FoodModel],
  orders: {} as [OrderModel],
  appliedOffer: {} as OfferModel,
  pickedAddress: {} as PickedAddress
};

const UserReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'ON_UPDATE_LOCATION':
      return {
        ...state,
        location: action.payload,
        postCode: action.postCode,
      };

    case 'ON_UPDATE_CART':
      if (!Array.isArray(state.cart)) {
        return {
          ...state,
          cart: [action.payload],
        };
      }

      const existingFoods = state.cart.filter(
        item => item._id === action.payload._id,
      );

      //Check for Existing Product to update unit
      if (existingFoods.length > 0) {
        let updatedCart = state.cart.map(food => {
          if (food._id == action.payload._id) {
            food.unit = action.payload.unit;
          }
          return food;
        });

        return {
          ...state,
          cart: updatedCart.filter(item => item.unit > 0),
        };
      } else {
        // Add to cart if not added
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case 'ON_USER_LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'ON_USER_LOGOUT':
      return {
        ...state,
        user: {} as UserModel,
      };

    //console.log('User Token'+ action.payload)

    case 'ON_CREATE_ORDER':
      if (!Array.isArray(state.orders)) {
        return {
          ...state,
          cart: [],
          orders: [action.payload],
        };
      } else {
        return {
          ...state,
          cart: [],
          orders: [...state.orders, action.payload],
        };
      }

    case 'ON_VIEW_ORDER':
    case 'ON_CANCEL_ORDER':
      return {
        ...state,
        orders: action.payload,
      };

    case 'ON_ADD_OFFER':
      return {
        ...state,
        appliedOffer: action.payload,
      };

    case 'ON_REMOVE_OFFER':
      return {
        ...state,
        appliedOffer: {},
      };

      case "ON_FETCH_LOCATION":
        return {
            ...state,
            pickedAddress: action.payload
        }


    default:
      return state;
  }
};

export {UserReducer};
