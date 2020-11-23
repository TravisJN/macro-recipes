import React, { useReducer } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Store from '../data/Store';

const model = Store.getInstance();

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


export default function Home({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {});
  const {
    minProtein,
    minFat,
    minCarbs,
    minCalories,
    maxProtein,
    maxFat,
    maxCarbs,
    maxCalories,
  } = state;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            onChangeText={text => dispatch({ type: 'MIN_PROTEIN', payload: text })}
            value={minProtein}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MAX_PROTEIN', payload: text })}
            value={maxProtein}
            placeholder="Max"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Fat (g):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MIN_FAT', payload: text })}
            value={minFat}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MAX_FAT', payload: text })}
            value={maxFat}
            placeholder="Max"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Carbs (g):
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MIN_CARBS', payload: text })}
            value={minCarbs}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MAX_CARBS', payload: text })}
            value={maxCarbs}
            placeholder="Max"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Calories:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MIN_CALORIES', payload: text })}
            value={minCalories}
            placeholder="Min"
          />
          <Text style={{marginLeft: 10, marginRight: 10}}>-</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch({ type: 'MAX_CALORIES', payload: text })}
            value={maxCalories}
            placeholder="Max"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log(`maxProtein: ${minProtein}-${maxProtein}, maxFat: ${minFat}-${maxFat}, maxCarbs: ${minCarbs}-${maxCarbs}, maxCalories: ${minCalories}-${maxCalories}`);
          model.fetchRecipes({ minProtein, minFat, minCarbs, minCalories, maxProtein, maxFat, maxCarbs, maxCalories });
          navigation.navigate('Results', {
            searchParams: { minProtein, minFat, minCarbs, minCalories, maxProtein, maxFat, maxCarbs, maxCalories }
          });
        }}
      >
        <Text style={{ fontFamily: 'Avenir Next', fontSize: 18 }}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'MIN_PROTEIN':
      return {
        ...state,
        minProtein: action.payload,
      }
    case 'MAX_PROTEIN':
      return {
        ...state,
        maxProtein: action.payload,
      };
    case 'MIN_FAT':
      return {
        ...state,
        minFat: action.payload,
      };
    case 'MAX_FAT':
      return {
        ...state,
        maxFat: action.payload,
      };
    case 'MIN_CARBS':
      return {
        ...state,
        minCarbs: action.payload,
      };
    case 'MAX_CARBS':
      return {
        ...state,
        maxCarbs: action.payload,
      };
    case 'MIN_CALORIES':
      return {
        ...state,
        minCalories: action.payload,
      }
    case 'MAX_CALORIES':
      return {
        ...state,
        maxCalories: action.payload,
      };
    default:
      return state;
  }
}
