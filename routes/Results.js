import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import emitter from 'tiny-emitter/instance';
import Store from '../data/Store';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Results({ route, navigation }) {
  const model = Store.getInstance();
  const { searchParams } = route.params;
  const initialState = {
    results: [],
    isLoading: model.isFetching,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSuccess = (results) => {
    dispatch({ type: 'resultsReceived', results });
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

  const onSelectRecipe = ({ id, protein, fat, carbs}) => {
    model.fetchRecipe(id);
    navigation.navigate(
      'Recipe',
      {
        id,
        protein,
        fat,
        carbs,
      }
    );
  }

  const renderSearchResultItem = ({item}) => {
    console.log(item);
    const { title, image, protein, fat, carbs, calories } = item;
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
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => console.log('previous pressed')}>
          <Text style={styles.footerText}>{'\< Previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('next pressed')}>
          <Text style={styles.footerText}>{'Next \>'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {!!searchParams.protein ? <Text style={styles.metadataText}>{`Protein: ${searchParams.protein}`}</Text> : null}
        {!!searchParams.fat ? <Text style={styles.metadataText}>{`Fat: ${searchParams.fat}`}</Text> : null}
        {!!searchParams.carbs ? <Text style={styles.metadataText}>{`Carbs: ${searchParams.carbs}`}</Text> : null}
      </View>
      <View style={styles.listContainer}>
        { state.isLoading && <ActivityIndicator size="large" /> }
        { !state.isLoading &&
          <FlatList
            style={{width: '100%'}}
            data={state.results}
            renderItem={renderSearchResultItem}
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
      return {
        ...state,
        results: action.results,
        isLoading: false,
      };
    default:
      return state;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchParamsText: {
    fontSize: 18
  },
  listContainer: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
  listItemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    height: 150,
    width: '100%',
  },
  recipeImage: {
    flex: 1,
    resizeMode: 'stretch',
    height: '85%',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  listItemInfoContainer: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  recipeTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeInfoContainer: {
    flex: 2,
    justifyContent: 'center',
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
});
