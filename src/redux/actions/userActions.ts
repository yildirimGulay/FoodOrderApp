import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel, UserModel } from '../models'


export interface UpdateLocationAction {
    readonly type: "ON_UPDATE_LOCATION",
    payload: string,
    postCode: string
}


export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}


export interface UserErrorAction {
    readonly type: "ON_USER_ERROR",
    payload: any
}

export interface UserLoginAction {
    readonly type: "ON_USER_LOGIN",
    payload: UserModel
}

export type UserAction = UpdateLocationAction | UserErrorAction |  UpdateCartAction | UserLoginAction

export const onUpdateLocation = (location: string, postCode: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            
            await AsyncStorage.setItem('user_location', location)
            await AsyncStorage.setItem('user_location_postcode', postCode)
   

            dispatch({
                type: "ON_UPDATE_LOCATION",
                payload: location,
                postCode: postCode
            })
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onUpdateCart = (item: FoodModel) => {

     
    return async ( dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
    }

}

export const OnUserLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
                email,
                password
            })

            // I added here because 'verified' value return undefined even we entered correct credentials.
            if(response.data.token) {
                response.data.verified = true
            }

            console.log(response.data.verified)

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }
            
        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const OnUserSignup=(email:string, phone:string, password:string)=>{
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            const response= await axios.post<UserModel>(`${BASE_URL}user/signup`,{
                email,
                phone,
                password

            })

            console.log(response)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'Login Error'
                })
            }else{
                dispatch({
                    type:'ON_USER_LOGIN',
                    payload:response.data
                })
            }

        }catch (error) {
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:error

                })
        }
    }
}