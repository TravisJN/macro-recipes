import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import emitter from 'tiny-emitter/instance';
import Store from '../data/Store';

const model = Store.getInstance();

export default function Directions({id}) {
  const [isExpanded, setExpanded] = useState(false);
  const [directions, setDirections] = useState([]);

  const onExpand = () => {
    setExpanded(!isExpanded);
    if (!directions?.length) {
      emitter.on('onDirectionsSuccess', onSuccess);
      model.fetchRecipeDirections(id);
    }
  }

  const onSuccess = (result) => {
    console.log(result);
    setDirections(result?.[0]?.steps);
    emitter.off('onDirectionsSuccess', onSuccess);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text>Directions</Text>
        <Text>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        directions.map((step) => {
          return (
            <View style={styles.ingredientContainer} key={step.id} >
              <Text style={styles.ingredientText}>{step.step}</Text>
            </View>
          );
        })
      }
    </View>
  )
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
    width: '90%',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    padding: 5,
  },
  ingredientContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
  },
  expandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
