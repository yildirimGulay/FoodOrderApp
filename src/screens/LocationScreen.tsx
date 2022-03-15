import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState, Region, onFetchLocation } from '../redux'


import { ButtonWithIcon, ButtonWithTitle, LocationPick, LocationPickMap } from '../components';
import { Point } from 'react-native-google-places-autocomplete';

const screenWidth = Dimensions.get('screen').width


interface LocationScreenProps {
    navigation:{navigate:Function}
    userReducer: UserState,
    onUpdateLocation: Function,
    onFetchLocation: Function
}


const _LocationScreen: React.FC<LocationScreenProps> = ({ navigation, userReducer,  onUpdateLocation, onFetchLocation }) => {

    const [isMap, setIsMap] = useState(false)
    const { pickedAddress } = userReducer
    const [currentAddress, setCurrentAddress] = useState("Pick a Location from Map")
    const [postcode, setPostcode] = useState("")
    const [region, setRegion] = useState<Region>({
         latitude: 38.496769,
         longitude: 27.705259,
         latitudeDelta: 38.496769,
         longitudeDelta: 27.705259
     } )

    useEffect(() => {

        if(pickedAddress !== undefined) {
            const { address_components } = pickedAddress
            if(Array.isArray(address_components)) {
                setCurrentAddress(pickedAddress.formatted_address) 
                address_components.map(item => {
                    if(item.types.filter(item => item === 'postal_code').length > 0) {
                        setPostcode(item.short_name)
                    }
                })
            }
        }

    }, [pickedAddress])
console.log('pick',pickedAddress)
    
    const onChangeLocation = (location: Point) => {
        setIsMap(true)
        console.log(location);

        setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 38.496769,
            longitudeDelta: 27.705259
        })
    }

    const onPickLocationFromMap = (newRegion: Region  ) => {
        setRegion(newRegion)
       

       onFetchLocation(newRegion.latitude, newRegion.longitude)
    }

    const onTapConfirmLocation =  () => {
        
        console.log("confirmed");
         onUpdateLocation(currentAddress, postcode)
         navigation.navigate("MyTabs")
 
    }    

    const pickLocationView = () => {

        return(
            <View style={styles.container} >
                
                <View style={styles.pick_location_inside_container} >
                    <ButtonWithIcon icon={require("../images/back_arrow.png")} onTap={() => navigation.navigate("MyTabs")} width={40} height={50} />
                    <View style={styles.input_container} >
                        <LocationPick onChangeLocation={onChangeLocation} />
                    </View>
                    
                </View>

                <View style={styles.center_message}>
                    <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                    <Text style={styles.addressTitle} >Pick Your Location</Text>

                </View>
            </View>
        )

    }


    const mapView = () => {

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                    <View style={styles.map_view_container} >
                        <ButtonWithIcon icon={require('../images/back_arrow.png')} height={50} width={40} onTap={() => navigation.navigate('MyTabs')} />
                        <View style={styles.text_container} >
                            <Text style={styles.pick_text} >Pick Your Location From Map</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body} >
                    <LocationPickMap lastLocation={region} onMarkerChanged={onPickLocationFromMap} />
                </View>
                <View style={styles.footer} >
                    <View style={styles.confirm_container} >
                        <Text style={styles.your_address_text} >{currentAddress}</Text>
                        <ButtonWithTitle title='Confirm' onTap={onTapConfirmLocation} width={320} height={50} />
                    </View>
                </View>
            </View>
        )

    }

    
    if(isMap) {
        return mapView()
    } else {
        return pickLocationView()
    }

}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LocationScreen = connect(mapToStateProps, { onUpdateLocation, onFetchLocation })(_LocationScreen)

export { LocationScreen }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)"
    },
    navigation: {
        flex: 1,
        marginTop: 44
    },
    body: {
        flex: 7,
        display: "flex"
    },
    footer: {
        flex: 2,
        padding: 10,
    },
    center_message: {
        left: "50%",
        top: "50%",  
        position: "absolute",
        marginLeft: -65,
        marginTop: -50
    },
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    addressTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginLeft: -25
    },
    pick_location_inside_container:{
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop: 45,
        marginLeft: 5
    },
    input_container: {
        display: "flex",
        flex: 1,
        marginRight: 5,
    },
    map_view_container: {
        display: "flex",
        height: 60,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 5,
        paddingLeft: 10
    },
    text_container: {
        flex: 1,
        marginLeft: 20
    },
    pick_text: {
        fontSize: 18,
        fontWeight: "700",
        color: "black"
    },
    confirm_container:{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20
    },
    your_address_text: {
        fontSize: 15,
        fontWeight: "600",
        color: "black"
    }
})

