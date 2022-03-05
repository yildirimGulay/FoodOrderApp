

 import React, {useState, useEffect, createRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import {
  ApplicationState,
  FoodModel,
  ShoppingState,
  onUpdateCart,
  UserState,
  onCreateOrder,
  onApplyOffer
 
} from '../redux';

import {FoodCardInfo, ButtonWithTitle} from '../components';
import {checkExistence, showAlert} from '../utils';

import PaymentTypePopup from "react-native-raw-bottom-sheet";

interface CartScreenProps {
  navigation: {navigate: Function},
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onUpdateCart: Function;
  onCreateOrder: Function,
  onApplyOffer: Function
}

const _CartScreen: React.FC<CartScreenProps> = ({
  navigation,
  shoppingReducer,
  onUpdateCart,
  userReducer,
  onCreateOrder,
  onApplyOffer
}) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalTax, setTotalTax] = useState(0)
    const [payableAmount, setPayableAmount] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [isPayment, setIsPayment] = useState(false)
  
 
  const popupRef = createRef<PaymentTypePopup>()

  const {availableFoods} = shoppingReducer;
  const {cart, user, location, orders , appliedOffer} = userReducer;


  useEffect(() => {
    onCalculateAmount();
  }, [cart]);

  const onCalculateAmount = () => {
    let total = 0;
    if (Array.isArray(cart)) {
      cart.map(food => {
        total += food.price * food.unit;
      });
    }

    const tax = (total / 100 * 0.9) + 40

        if(total > 0) {
            setTotalTax(tax)
        }

        setTotalAmount(total)
        setPayableAmount(total)
        setDiscount(0)
        
        if(appliedOffer._id !== undefined) {

            if(total >= appliedOffer.minValue) {

                const discount = (total / 100) * appliedOffer.offerPercentage
                setDiscount(discount)
                const afterDiscount = (total - discount)
                setPayableAmount(afterDiscount)

            } else {
                showAlert("The applied Offer is not Applicable!",
                `This offer is applicable with mininum ${appliedOffer.minValue} only! Please select another offer.`,
               onApplyOffer(appliedOffer, true))
            }
        }

        setTotalAmount(total)
    };





  const onValidateOrder = () => {
    if(user !== undefined) {
      if(!user.verified) {
          navigation.navigate('Login')
      } else {
       
        console.log('you can order')
          popupRef.current?.open()
        
      }
  } else {
   
      navigation.navigate("Login")
    
  }  
  };

  const onTapPlaceOrder = () => {
    
    onCreateOrder(cart, user)
    popupRef.current?.close()
    onApplyOffer(appliedOffer, true)
}

  const onTapFood = (item: FoodModel) => {
    navigation.navigate('FoodDetail', {food: item});
  };


  const footerContent = () => {
    return(
        <View style={styles.footer_content_container} >
            <TouchableOpacity style={[styles.footer_content_button, {height: 80}]}
            onPress={() => navigation.navigate('CartOffer')}
            >  
                <View style={{flex: 1}}>
                    <Text style={styles.offer_title_text} >Offers & Deals</Text>
                    {appliedOffer._id !== undefined ?
                        <View style={{flex:1}} ><Text style={styles.offer_text} >{appliedOffer.offerPercentage} % of Discount</Text></View>
                        :
                        <View><Text>You can apply available Offers.</Text></View>
                    }
                </View>
                <Image source={require("../images/arrow_icon.png")} style={styles.order_icon} />
            </TouchableOpacity>

            <View style={[styles.footer_content_button, {height: 250, justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column"}]} >
                <Text style={[styles.offer_title_text, {flex: 1}]} >Bill Details</Text>
                <View style={styles.footer_total_amount} >
                    <Text style={{ flex: 1, color: "black", fontSize: 14}} >Total</Text>
                    <Text style={{color: "black", fontSize: 16}} >{totalAmount.toFixed(0)} ₺</Text>
                </View> 
                <View style={styles.footer_total_amount} >
                    <Text style={{ flex: 1, color: "black", fontSize: 14}} >Tax & Deliver Charge</Text>
                    <Text style={{color: "black", fontSize: 16}} >{totalTax.toFixed(0)} ₺</Text>
                </View>

                {appliedOffer._id !== undefined && 
                <View style={styles.footer_total_amount} >
                    <Text style={{ flex: 1, color: "black", fontSize: 14}} >Discount (applied {appliedOffer.offerPercentage} % Offer) </Text>
                    <Text style={{color: "black", fontSize: 16}} >{discount.toFixed(0)} ₺</Text>
                </View>
                }
                
                <View style={styles.footer_total_amount} >
                    <Text style={{ flex: 1, color: "black", fontSize: 14}} >Net Payable</Text>
                    <Text style={{color: "black", fontSize: 16}} >{payableAmount.toFixed(0)} ₺</Text>
                </View>
            </View>
            
        </View>
    )
}


  const popupView = () => {

    return(
        <PaymentTypePopup
            height={400}
            ref={popupRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
                wrapper: { backgroundColor: "transparent" },
                draggableIcon: { backgroundColor: "#000" },
                container: {
                    justifyContent: "flex-start",
                    alignItems: "center"
                }
            }}
        >
            <View style={styles.popup_container} >
                <View style={styles.payment_view} >
                    <Text style={{fontSize: 20}}>{totalAmount}</Text>
                    <Text style={{fontSize: 20, fontWeight: "600"}}> ₺</Text>
                </View>
                <View style={styles.payment_view_address_container} >
                    <Image source={require('../images/delivery_icon.png')} style={{height:50, width: 50}} />
                    <View  >
                        <Text style={styles.delivery_address_title} >Address Used to Delivery</Text>
                        <Text style={styles.delivery_address_text} >{location}</Text>
                    </View>
                </View>

                <ScrollView horizontal={true} >
                    <View style={styles.payment_options} >
                        <TouchableOpacity 
                            onPress={() => onTapPlaceOrder()}
                            style={styles.options} 
                        >
                            <Image source={require('../images/cod_icon.png')} style={styles.icon} />
                            <Text style={styles.icon_text} >Cash On Delivery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => {}}
                            style={styles.options} 
                        >
                            <Image source={require('../images/card_icon.png')} style={styles.icon} />
                            <Text style={styles.icon_text} >Card Payment</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        </PaymentTypePopup>
    )

}


  if (cart.length > 0) {
    return(
      <View style={styles.container} >
          <View style={styles.navigation} >
              <View style={styles.inside_container}>
                      <Text style={styles.my_cart_text} >My Cart</Text>
                  { user.token !== undefined && 
                      <TouchableOpacity style={{alignItems: "center"}} 
                      onPress= {() => {
                          navigation.navigate("Order")
                      }}
                      >
                          <Image source={require("../images/orders.png")} style={styles.order_icon} />
                      </TouchableOpacity> 
                  }
                      
              </View>
          </View>
          <View style={styles.body} >
              <FlatList 
              showsVerticalScrollIndicator={false}
              data={cart}
              renderItem={({item}) => <FoodCardInfo item={checkExistence(item, cart)} onTap={onTapFood} onUpdateCart={onUpdateCart} /> } 
              keyExtractor={(item) => `${item._id}`} 
              ListFooterComponent={footerContent} />
               
          </View>

          <View style={styles.footer}>
              <View style={styles.amount_container} >
                  <Text style={styles.total_text} > Total: {totalAmount}</Text>
                  <Text style={styles.total_text} > ₺</Text>
              </View>
              <ButtonWithTitle title={"Make Payment"} onTap={onValidateOrder} height={50} width={320}/>
          </View>

          {popupView()}

      </View>
  )
  } else {
    return(
      <View style={styles.container}>
          <View style={styles.navigation}> 
              <View style={styles.inside_container}>
                  <Text style={styles.my_cart_text} >My Cart</Text>
              { user !== undefined && 
                  <TouchableOpacity style={{alignItems: "center"}} 
                  onPress= {() => {
                      navigation.navigate("Order")
                  }}
                  >
                      <Image source={require("../images/orders.png")} style={styles.order_icon} />
                  </TouchableOpacity> 
              }
                  
              </View>
          </View>

              <View style={styles.body}>
                  <Text style={styles.empty_text} >Your Cart is Empty</Text>
              </View>
      </View>
  )
}
};
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
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
        paddingLeft: 20,
        paddingRight: 20,
    },
    body: {
        flex: 11,
        justifyContent: "center",
        alignItems: "center",
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
    footer: {
        flex: 2,
        padding: 10,
    },
    amount_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20
    },
    total_text: {
        fontSize: 18,
        color: "black"
    },
    popup_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
    },
    payment_view: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
        margin: 5,
        backgroundColor: "#E3BE74",
    },
    payment_view_address_container: {
        display: "flex",
        height: 100,
        padding: 20,
        flexDirection: "row"
    },
    delivery_address_title: {
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 5,
        color: "black"
    },
    delivery_address_text: {
        fontSize: 16, 
        marginBottom: 5,
        color: "#666666",
        width: Dimensions.get("screen").width - 60
    },
    payment_options: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width
    },
    options: {
        display: "flex",
        height: 120,
        width: 160,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: 10,
        borderColor: "#A0A0A0",
        backgroundColor: "#F2F2F2",
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 10,
    },
    icon: {
        width: 115,
        height: 80,
    },
    icon_text: {
        fontSize: 16,
        fontWeight: "800",
        color: "#545252",
    },
    my_cart_text: {
        fontSize: 22,
        fontWeight: "700",
        color: "black"
    },
    order_icon: {
        width: 50,
        height: 50,
    },
    footer_content_container: {
        flex: 1,
        display: "flex",

    },
    footer_content_button: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        borderColor: "#d3d3dd3",
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    offer_title_text: {
        fontSize: 18,
        fontWeight: "600",
        color: "black",
    },
    offer_text: {
        fontSize: 13,
        fontWeight: "600",
        color: "#3d933f"
    },
    footer_total_amount: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-around",
        paddingLeft: 10,
        paddingRight: 10,
    }
})

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const CartScreen = connect(mapStateToProps, {onUpdateCart,onCreateOrder, onApplyOffer})(_CartScreen);

export {CartScreen};
