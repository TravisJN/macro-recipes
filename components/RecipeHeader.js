import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function RecipeHeader({ image, title, protein, fat, carbs, readyInMinutes }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.recipeImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.metadataContainer}>
          <Text style={styles.metadataText}>{`Protein: ${protein}`}</Text>
          <Text style={styles.metadataText}>{`Fat: ${fat}`}</Text>
          <Text style={styles.metadataText}>{`Carbs: ${carbs}`}</Text>
          <Text style={styles.metadataText}>{`⏱️: ${readyInMinutes} minutes`}</Text>
        </View>
      </View>
    </View>
  );
}

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
  titleContainer: {
    flex: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  metadataContainer: {
    flex: 1,
  },
  metadataText: {
    fontSize: 14,
  },
});
