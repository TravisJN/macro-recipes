import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  listItemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#21282f',
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  titleTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  recipeTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#21282f',
  },
  listItemInfoContainer: {
    width: '100%',
    height: '79%',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  recipeImage: {
    flex: 1,
    resizeMode: 'stretch',
    height: '100%',
    borderWidth: 1,
    borderColor: '#21282f',
    marginLeft: 5,
    marginRight: 5,
  },
  recipeInfoContainer: {
    flex: 2,
    height: '100%',
    justifyContent: 'space-around',
  },
  nutrientContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  caloriesContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  sourceContainer: {
    alignItems: 'center',
  },
  infoValueText: {
    fontWeight: 'bold',
    color: '#21282f',
  },
});

export default function SearchResultItem({ item, onSelectRecipe }) {
  const { title, image, protein, fat, carbs, calories } = item;

  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={() => onSelectRecipe(item)}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.recipeTitleText}>{title}</Text>
      </View>
      <View style={styles.listItemInfoContainer}>
        <Image source={{ uri: image }} style={styles.recipeImage} />
        <View style={styles.recipeInfoContainer}>
          <View>
            <View style={styles.nutrientContainer}>
              <Text>
                <Text>{`Protein: `}</Text>
                <Text style={styles.infoValueText}>{protein}g</Text>
              </Text>
              <Text>
                <Text>{`Fat: `}</Text>
                <Text style={styles.infoValueText}>{fat}g</Text>
              </Text>
              <Text>
                <Text>{`Carbs: `}</Text>
                <Text style={styles.infoValueText}>{carbs}g</Text>
              </Text>
            </View>
            <View style={styles.caloriesContainer}>
              <Text>
                <Text>{`Calories: `}</Text>
                <Text style={styles.infoValueText}>{calories}</Text>
              </Text>
              <Text>
                <Text>{`⏱️: `}</Text>
                <Text style={styles.infoValueText}>{item.readyInMinutes} minutes</Text>
              </Text>
            </View>
          </View>
          <View style={styles.sourceContainer}>
            <Text>{`From: ${item.sourceName}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
