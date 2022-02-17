import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LandingScreen,
  SearchScreen,
  FoodDetailScreen,
  RestaurantScreen,
} from '../screens';

import {TabNav} from './TabNav';

export const StackNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyTabs"
        component={TabNav}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
