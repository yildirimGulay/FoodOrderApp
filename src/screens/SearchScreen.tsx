import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';

import {connect} from 'react-redux';
import {
  ApplicationState,
  FoodModel,
  ShoppingState,
  onUpdateCart,
  UserState,
} from '../redux';

import {ButtonWithIcon, FoodCard, SearchBar} from '../components';
import {checkExistence} from '../utils';

interface SearchScreenProps {
  navigation: any;
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onUpdateCart: Function;
}

const _SearchScreen: React.FC<SearchScreenProps> = ({
  navigation,
  shoppingReducer,
  onUpdateCart,
  userReducer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [keyword, setKeyword] = useState('');

  const {availableFoods} = shoppingReducer;
  const {cart} = userReducer;

  const onTapFood = (item: FoodModel) => {
    navigation.navigate('FoodDetail', {food: item});
  };
  console.log(cart);
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            display: 'flex',
            height: 60,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 4,
          }}>
          <ButtonWithIcon
            icon={require('../images/back_arrow.png')}
            onTap={() => navigation.navigate('Home')}
            width={40}
            height={50}
          />
          <SearchBar
            onTextChange={setKeyword}
            onEndEditing={() => setIsEditing(false)}
            didTouch={() => setIsEditing(true)}
          />
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            isEditing
              ? availableFoods.filter(item => {
                  return item.name.includes(keyword);
                })
              : availableFoods
          }
          renderItem={({item}) => (
            <FoodCard
              onTap={onTapFood}
              item={checkExistence(item, cart)}
              onUpdateCart={onUpdateCart}
            />
          )}
          keyExtractor={item => `${item._id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F2F2F2'},
  navigation: {flex: 1, marginTop: 43},
  body: {flex: 10, justifyContent: 'center', alignItems: 'center'},
  footer: {flex: 1, backgroundColor: 'cyan'},
});

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const SearchScreen = connect(mapStateToProps, {onUpdateCart})(_SearchScreen);

export {SearchScreen};
