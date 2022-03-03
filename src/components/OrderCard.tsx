import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { OrderModel } from '../redux';
import moment from 'moment'

interface OrderCardProps {
    item: OrderModel,
    onTap: Function,
}

const OrderCard : React.FC<OrderCardProps> = ({ item, onTap }) => {

    const orderStatus = () => {

        const status = item.orderStatus.toLowerCase()
        let statusIcon = require("../images/order_process.png")
        let statusMessage = status

        if(status === "completed") {
            statusMessage = "Delivered"
            statusIcon = require("../images/orders.png")
        } else if (status === "cancelled") {
            statusMessage = "Cancelled"
            statusIcon = require("../images/warning-icon.png")
        }

        return (
            <View style={styles.status_container} >
                <Image source={statusIcon} style={{width: 60, height: 60}} />
                <Text style={styles.status_message_text} >{statusMessage.toUpperCase()}</Text>
            </View>
        )
    }


    return(
        <TouchableOpacity style={styles.container} onPress={() => onTap()} >
            <View style={styles.inside_container} >
                <View style={styles.order_container} >
                    <Text style={styles.order_text} >Order ID: {item.orderID}</Text>
                    <Text style={styles.order_date_text} >{moment(item.orderDate).format("Do MMM YY, h:mm a") }</Text>
                    <Text style={styles.order_amount_text} >{item.totalAmount} ₺</Text>
                </View>
                {orderStatus()}
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: "#FFF",
        height: 100,
        justifyContent: "flex-start",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        flexDirection: "row",
    },
    inside_container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    order_container: {
        display: "flex",
        flex: 8,
        padding: 5,
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: "space-around",
        alignItems: "flex-start",
    },
    order_text: {
        fontSize: 22,
        fontWeight: "500",
        color: "black"
    },
    order_date_text: {
        fontSize: 16,
        fontWeight: "600",
        color: "#7C7C7C"
    },
    order_amount_text: {
        fontSize: 25,
        fontWeight: "700",
        color: "rgba(246,80,0,255)"
    },
    status_container: {
        display: "flex",
        flex: 3,
        padding: 5,
        alignItems: "center",
        justifyContent: "space-around",
    },
    status_message_text: {
        fontSize: 12,
        color: "#7C7C7C",
    }
})


export { OrderCard }