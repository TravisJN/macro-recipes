import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Source({data}) {
  const [isExpanded, setExpanded] = useState(false);
  const keys = Object.keys(data);

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text>Source</Text>
        <Text>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        keys.map((key) => {
          const element = data[key];
          return (
            <View style={styles.dataItemContainer} key={key} >
              <Text style={styles.dataItemText}>{`${key}: ${element}`}</Text>
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
  dataItemContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  dataItemText: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
  },
  expandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
