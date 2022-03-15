import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Region } from '../redux/models'
import MapView from 'react-native-maps'


interface LocationPickMapProps {
    lastLocation: Region,
    onMarkerChanged: Function
}

const LocationPickMap: React.FC<LocationPickMapProps> = ({ onMarkerChanged, lastLocation }) => {
    
    const onRegionChange = (newRegion: Region) => {
        onMarkerChanged(newRegion)
    }


    return(
        <View style={styles.container} >

            <MapView
                style={styles.map_view_container}
                region={lastLocation}
                onRegionChangeComplete={onRegionChange}
            >
            </MapView>

            <View style={styles.icon_container} >
                <Image source={require("../images/delivery_icon.png")} style={styles.icon} />
            </View>

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
    },
    map_view_container: {
        flex: 1,
    },
    icon_container: {
        left: "50%",
        top: "50%",
        position: "absolute",
        marginLeft: -24,
        marginTop: -48
    },
    icon: {
        width: 50,
        height: 50
    }
})

export { LocationPickMap }