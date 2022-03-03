import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FoodModel, UserModel, OrderModel} from '../models';

export interface UpdateLocationAction {
  readonly type: 'ON_UPDATE_LOCATION';
  payload: string;
  postCode: string;
}

export interface UpdateCartAction {
  readonly type: 'ON_UPDATE_CART';
  payload: FoodModel;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: any;
}

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: UserModel;
}

export interface CreateOrderAction {
  readonly type: 'ON_CREATE_ORDER';
  payload: OrderModel;
  
}
export interface DeleteCart {
  readonly type: 'ON_DELETE_CARD';
  
  
}


export interface ViewOrdersAction {
  readonly type: 'ON_VIEW_ORDER' | 'ON_CANCEL_ORDER';
  payload: [OrderModel];
}

export type UserAction =
  | UpdateLocationAction
  | UserErrorAction
  | UpdateCartAction
  | UserLoginAction
  | CreateOrderAction
  | ViewOrdersAction
|DeleteCart




export const onUpdateLocation = (location: string, postCode: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AsyncStorage.setItem('user_location', location);
      await AsyncStorage.setItem('user_location_postcode', postCode);

      dispatch({
        type: 'ON_UPDATE_LOCATION',
        payload: location,
        postCode: postCode,
      });
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onUpdateCart = (item: FoodModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: 'ON_UPDATE_CART',
      payload: item,
    });
  };
};

export const onDeleteCart = (item: [FoodModel]) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: 'ON_DELETE_CARD',
      
    });
  };
};
export const OnUserLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
        email,
        password,
      });

      // I added here because 'verified' value return undefined even we entered correct credentials.
      if (response.data.token) {
        response.data.verified = true;
      }

      console.log(response.data.verified);

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'User Login Error',
        });
      } else {
        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const OnUserSignup = (
  email: string,
  phone: string,
  password: string,
) => {
  console.log('onusewr sigup ?');
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.post<UserModel>(
        `${BASE_URL}user/create-account`,
        {
          email,
          phone,
          password,
        },
      );

      console.log('onuser signup respnse', response);

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Login Error',
        });
      } else {
        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onVerifyOTP = (otp: string, user: UserModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

      const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, {
        otp,
      });

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'User Verification Error',
        });
      } else {
        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onOTPRequest = (user: UserModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      const response = await axios.get<UserModel>(`${BASE_URL}user/otp`);

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'User Verification Error',
        });
      } else {
        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onCreateOrder = (cartItems: [FoodModel], user: UserModel) => {
  let cart = new Array();

  cartItems.map(item => {
    cart.push({_id: item._id, unit: item.unit});
  });

  console.log('user act.cart', cart)
  return async (dispatch: Dispatch<UserAction>) => {

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
     
      const response = await axios.post<OrderModel>(
        `${BASE_URL}user/create-order`,
        {
          cart
        }
      );

    

      if (!response) {

       
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Create order failed',
        });
      } else {
        dispatch({
          type: 'ON_CREATE_ORDER',
          payload: response.data,
        });
       
      }
     
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onGetOrders = (user: UserModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      const response = await axios.get<[OrderModel]>(`${BASE_URL}user/order`);

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'User Verification Error',
        });
      } else {
        dispatch({
          type: 'ON_VIEW_ORDER',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};
