import { Alert } from 'react-native'
 
export const showAlert = (title: string, msg: string, func?: Function) => {
    Alert.alert(
        title,
        msg,
        [
            {text: "OK", onPress: () => func!}
        ]
    )
}