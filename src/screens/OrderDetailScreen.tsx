import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, UserState, OrderModel, onCancelOrder} from '../redux';
import { ButtonWithIcon, ButtonWithTitle, FoodCard, OrderCard } from '../components'

import { RouteProp } from '@react-navigation/native';

import moment from "moment"


interface OrderDetailScreenProps {
    userReducer: UserState,
    onCancelOrder: Function,
    navigation : { navigate:Function, goBack: Function }
    route: RouteProp<{ params: { order: OrderModel } }, 'params'>
}

const _OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({navigation, route, userReducer,onCancelOrder}) => {

    const {order}  = route.params
    const { user } = userReducer



    const onTapCancelOrder = () => {

        Alert.alert(
            "Do you want to cancel this Order?",
            "Cancellation charge may applicable as per terms and conditions! \nWe will send you cancellation confirmation soon!",
            [
                { text: "No" , onPress: () => {}, style: "cancel" },
                { text: "Yes", onPress: () => {
                    onCancelOrder(order, user)
                    navigation.goBack()
                }}
            ]
        )

    }


    const headerCart = () => {

        return(
            <View style={styles.header_container} >
                <Text style={styles.order_info} >Order Date: {moment(order.orderDate).format("Do MMM YY, h:mm a")}</Text>
                <Text style={styles.order_info} >Order Amount: {order.totalAmount} ₺</Text>
                <Text style={styles.order_info} >Paid Through: {order.paidThrough}</Text>
                <Text style={styles.order_info} >Status: {order.orderStatus}</Text>
            </View>
        )
    }


    const footerCart = () => {

        if(order.orderStatus.toLowerCase() === "cancelled") {
            return(
                <View style={styles.footer_container} >
                    <Text style={{ fontSize: 18 }} >Order is Cancelled with ID : XXXX </Text>
                </View>
            )
        } else {
            return( <>
                <View style={styles.footer_container_second} >
                    <Text style={{ fontSize: 18 }} >Map View will come here. </Text>
                </View>
                <View style={{marginBottom: 10}} >
                    <ButtonWithTitle title={"Cancel Order"} onTap={onTapCancelOrder} height={50} width={320} />
                </View>
            </>
            )
        }
    }


    return(
        <View style={styles.container} >
            <View style={styles.navigation} >
                <View style={styles.inside_container}>

                    <ButtonWithIcon width={50} height={50} onTap={() => navigation.goBack()} icon={require("../images/back_arrow.png")} />

                    <Text style={styles.orders_text}>Order ID: {order.orderID}</Text>
                        
                </View>
            </View>
            <View style={styles.body} >
                
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={order.items}
                renderItem={({item}) => 
                <FoodCard item={item.food} onTap={()=> {}} onUpdateCart={() => {}} unit={item.unit} /> } 
                keyExtractor={(item) => `${item._id}`}
                ListHeaderComponent={headerCart()}
                ListFooterComponent={footerCart()} />
                
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
        marginTop: 20,
    },
    inside_container: {
        display: "flex",
        height: 60,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
        paddingLeft: 20,
        paddingRight: 20,
    },
    body: {
        flex: 11,
        justifyContent: "center",
        alignItems: "center"
    },
    empty_cart_container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    empty_text: {
        fontSize: 25,
        fontWeight: "700",
        color: "black"
    },
    orders_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    },
    header_container: {
        padding: 10,
        alignItems: "flex-start",
    },
    order_info: {
        fontSize: 22,
        color: "black",
        fontWeight: "400",
        marginBottom: 10
    },
    footer_container: {
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    footer_container_second: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        display: "flex",
        backgroundColor: "#C5C5C5"
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const OrderDetailScreen = connect(mapStateToProps, { onCancelOrder })(_OrderDetailScreen)

export { OrderDetailScreen }