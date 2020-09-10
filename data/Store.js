import api from '../private/api';
import emitter from 'tiny-emitter/instance';

export default class Store {
  static RECIPES_URL = "https://api.spoonacular.com/recipes/findByNutrients?";
  static RECIPE_URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&`;
  static API_KEY = api.key;

  static storeInstance = null;

  static getInstance() {
    if (Store.storeInstance === null) {
      Store.storeInstance = new Store();
    }
    return Store.storeInstance;
  }

  mResults = null;
  mIsFetching = false;

  get hasData() {
    return !!this.mResults;
  }

  get isFetching() {
    return this.mIsFetching;
  }

  fetchRecipes = async ({ protein, fat, carbs }) => {
    this.mIsFetching = true;
    this.mResults = null;

    try {
      const params = new URLSearchParams({
        apiKey: Store.API_KEY,
        maxProtein: protein,
        maxFat: fat,
        maxCarbs: carbs,
      });
      console.log('making request:', Store.RECIPES_URL + params);
      const response = await fetch(Store.RECIPES_URL + params);
      const result = await response.json();
      this.mResults = result;
      emitter.emit('success', result);
    } catch(e) {
      console.log('Error fetching recipes', e);
      emitter.emit('error', {error: e});
    }

    this.mIsFetching = false;
  }

  fetchRecipe = async (id) => {
    this.mIsFetching = true;

    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&`;

    try {
      const params = new URLSearchParams({
        apiKey: Store.API_KEY,
      });
      console.log('making request:', url + params);
      const response = await fetch(url + params);
      const result = await response.json();
      emitter.emit('success', result);
    } catch(e) {
      console.log(`Error fetching recipe id ${id}`, e);
      emitter.emit('error', {error: e});
    }

    this.mIsFetching = false;
  }
};