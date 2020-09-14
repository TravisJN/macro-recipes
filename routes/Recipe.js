import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import emitter from 'tiny-emitter/instance';
import RecipeHeader from '../components/RecipeHeader';
import Ingredients from '../components/Ingredients';
import Directions from '../components/Directions';

export default function Recipe({ route, navigation }) {
  const { protein, fat, carbs, id } = route.params;
  const initialState = {
    results: [],
    isLoading: true,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results, isLoading } = state;

  const onSuccess = (results) => {
    dispatch({ type: 'resultsReceived', results });
  };

  useFocusEffect(
    useCallback(() => {
      // Subscribe to this event when this view is focused
      emitter.on('onRecipeSuccess', onSuccess);

      return () => {
        // Do something when this view is blurred (unsubscribe)
        emitter.off('onRecipeSuccess', onSuccess);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      { isLoading && <ActivityIndicator size="large" /> }
      { !isLoading &&
        <>
          <RecipeHeader
            image={results.image}
            title={results.title}
            protein={protein}
            fat={fat}
            carbs={carbs}
            readyInMinutes={results.readyInMinutes}
          />

          <ScrollView style={styles.list} contentContainerStyle={{alignItems: 'center'}}>
            <Ingredients ingredients={results.extendedIngredients} />
            <Directions id={id} />
          </ScrollView>
        </>
      }
    </View>
  );
}

function reducer(state, action) {
  switch(action.type) {
    case 'resultsReceived':
      return {
        ...state,
        results: action.results,
        isLoading: false,
      };
    default:
      return state;
  }
}

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
