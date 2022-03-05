
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, ShoppingState, UserState, onGetOffers, OfferModel, onApplyOffer } from '../redux';
import { ButtonWithIcon, FoodCard, OfferCard } from '../components'

import {  showAlert } from '../utils'
//import AsyncStorage from "@react-native-community/async-storage";


interface OfferScreenProps {
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onGetOffers: Function,
    onApplyOffer: Function
    navigation: { getParam: Function, goBack: Function, isFirstRouteInParent: Function  }
}

const _OfferScreen: React.FC<OfferScreenProps> = ({navigation, shoppingReducer,onGetOffers,onApplyOffer, userReducer}) => {
    const { offers } = shoppingReducer
    const { cart, appliedOffer, location, postCode } = userReducer
    const [showBackButton, setShowBackButton] = useState(true)
   

    // CHECK LATER
    //console.log(isFirstRouteInParent())
    /*
    if(isFirstRouteInParent()) {
        setShowBackButton(true)
        console.log("DOESNT EXIST")
    } else {
        console.log("IT EXISTS")
        setShowBackButton(false)
    }*/

    useEffect(() => {
        onGetOffers(postCode)
    }, [])


    const onTapApplyOffer = (offer: OfferModel) => {

        let total = 0
        if(Array.isArray(cart)){
            cart.map(food => {
                total += food.price * food.unit
            })
        }

        const taxAmount = (total / 100 * 0.9) + 40
        const orderAmount = taxAmount + total

        if(orderAmount >= offer.minValue) {
            onApplyOffer(offer, false)
            showAlert("Offer Applied", `Offer Applied with discount of ${offer.offerPercentage} %`)
        } else {
            showAlert("This offer is not applicable!", `This offer is applicable with minimum amount ${offer.minValue} only.`)
        }

      
    }

    const onTapRemoveOffer = (offer: OfferModel) => {
        onApplyOffer(offer, true)
    }

    const checkIfExist = (offer: OfferModel) => {

        if(appliedOffer._id !== undefined) {
            return offer._id.toString() === appliedOffer._id.toString()
        }

        return false
    }

    

    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                {showBackButton ? 
                    <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={42} height={42}/>
                    :
                    <Text>a</Text>
                }
            
                <Text style={styles.offers_text}>Offers & Deals</Text>
            
            </View>
            <View style={styles.body} >

                {Array.isArray(offers) &&

                <FlatList 
                showsVerticalScrollIndicator={false}
                data={offers} 
                renderItem={({item}) => 
                <OfferCard item={item} 
                onTapApply={onTapApplyOffer}
                onTapRemove={onTapRemoveOffer}
                isApplied={checkIfExist(item)}
                /> }
                keyExtractor={(item) => `${item._id}`} />  
                
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    navigation: {
        flex: 1,
        marginTop: 43,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center", 
    },
    inside_container: {
        display: "flex",
        height: 60,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4
    },
    body: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    offers_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black",
        marginLeft: 80
    },
    icon: {
        height: 30,
        width: 30
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const OfferScreen = connect(mapStateToProps, { onGetOffers, onApplyOffer })(_OfferScreen)

export { OfferScreen }