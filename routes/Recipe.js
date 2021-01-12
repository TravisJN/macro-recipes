import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import RecipeHeader from '../components/RecipeHeader';
import Ingredients from '../components/Ingredients';
import Directions from '../components/Directions';
import Source from '../components/Source';
// import AllData from '../components/AllData';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  list: {
    height: '100%',
    width: '100%',
  },
});

export default function Recipe({ route }) {
  const { protein, fat, carbs, calories, item } = route.params;

  return (
    <View style={styles.container}>
      <RecipeHeader
        image={item.image}
        title={item.title}
        protein={protein}
        fat={fat}
        carbs={carbs}
        calories={calories}
        readyInMinutes={item.readyInMinutes}
      />

      <ScrollView
        style={styles.list}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator ={false}
      >
        <Ingredients ingredients={item.extendedIngredients} />
        <Directions directions={item.analyzedInstructions?.[0]?.steps} />
        <Source data={item} />
        {/* <AllData data={item} /> */}
      </ScrollView>
    </View>
  );
}
