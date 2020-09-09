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
      emitter.on('success', onSuccess);

      return () => {
        // Do something when this view is blurred (unsubscribe)
        emitter.off('success', onSuccess);
      };
    }, [])
  );

  const renderSearchResultItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.listItemContainer}>
        <View style={styles.listItemHeaderContainer}>
          <Text style={styles.recipeTitleText}>{item.title}</Text>
        </View>
        <View style={styles.listItemInfoContainer}>
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
          <View style={styles.recipeInfoContainer}>
            <Text>{`Protein: ${searchParams.protein}`}</Text>
            <Text>{`Fat: ${searchParams.fat}`}</Text>
            <Text>{`Carbs: ${searchParams.carbs}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.searchParamsText}>{`Protein: ${searchParams.protein} Fat: ${searchParams.fat} Carbs: ${searchParams.carbs}`}</Text>
      </View>
      <View style={styles.listContainer}>
        { state.isLoading && <ActivityIndicator size="large" /> }
        { !state.isLoading &&
          <FlatList
            style={{width: '100%'}}
            data={state.results}
            renderItem={renderSearchResultItem}
            keyExtractor={item => item.id.toString()}
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
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchParamsText: {
    fontSize: 18
  },
  listContainer: {
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
  },
  recipeInfoContainer: {
    flex: 2,
    justifyContent: 'center',
  }
});
