import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import React from 'react';
import {Restaurant} from '../redux';

interface RestaurantProps {
  navigation: {getParam: Function; goBack: Function};
}

export const RestaurantScreen = ({navigation,route}) => {

  const {restaurant} = route.params;

  

  return (
    <SafeAreaView>
      <Text>{restaurant.name}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
