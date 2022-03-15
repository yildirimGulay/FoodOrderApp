import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {
  onUpdateLocation,
  UserState,
  ApplicationState,
  onAvailability,
  ShoppingState,
  Restaurant,
  FoodModel,
  onSearchFoods,
} from '../redux';

import {
  SearchBar,
  ButtonWithIcon,
  CategoryCard,
  RestaurantCard,
} from '../components';

interface HomeProps {
  navigation: any;
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onAvailability: Function;
  onSearchFoods: Function;
}

const _HomeScreen: React.FC<HomeProps> = ({
  navigation,
  userReducer,
  shoppingReducer,
  onAvailability,
  onSearchFoods,
}) => {
  const [address, setAddress] = useState('Address');
  const {location, postCode} = userReducer;
  const {availability} = shoppingReducer;
  const {categories, foods, restaurants} = availability;

  useEffect(() => {
    setAddress(location);
    onAvailability(postCode);
    setTimeout(() => {
      onSearchFoods(postCode);
    }, 1000);
  }, [location]);

  const onTapRestaurant = (item: Restaurant) => {
    navigation.navigate('Restaurant', {restaurant: item});
  };

  const onTapFood = (item: FoodModel) => {
    navigation.navigate('FoodDetail', {food: item});
  };

  const onTapEditLocation = () => {
    navigation.navigate("Location")
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.navigation_inner_container}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../images/delivery_icon.png')}
          />
          <Text style={styles.address_text}>{address}</Text>
          <ButtonWithIcon
            height={30}
            width={30}
            icon={require('../images/edit_icon.png')}
            onTap={ onTapEditLocation}
          />
        </View>
        <View style={styles.search_bar_container}>
          <SearchBar
            didTouch={() => {
              navigation.navigate('Search');
            }}
            onTextChange={() => {}}
          />
          <ButtonWithIcon
            onTap={() => {}}
            icon={require('../images/hambar.png')}
            width={50}
            height={40}
          />
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({item}) => (
              <CategoryCard
                item={item}
                onTap={() => {
                  Alert.alert('Category Tapped');
                }}
              />
            )}
            keyExtractor={item => `${item.id}`}
          />
          <View>
            <Text style={styles.restaurantsTitle}>Top Restaurants</Text>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={restaurants}
            renderItem={({item}) => (
              <RestaurantCard item={item} onTap={onTapRestaurant} />
            )}
            keyExtractor={item => `${item._id}`}
          />

          <View>
            <Text style={styles.restaurantsTitle}>30 Minutes Foods</Text>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foods}
            renderItem={({item}) => (
              <RestaurantCard item={item} onTap={onTapFood} />
            )}
            keyExtractor={item => `${item._id}`}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
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
  navigation_inner_container: {
    marginTop: 25,
    flex: 4,
    backgroundColor: 'rgba(242,242,242,1)',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  search_bar_container: {
    display: 'flex',
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantsTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#f15b5d',
    marginLeft: 20,
  },
  address_text: {
    fontSize: 13,
    color: 'black',
    marginRight: 10,
    marginLeft: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  shoppingReducer: state.shoppingReducer,
});

const HomeScreen = connect(mapToStateProps, {onAvailability, onSearchFoods})(
  _HomeScreen,
);

export {HomeScreen};
