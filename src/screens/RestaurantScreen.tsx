import {StyleSheet, Text, View,TouchableOpacity, ImageBackground, Dimensions, FlatList} from 'react-native';
import React from 'react';

import { ButtonWithIcon, FoodCard } from '../components';
import {FoodModel,ApplicationState, Restaurant, onUpdateCart, UserState} from '../redux';
import { checkExistence } from '../utils'
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';


interface RestaurantProps {
    navigation:any,
    route: RouteProp<{ params: { restaurant: Restaurant  } }, 'params'>,
    userReducer: UserState,
    onUpdateCart: Function,
}

export const _RestaurantScreen: React.FC<RestaurantProps> = ({navigation,route, userReducer,onUpdateCart}) => {

  const {restaurant}  = route.params 

  const { cart } = userReducer

  const onTapFood = (item: FoodModel) => {
    navigation.navigate('FoodDetail', { food: item })
}
  

  return (
    <View style={styles.container}>
    <View style={styles.navigation}>
        <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={42} height={42} />
            <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80}}> {restaurant.name}</Text>
    </View>
    <View style={styles.body}>
        <ImageBackground source={{ uri: `${restaurant.images[0]}`}}
        style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
        >
        <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10}}>

            <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }} > {restaurant.name}</Text>
            <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }} > {restaurant.address} { restaurant.phone}</Text>

        </View>
        </ImageBackground>  
        <FlatList 
                showsVerticalScrollIndicator={false}
                data={restaurant.foods}
                renderItem={({ item}) => <FoodCard item={checkExistence(item, cart)}  onTap={onTapFood}  onUpdateCart={onUpdateCart}/>} // ontab item?? 
                keyExtractor={(item) => `${item._id}`}
            />

        </View>
</View>
  )
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', },
    footer: { flex: 1, backgroundColor: 'cyan' }
});

const mapToStateProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer,
})

const RestaurantScreen = connect(mapToStateProps, { onUpdateCart })(_RestaurantScreen) 

export { RestaurantScreen }