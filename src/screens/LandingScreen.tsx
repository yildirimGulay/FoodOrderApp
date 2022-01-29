import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Button} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import opencage from 'opencage-api-client';

export const screenWidth = Dimensions.get('screen').width;

interface LocationAddress {
  city: string;
  street: string;
  region: string;
  country: string;
  postalCode: string;
  name: string;
}

export const LandingScreen = ({navigation}) => {
  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for Current Location',
  );
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();


  useEffect(() => {
    try {
      const apiKey = 'a72e4d8f377a4821bb83199f4b41025a';

     
      (async () => {

       const location= await Geolocation.getCurrentPosition(position => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

        const response = await opencage.geocode({
          q: `${lat} ${long}`,
          key: apiKey,
        });

        let currentAdress = response.results[0].formatted;
      
            setDisplayAddress(currentAdress);
         
        
      })();
    } catch (err) {
      console.log(err);
    }

    setTimeout(() => {
      navigation.navigate('MyTabs');
    }, 2000);
  }, [lat, long]);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Image
          source={require('../images/delivery_icon.png')}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>
        <Text style={styles.addressText}> {displayAddress} </Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242,242,242,1)',
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7D7D7D',
  },
  addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F',
  },

  footer: {
    flex: 1,
  },
});
