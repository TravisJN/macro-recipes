import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '20%',
    width: '100%',
    padding: 5,
    borderBottomColor: '#21282f',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: '#f2f2f2',
  },
  recipeImage: {
    flex: 1,
    resizeMode: 'stretch',
    borderWidth: 1,
  },
  textContainer: {
    flex: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#21282f'
  },
  metadataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metadataText: {
    fontSize: 14,
    color: '#21282f',
    fontWeight: '500',
  },
  nutrientsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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

export default function RecipeHeader(props) {
  const {
    image,
    title,
    protein,
    fat,
    carbs,
    calories,
    readyInMinutes
  } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.recipeImage} />
      <View style={styles.recipeInfoContainer}>
        <Text style={styles.titleText}>{title}</Text>
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
              <Text style={styles.infoValueText}>{readyInMinutes} minutes</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

}
