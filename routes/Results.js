import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import emitter from 'tiny-emitter/instance';
import Store from '../data/Store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchResultItem from '../components/SearchResultItem';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    padding: 5,
  },
  searchParamsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
  footerContainer: {
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21282f',
  },
  metadataText: {
    fontSize: 16,
    color: '#21282f',
    marginLeft: 10,
    marginTop: 10,
  },
  errorMessageText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#21282f',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default function Results({ route, navigation }) {
  const model = Store.getInstance();
  const { searchParams } = route.params;
  const initialState = {
    results: [],
    isLoading: model.isFetching,
    isError: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSuccess = (response) => {
    dispatch({ type: 'resultsReceived', response });
  };

  const onError = ({error}) => {
    dispatch({ type: 'error', error });
  }

  useFocusEffect(
    useCallback(() => {
      // Do something when this view is focused
      emitter.on('onRecipesSuccess', onSuccess);
      emitter.on('error', onError);

      return () => {
        // Do something when this view is blurred (unsubscribe)
        emitter.off('onRecipesSuccess', onSuccess);
        emitter.off('error', onError);
      };
    }, [])
  );

  const onSelectRecipe = (item) => {
    // TODO: just pass item
    const { id, protein, fat, carbs, calories } = item;
    navigation.navigate(
      'Recipe',
      {
        id,
        protein,
        fat,
        carbs,
        calories,
        item,
      }
    );
  }

  const renderListFooter = () => {
    const { minProtein, maxProtein, minFat, maxFat, minCarbs, maxCarbs, minCalories, calories } = searchParams;
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {
            model.fetchPreviousRecipes({ minProtein, maxProtein, minFat, maxFat, minCarbs, maxCarbs, minCalories, calories });
            dispatch({ type: 'startFetch' });
          }}
        >
          <Text style={styles.footerText}>{'\< Previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            model.fetchNextRecipes({ minProtein, maxProtein, minFat, maxFat, minCarbs, maxCarbs, minCalories, calories });
            dispatch({ type: 'startFetch' });
          }}
        >
          <Text style={styles.footerText}>{'Next \>'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getNutrientString = (min, max, omitG) => {
    const unitString = omitG ? '' : 'g';

    if (min && max) {
      return `${min}${unitString} - ${max}${unitString}`;
    } else if (min) {
      return `${min}${unitString}+`;
    } else if (max) {
      return `0${unitString} - ${max}${unitString}`;
    }
    return null;
  }

  const { minProtein, maxProtein, minFat, maxFat, minCarbs, maxCarbs, minCalories, calories, query } = searchParams;
  const proteinString = getNutrientString(minProtein, maxProtein);
  const fatString = getNutrientString(minFat, maxFat);
  const carbsString = getNutrientString(minCarbs, maxCarbs);
  const caloriesString = getNutrientString(minCalories, calories, true);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchParamsContainer}>
          {!!proteinString &&
            <Text style={styles.metadataText}>
              <Text>Protein: </Text>
              <Text style={{ fontWeight: '600' }}>{proteinString}</Text>
            </Text>
          }
          {!!fatString &&
            <Text style={styles.metadataText}>
              <Text>Fat: </Text>
              <Text style={{ fontWeight: '600' }}>{fatString}</Text>
            </Text>
          }
          {!!carbsString &&
            <Text style={styles.metadataText}>
              <Text>Carbs: </Text>
              <Text style={{ fontWeight: '600' }}>{carbsString}</Text>
            </Text>
          }
          {!!caloriesString &&
            <Text style={styles.metadataText}>
              <Text>Calories: </Text>
              <Text style={{ fontWeight: '600' }}>{caloriesString}</Text>
            </Text>
          }
          {!!query &&
            <Text style={styles.metadataText}>
              <Text>Ingredients: </Text>
              <Text style={{ fontWeight: '600' }}>{query}</Text>
            </Text>
          }
        </View>
      </View>
      <View style={styles.listContainer}>
        { state.isLoading &&
          <ActivityIndicator style={{ marginTop: 'auto', marginBottom: 'auto' }} size="large" />
        }

        { state.isError &&
          <Text style={styles.errorMessageText}>Oops! Something went wrong. Please try again.</Text>
        }

        { (!state.isLoading && !state.isError) &&
          <FlatList
            style={{ width: '95%' }}
            data={state.results}
            renderItem={({item}) => <SearchResultItem item={item} onSelectRecipe={onSelectRecipe} />}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={renderListFooter}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
    </View>
  );
};

function reducer(state, action) {
  switch(action.type) {
    case 'resultsReceived':
      const searchResults = action?.response?.results;
      return {
        ...state,
        results: searchResults || [],
        isLoading: false,
        isError: false,
      };
    case 'startFetch':
      return {
        ...state,
        results: [],
        isLoading: true,
        isError: false,
      }
    case 'error':
      return {
        ...state,
        results: [],
        isLoading: false,
        isError: true,
      }
    default:
      return state;
  }
}
