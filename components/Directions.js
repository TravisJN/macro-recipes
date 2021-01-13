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
    marginRight: 10,
    flexDirection: 'row',
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

export default function Directions({ directions }) {
  const [isExpanded, setExpanded] = useState(false);
  const renderDirections = isExpanded && directions?.length;
  const renderNoDataMessage = isExpanded && !(directions?.length);

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text style={styles.headerText}>Directions</Text>
        <Text style={styles.headerText}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {renderDirections &&
        directions?.map((step) => {
          return (
            <View style={styles.ingredientContainer} key={step.number} >
              <Text style={styles.ingredientText}>{step.number}</Text>
              <Text style={[styles.ingredientText, {marginLeft: 5}]}>{step.step}</Text>
            </View>
          );
        })
      }
      {renderNoDataMessage &&
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Oops! Looks like there are no directions for this recipe.
          You can try viewing the recipe's web page in the Source section or select a different recipe.
          Sorry for the inconvenience!
        </Text>
      }
    </View>
  )
}
