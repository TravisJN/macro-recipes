import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

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

export default function Source({data}) {
  const [isExpanded, setExpanded] = useState(false);

  const onExpand = () => {
    setExpanded(!isExpanded);
  }

  const handleLink = () => {
    WebBrowser.openBrowserAsync(data.sourceUrl);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandHeader} onPress={onExpand}>
        <Text style={styles.headerText}>Source</Text>
        <Text style={styles.headerText}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isExpanded &&
        <View style={styles.dataItemContainer} key={data.id}>
          <Text style={styles.dataItemText}>{`From: ${data.sourceName || data.creditsText}`}</Text>
          <Text style={[styles.dataItemText, { color: 'blue' }]} onPress={handleLink}>{data.sourceUrl}</Text>
          <Text style={styles.dataItemText}>*All app data sourced from Spoonacular API</Text>
        </View>
      }
    </View>
  )
}
