import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import opencage from 'opencage-api-client';

import {connect} from 'react-redux';
import {onUpdateLocation, UserState, ApplicationState} from '../redux';
import {showAlert} from '../utils';

export const screenWidth = Dimensions.get('screen').width;

interface LocationAddress {
  city: string;
  street: string;
  region: string;
  country: string;
  postalCode: string;
  name: string;
}

interface LandingProps {
  userReducer: UserState;
  onUpdateLocation: Function;
}

const _LandingScreen: React.FC<LandingProps> = ({
  navigation,
  userReducer,
  onUpdateLocation,
}) => {
  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for Current Location',
  );
  const [position, setPosition] = useState<any>();
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => setPosition(position),
      error => setErrorMsg('hata'),
    );
  }, []);

  if (errorMsg.length > 0) {
    Alert.alert("Location Permission Needed!", "Location Permission needed to access your nearest restaurants!", 
    [
      {onPress: () => navigation.navigate('Location')},
    ]);
  }

  console.log('remsg', errorMsg, 'position', position);

  useEffect(() => {
    const key = '9c7704b06ab64272a3fc91d27796a202';
    if (position) {
      opencage
        .geocode({
          q: `${position.coords.latitude} ${position.coords.longitude}`,
          key,
        })
        .then(response => {
          let currentAdress = response.results[0].formatted;

          setDisplayAddress(currentAdress);
          onUpdateLocation(
            currentAdress,
            response.results[0].components.postcode,
          );

          if (currentAdress.length > 0) {
            setTimeout(() => {
              navigation.navigate('MyTabs');
            }, 2000);
          }
        })
        .catch(error => console.error(error));
    }
  }, [position]);

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

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const LandingScreen = connect(mapToStateProps, {onUpdateLocation})(
  _LandingScreen,
);

export {LandingScreen};

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
