import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Store from '../data/Store';

const model = Store.getInstance();

export default function Home({ navigation }) {
  const [protein, onChangeProtein] = useState('');
  const [fat, onChangeFat] = useState('');
  const [carbs, onChangeCarbs] = useState('');
  const [minProtein, onChangeMinProtein] = useState('');
  const [minFat, onChangeMinFat] = useState('');
  const [minCarbs, onChangeMinCarbs] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.inputLabel, { fontSize: 30, marginTop: 25 }]}>Macro Recipes</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Protein (g):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeMinProtein(text)}
            value={minProtein}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeProtein(text)}
            value={protein}
            placeholder="Max"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Fat (g):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeMinFat(text)}
            value={minFat}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeFat(text)}
            value={fat}
            placeholder="Max"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Carbs (g):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeMinCarbs(text)}
            value={minCarbs}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onChangeCarbs(text)}
            value={carbs}
            placeholder="Max"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log(`Protein: ${minProtein}-${protein}, Fat: ${minFat}-${fat}, Carbs: ${minCarbs}-${carbs}`);
          model.fetchRecipes({ minProtein, minFat, minCarbs, protein, fat, carbs });
          navigation.navigate('Results', {
            searchParams: { minProtein, minFat, minCarbs, protein, fat, carbs }
          });
        }}
      >
        <Text style={{ fontFamily: 'Avenir Next', fontSize: 18 }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingLeft: 5,
  },
  inputLabel: {
    fontFamily: 'Avenir Next',
    fontSize: 20,
    flex: 2,
    textAlign: 'center',
  },
  searchButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 125,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
