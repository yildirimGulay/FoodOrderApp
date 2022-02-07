import React from 'react';
import { Image, StyleSheet } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { LandingScreen, AccountScreen, HomeScreen, CardScreen, OfferScreen } from './src/screens';
import { Provider } from 'react-redux';
import { store } from './src/redux';





const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false}} >
      <Tab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }}
       />
        <Tab.Screen name="Offer" component={OfferScreen} 
       options={{
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }}/>
      <Tab.Screen name="Card" component={CardScreen}
       options={{
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }} />
      <Tab.Screen name="Acoount" component={AccountScreen}
       options={{
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }} />
     
    </Tab.Navigator>
  );
}

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
        />
       
      <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />  
     
      </Stack.Navigator>
      
    </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  }
});
