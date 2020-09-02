import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Store from '../data/Store';

const model = Store.getInstance();

export default function Home({ navigation }) {
  const [protein, onChangeProtein] = useState('');
  const [fat, onChangeFat] = useState('');
  const [carbs, onChangeCarbs] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.inputLabel, { fontSize: 30, marginTop: 25 }]}>Macro Recipes</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Protein:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeProtein(text)}
            value={protein}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Fat:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeFat(text)}
            value={fat}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Carbs:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeCarbs(text)}
            value={carbs}
          />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            console.log(`Protein: ${protein}, Fat: ${fat}, Carbs: ${carbs}`);
            model.fetchRecipe({ protein, fat, carbs });
            navigation.navigate('Results', {
              searchParams: { protein, fat, carbs }
            });
          }}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
  },
  inputLabel: {
    fontFamily: 'Avenir Next',
    fontSize: 20,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
});
