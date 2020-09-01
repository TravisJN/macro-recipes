import api from '../private/api';
import emitter from 'tiny-emitter/instance';

export default class Store {
  static URL = "https://api.spoonacular.com/recipes/findByNutrients?";
  static API_KEY = api.key;

  fetchRecipe = async ({ protein, fat, carbs }) => {
    try {
      const params = new URLSearchParams({
        apiKey: Store.API_KEY,
        maxProtein: protein,
        maxFat: fat,
        maxCarbs: carbs,
      });
      console.log('making request:', Store.URL + params);
      let response = await fetch(Store.URL + params);
      const result = await response.json();
      console.log('success! result: ', result);
      // emitter.emit('success', {result});
    } catch(e) {
      console.log('Error fetching recipes', e);
      // emitter.emit('error', {error: e});
    }
  }
};
