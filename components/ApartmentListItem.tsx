import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import React from "react";

import apartments from '../assets/data/appartments.json'

type ApartmentListItem = {
  apartment: (typeof apartments)[0];
  containerStyle?: ViewStyle;
}

const ApartmentListItem = ({ 
  apartment, 
  containerStyle = {}, 
} :ApartmentListItem) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={{ uri: apartment.image }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{apartment.title}</Text>
        <Text style={styles.description}>
          {apartment.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>$ {apartment.price} / Đêm</Text>
          <Text style={styles.price}>
            ★ {apartment.rating} ({apartment.numberOfStars})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',

   

    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden'
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    width: 150,
    aspectRatio: 1,
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  description: {
    color: 'gray',
  },
  price: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
});
export default ApartmentListItem;
