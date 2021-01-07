import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
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
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchParamsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  searchParamsText: {
    fontSize: 18
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
    height: 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metadataText: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default function Results({ route, navigation }) {
  const model = Store.getInstance();
  const { searchParams } = route.params;
  const initialState = {
    results: [],
    isLoading: model.isFetching,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSuccess = (response) => {
    dispatch({ type: 'resultsReceived', response });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when this view is focused
      emitter.on('onRecipesSuccess', onSuccess);

      return () => {
        // Do something when this view is blurred (unsubscribe)
        emitter.off('onRecipesSuccess', onSuccess);
      };
    }, [])
  );

  const onSelectRecipe = ({ id, protein, fat, carbs, calories }) => {
    model.fetchRecipe(id);
    navigation.navigate(
      'Recipe',
      {
        id,
        protein,
        fat,
        carbs,
        calories,
      }
    );
  }

  const renderSearchResultItem = ({item}) => {
    const { title, image, protein, fat, carbs, calories } = item;
    console.log(item.title);
    return (
      <TouchableOpacity style={styles.listItemContainer} onPress={() => onSelectRecipe(item)}>
        <View style={styles.listItemHeaderContainer}>
          <Text style={styles.recipeTitleText}>{title}</Text>
        </View>
        <View style={styles.listItemInfoContainer}>
          <Image source={{ uri: image }} style={styles.recipeImage} />
          <View style={styles.recipeInfoContainer}>
            <Text>{`Protein: ${protein}`}</Text>
            <Text>{`Fat: ${fat}`}</Text>
            <Text>{`Carbs: ${carbs}`}</Text>
            <Text>{`Calories: ${calories}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListFooter = () => {
    const { minFat, fat, minProtein, protein, minCarbs, carbs, minCalories, calories } = searchParams;
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {
            model.fetchPreviousRecipes({ minFat, fat, minProtein, protein, minCarbs, carbs, minCalories, calories });
            dispatch({type: 'startFetch'});
          }}
        >
          <Text style={styles.footerText}>{'\< Previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            model.fetchNextRecipes({ minFat, fat, minProtein, protein, minCarbs, carbs, minCalories, calories });
            dispatch({type: 'startFetch'});
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
      return `${min}${unitString} - Max`;
    } else if (max) {
      return `0${unitString} - ${max}${unitString}`;
    }
    return null;
  }

  const { minProtein, protein, minFat, fat, minCarbs, carbs, minCalories, calories, query } = searchParams;
  const proteinString = getNutrientString(minProtein, protein);
  const fatString = getNutrientString(minFat, fat);
  const carbsString = getNutrientString(minCarbs, carbs);
  const caloriesString = getNutrientString(minCalories, calories, true);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchParamsContainer}>
          {!!proteinString ? <Text style={styles.metadataText}>{`Protein: ${proteinString}`}</Text> : null}
          {!!fatString ? <Text style={styles.metadataText}>{`Fat: ${fatString}`}</Text> : null}
        </View>
        <View style={styles.searchParamsContainer}>
          {!!carbsString ? <Text style={styles.metadataText}>{`Carbs: ${carbsString}`}</Text> : null}
          {!!caloriesString ? <Text style={styles.metadataText}>{`Calories: ${caloriesString}`}</Text> : null}
        </View>
        <View style={styles.searchParamsContainer}>
          {!!query && <Text style={styles.metadataText}>{`Ingredients: ${query}`}</Text>}
        </View>
      </View>
      <View style={styles.listContainer}>
        { state.isLoading && <ActivityIndicator size="large" /> }
        { !state.isLoading &&
          <FlatList
            style={{ width: '95%' }}
            data={state.results}
            renderItem={({item}) => <SearchResultItem item={item} onSelectRecipe={onSelectRecipe} />}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={renderListFooter}
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
      };
    case 'startFetch':
      return {
        ...state,
        results: [],
        isLoading: true,
      }
    default:
      return state;
  }
}
