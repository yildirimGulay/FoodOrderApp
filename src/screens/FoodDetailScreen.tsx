import {StyleSheet, Text, View,TouchableOpacity, ImageBackground, Dimensions, FlatList} from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { ButtonWithIcon, FoodCard } from '../components';
import {FoodModel,ApplicationState, Restaurant, onUpdateCart, UserState} from '../redux';
import { checkExistence } from '../utils'
import { connect } from 'react-redux';

interface FoodDeatilProps {
    navigation: {  goBack: Function},
    route: RouteProp<{ params: { food: FoodModel } }, 'params'>
    userReducer: UserState,
    onUpdateCart: Function,
}


export const _FoodDetailScreen: React.FC<FoodDeatilProps> = ({navigation,route, userReducer,onUpdateCart}) => {

  //const food  = route.params.food as FoodModel  
 // const {food}  :   { food: FoodModel } = route.params  
 const {food}  = route.params

  const {cart } = userReducer

 

  

  return (
    <View style={styles.container}>
    <View style={styles.navigation}>
        <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={42} height={42} />
            <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80}}> {food.name}</Text>
    </View>
    <View style={styles.body}>
        <ImageBackground source={{ uri: `${food.images[0]}`}}
        style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
        >
        <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10}}>

            <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }} > {food.name}</Text>
            <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }} > {food.category} </Text>

        </View>
        </ImageBackground>  
        <View style={{ display: 'flex', height: 300, padding: 20}}> 
                <Text> Food Will be ready within {food.readyTime}  Minite(s)</Text>
                <Text>{food.description} </Text>
            </View> 
            <View style={{ height: 120,}}>
                    <FoodCard item={checkExistence(food, cart)} onTap={() => {}} onUpdateCart={onUpdateCart} />
             </View>

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

const FoodDetailScreen = connect(mapToStateProps, { onUpdateCart })(_FoodDetailScreen) 

export { FoodDetailScreen }