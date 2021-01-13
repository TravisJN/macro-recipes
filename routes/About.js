import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutText: {
    fontFamily: 'Avenir Next',
    fontSize: 28,
    color: '#21282f',
    fontWeight: '400',
  },
  contactText: {
    fontSize: 18,
    color: '#21282f',
    fontWeight: '400',
  },
})

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>Created by Travis Neufeld</Text>
      <Text style={styles.contactText}>travisneufeld.com</Text>
      <Text style={styles.contactText}>travis.neufeld@gmail.com</Text>
    </View>
  );
}
