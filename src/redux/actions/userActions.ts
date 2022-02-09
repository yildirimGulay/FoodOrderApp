import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface UpdateLocationAction {
    readonly type: "ON_UPDATE_LOCATION",
    payload: string,
    postCode: string
}

export interface UserErrorAction {
    readonly type: "ON_USER_ERROR",
    payload: any
}

export type UserAction = UpdateLocationAction | UserErrorAction 

export const onUpdateLocation = (location: string, postCode: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            
            await AsyncStorage.setItem('user_location', location)
   

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