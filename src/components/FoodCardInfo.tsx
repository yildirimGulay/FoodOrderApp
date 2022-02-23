import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ButtonAddRemove} from '.';
import {FoodModel} from '../redux';

interface FoodCardInfoProps {
  item: FoodModel;
  onTap: Function;
  onUpdateCart: Function;
}

const FoodCardInfo: React.FC<FoodCardInfoProps> = ({
  item,
  onTap,
  onUpdateCart,
}) => {
  const didUpdateCart = (unit: number) => {
    item.unit = unit;
    onUpdateCart(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <View style={styles.text_container}>
          <Text style={styles.name_text}>{item.name}</Text>
          <Text style={styles.category_text}>{item.category}</Text>
        </View>
        <View style={styles.price_container}>
          <Text style={styles.price_text}>{item.price} ₺</Text>
          <ButtonAddRemove
            onAdd={() => {
              let unit = isNaN(item.unit) ? 0 : item.unit;
              didUpdateCart(unit + 1);
            }}
            onRemove={() => {
              let unit = isNaN(item.unit) ? 0 : item.unit;
              didUpdateCart(unit > 0 ? unit - 1 : unit);
            }}
            qty={item.unit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width - 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    height: 100,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
  },
  button_container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  text_container: {
    display: 'flex',
    flex: 8,
    padding: 10,
    marginTop: 10,
    paddingLeft: 20,
  },
  price_container: {
    display: 'flex',
    flex: 4,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 10,
  },
  price_text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C7C7C',
  },
  name_text: {
    fontSize: 22,
    fontWeight: '600',
  },
  category_text: {
    fontWeight: '800',
  },
});

export {FoodCardInfo};
