import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Button} from 'react-native';


import { connect } from 'react-redux';
import {onUpdateLocation, UserState, ApplicationState,onAvailability} from '../redux'

import {SearchBar, ButtonWithIcon} from '../components'


interface HomeProps {
  userReducer: UserState,
  //shoppingReducer: ShoppingState,
  onAvailability: Function,
  //onSearchFoods: Function
}


const _HomeScreen: React.FC<HomeProps> = ({navigation,userReducer}) => {

 

  
  //const { availability } = props.shoppingReducer
  //const { categories, foods, restaurants } = availability

  
  return (
   
      <View style={styles.container}>
        <View style={styles.navigation}>
        <View style={{ marginTop: 50, flex: 4, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Text>{userReducer.location} </Text> 
                    <Text> Edit</Text>
                </View>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
                    <SearchBar didTouch={() => {
                        navigation.navigate('Search')
                    }}  onTextChange={() => {}} />
                     <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
        </View>
        <View style={styles.body}>
          
       
        </View>
        <View style={styles.footer}>
          
        </View>
      </View>
      
   
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps,{onAvailability})(_HomeScreen)

export { HomeScreen }
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  navigation: {
    flex: 2,
   
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  footer: {
    flex: 1,
  
  },
});
