import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LandingScreen,
  SearchScreen,
  FoodDetailScreen,
  RestaurantScreen,
  LoginScreen,
  OrderScreen,
  OrderDetailScreen,
  OfferScreen,
 
} from '../screens';

import {TabNav} from './TabNav';


export const StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />

      <Stack.Screen name="MyTabs" component={TabNav} />

      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="AccountOrder" component={OrderScreen} />
      <Stack.Screen name="CartOffer" component={OfferScreen} />
      
    </Stack.Navigator>
  );
};
