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
  headerText: {
    fontFamily: 'Avenir Next',
    fontSize: 30,
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
    width: '85%',
  },
  inputFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 2,
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
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
    paddingRight: 15,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 125,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
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
    query,  // Ingredients (API query key)
  } = state;

  const handleSearch = () => {
    console.log(`Protein: ${minProtein}-${maxProtein}, Fat: ${minFat}-${maxFat}, Carbs: ${minCarbs}-${maxCarbs}, Calories: ${minCalories}-${maxCalories}`);

    // Remove null params (messes up the API)
    let formattedParams = { ...state };
    Object.keys(formattedParams).forEach((key) => {
      !formattedParams[key] && delete formattedParams[key];
    });

    if (Object.keys(formattedParams).length > 0) {
      model.fetchRecipes(formattedParams);
      navigation.navigate('Results', { searchParams: formattedParams });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Macro Recipes</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Protein (g):
          </Text>
          <View style={styles.inputFieldsContainer}>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Fat (g):
          </Text>
          <View style={styles.inputFieldsContainer}>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Carbs (g):
          </Text>
          <View style={styles.inputFieldsContainer}>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Calories:
          </Text>
          <View style={styles.inputFieldsContainer}>
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Ingredients:
          </Text>
          <View style={styles.inputFieldsContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => dispatch({ type: 'INGREDIENTS', payload: text })}
              value={query}
              placeholder="Chicken, Pasta..."
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
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
    case 'INGREDIENTS':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
}
