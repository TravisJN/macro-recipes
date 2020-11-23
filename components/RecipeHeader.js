import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '20%',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
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
  },
  metadataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metadataText: {
    fontSize: 14,
  },
  nutrientsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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

  const getProteinText = (protein) => {
    if (protein) {
      return <Text style={styles.metadataText}>{`Protein: ${protein}`}</Text>;
    }
  }
  const getFatText = (fat) => {
    if (fat) {
      return <Text style={styles.metadataText}>{`Fat: ${fat}`}</Text>;
    }
  }
  const getCarbsText = (carbs) => {
    if (carbs) {
      return <Text style={styles.metadataText}>{`Carbs: ${carbs}`}</Text>;
    }
  }
  const getCaloriesText = (calories) => {
    if (calories) {
      return <Text style={styles.metadataText}>{`Calories: ${calories}`}</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.metadataContainer}>
          <View style={styles.nutrientsContainer}>
            {getProteinText(protein)}
            {getFatText(fat)}
          </View>
          <View style={styles.nutrientsContainer}>
            {getCarbsText(carbs)}
            {getCaloriesText(calories)}
          </View>
          <Text style={styles.metadataText}>{`⏱️: ${readyInMinutes} minutes`}</Text>
        </View>
      </View>
    </View>
  );

}
