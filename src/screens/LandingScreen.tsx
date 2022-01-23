import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import opencage from 'opencage-api-client';

const screenWidth = Dimensions.get('screen').width;

interface LocationAddress {
  city: string;
  street: string;
  region: string;
  country: string;
  postalCode: string;
  name: string;
}



const LandingScreen = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState([]);
  const [lat,setLat] = useState<number>();
  const [long,setLong] = useState<number>();
  const [data, setData] = useState([])

 
  useEffect(()=> {Geolocation.getCurrentPosition(
       ( position) => {
           setLat(position.coords.latitude);
           setLong(position.coords.longitude)})
       })


    useEffect(() => {
        try {
          const apiKey= "a72e4d8f377a4821bb83199f4b41025a";
          (async () => {
            const response = await opencage.geocode({
                q:`${lat} ${long}`,
                key: apiKey,
               
               
              });
              setAddress(response.results[0].formatted);
              console.log("lat",lat)
          
          })();
        } catch (err) {
          console.log(err);
        }
      }, [lat,long]);
  
    



//  const reverseGeocode = () => {
//     const key = 'a72e4d8f377a4821bb83199f4b41025a';
//     opencage.geocode({ key, q: `${lat},${long} ` }).then(response => {
//        setData(response[0])
//         setAddress ( response.data.formatted);
        
//     }
//     )}
     
//     console.log('adresdata:',reverseGeocode())
     console.log('adres:',address)

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
        <Text style={styles.addressText}>Waiting for Current Location  </Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

export default LandingScreen;

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
