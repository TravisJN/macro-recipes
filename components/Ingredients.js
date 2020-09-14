import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Ingredients({ingredients}) {
  const [isExpanded, setExpanded] = useState(true);

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text>Ingredients</Text>
        <Text>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        ingredients.map((ingredient) => {
          return (
            <View style={styles.ingredientContainer} key={ingredient.id} >
              <Text style={styles.ingredientText}>{ingredient.originalString}</Text>
            </View>
          );
        })
      }
    </View>
  )
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
