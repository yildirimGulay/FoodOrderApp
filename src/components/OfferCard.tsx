import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import { OfferModel } from '../redux';

interface OfferCardProps {
    item: OfferModel,
    onTapApply: Function,
    onTapRemove: Function,
    isApplied: boolean
}


const OfferCard: React.FC<OfferCardProps> = ({ item, onTapApply, onTapRemove, isApplied }) => {

    
    const onTapApplya = () => {

    }


    return(
        <View style={styles.container}>
            <Image source={{ uri: `${item.images[0]}`}} style={styles.image} />

            <View style={styles.inside_container} >
                <View style={styles.text_container} >
                    <Text style={styles.title_text} >{item.title}</Text>
                    <Text style={styles.desc_text} >{item.description}</Text>
                </View>  

                <View style={styles.button_container} >
                    {isApplied ? 
                    <TouchableOpacity style={[styles.apply_promo, {backgroundColor: "#FF4673"}]} onPress={() => onTapRemove(item)} >
                        <Text style={styles.apply_promo_text} >Remove</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.apply_promo} onPress={() => onTapApply(item)} >
                        <Text style={styles.apply_promo_text} >Apply</Text>
                        <Text style={[styles.apply_promo_text, {fontSize: 14}]} >{item.promoCode}</Text>
                    </TouchableOpacity> 
                    }
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#EFCA5F",
        height: 270,
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        flexDirection: "column",
        
    },
    button_container: {
        display: "flex",
        flex: 4.5,
        padding: 10,
    },
    image: {
        width: Dimensions.get("screen").width - 20,
        height: 200,
        borderRadius: 20,
        backgroundColor: "#EAEAEA"
    },
    inside_container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    text_container: {
        display: "flex",
        flex: 7.5,
        padding: 10,
    },
    title_text: {
        fontSize: 16,
        fontWeight: "600",
        color: "black",
    },
    desc_text: {
        fontSize: 12,
    },
    apply_promo: {
        flexDirection: "row",
        backgroundColor: "#8FC777",
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    apply_promo_text: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        margin: 3
    }
})


export { OfferCard }