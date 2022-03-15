import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAP_API_KEY } from '../utils';


interface LocationPickProps {
    onChangeLocation: Function
}

const LocationPick: React.FC<LocationPickProps> = ({ onChangeLocation }) => {
    
    return(
        <View style={styles.container} >

            <GooglePlacesAutocomplete 
            minLength={4}
            placeholder="Search Your Address"
            fetchDetails={true}
            onPress={(_, details = null) => {  // _ is data. but we dont need here. we need details.

                if(details?.geometry) {
                    onChangeLocation(details.geometry.location)
                }
                console.log(JSON.stringify(details?.geometry.location))
            }}
            query={{
                key: MAP_API_KEY,
                language: "en"
            }}
            debounce={300}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40
    }
})

export { LocationPick }