import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import emitter from 'tiny-emitter/instance';
import Store from '../data/Store';

const model = Store.getInstance();

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
    marginRight: 10,
    flexDirection: 'row',
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

export default function Directions({id}) {
  const [isExpanded, setExpanded] = useState(false);
  const [directions, setDirections] = useState([]);
  const hasData = isExpanded && directions && directions.length;

  const onExpand = () => {
    setExpanded(!isExpanded);
    if (!directions?.length) {
      emitter.on('onDirectionsSuccess', onSuccess);
      model.fetchRecipeDirections(id);
    }
  }

  const onSuccess = (result) => {
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
        directions?.map((step) => {
          return (
            <View style={styles.ingredientContainer} key={step.number} >
              <Text style={styles.ingredientText}>{step.number}</Text>
              <Text style={[styles.ingredientText, {marginLeft: 5}]}>{step.step}</Text>
            </View>
          );
        })
      }
    </View>
  )
}
