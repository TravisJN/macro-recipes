import React, { useReducer } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import emitter from 'tiny-emitter/instance';
import Store from '../data/Store';

export default function Results({ route, navigation }) {
  const model = Store.getInstance();
  const { searchParams } = route.params;
  const initialState = {
    results: null,
    isLoading: model.isFetching,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  emitter.on('success', (results) => {
    dispatch({ type: 'resultsReceived', results });
  });

  return (
    <View>
      <Text>{`Protein: ${searchParams.protein} Fat: ${searchParams.fat} Carbs: ${searchParams.carbs}`}</Text>
      { state.isLoading && <ActivityIndicator size="large" /> }
      { state.results &&
        <FlatList
          data={state.results}
          renderItem={({item}) => <Text>recipe: {item.title}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      }
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