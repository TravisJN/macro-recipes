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
  dataItemContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  dataItemText: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
    color: '#21282f',
    fontWeight: '500',
    marginBottom: 10,
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

export default function Summary({ data }) {
  const [isExpanded, setExpanded] = useState(true);
  const parsedString = data.summary.replace( /(<([^>]+)>)/ig, '');

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text style={styles.headerText}>Summary</Text>
        <Text style={styles.headerText}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        <View style={styles.dataItemContainer} key={data.id}>
          <Text style={styles.dataItemText}>{parsedString}</Text>
        </View>
      }
    </View>
  )
}
