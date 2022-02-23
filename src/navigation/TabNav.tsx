import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AccountScreen, HomeScreen, CartScreen, OfferScreen} from '../screens';



export const TabNav = () => {

  const Tab = createBottomTabNavigator();

  
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let icon =
              focused == true
                ? require('../images/home_icon.png')
                : require('../images/home_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let icon =
              focused == true
                ? require('../images/offer_icon.png')
                : require('../images/offer_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let icon =
              focused == true
                ? require('../images/cart_icon.png')
                : require('../images/cart_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Acoount"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => {
            let icon =
              focused == true
                ? require('../images/account_icon.png')
                : require('../images/account_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  },
});
