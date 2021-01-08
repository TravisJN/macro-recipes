import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#21282f',
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
    color: '#21282f',
    fontWeight: '500',
  },
  expandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: '600',
    color: '#21282f',
    fontSize: 16,
  },
});

export default function Ingredients({ingredients}) {
  const [isExpanded, setExpanded] = useState(true);

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text style={styles.headerText}>Ingredients</Text>
        <Text style={styles.headerText}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        ingredients.map((ingredient) => {
          return (
            <View style={styles.ingredientContainer} key={ingredient.id} >
              <Text style={styles.ingredientText}>• {ingredient.originalString}</Text>
            </View>
          );
        })
      }
    </View>
  )
}
