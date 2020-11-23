import api from '../private/api';
import emitter from 'tiny-emitter/instance';

//https://spoonacular.com/food-api/docs

export default class Store {
  static RECIPES_URL = "https://api.spoonacular.com/recipes/findByNutrients?";
  // static RECIPE_URL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&`;
  static API_KEY = api.key;
  static NUM_RESULTS = 10;

  static storeInstance = null;

  static getInstance() {
    if (Store.storeInstance === null) {
      Store.storeInstance = new Store();
    }
    return Store.storeInstance;
  }

  mResults = null;
  mIsFetching = false;
  mIsMockData = false;  // set to true to use mock data
  mOffset = 0;

  get hasData() {
    return !!this.mResults;
  }

  get isFetching() {
    return this.mIsFetching;
  }

  fetchNextRecipes = async (params) => {
    this.mOffset = this.mOffset + 1;
    await this.fetchRecipes(params);
  }

  fetchPreviousRecipes = async (params) => {
    if (this.mOffset > 0) {
      this.mOffset = this.mOffset - 1;
    }
    await this.fetchRecipes(params);
  }

  fetchRecipes = async (searchParams) => {
    this.mIsFetching = true;
    this.mResults = null;

    if (this.mIsMockData) {
      setTimeout(() => {
        this.mResults = require('./mockRecipesList.json');
        emitter.emit('onRecipesSuccess', this.mResults);
      }, 10);
    } else {
      try {
        const searchParamObject = {
          ...searchParams,
          apiKey: Store.API_KEY,
          number: Store.NUM_RESULTS,
          offset: Store.NUM_RESULTS * this.mOffset,
        };
        const params = new URLSearchParams(searchParamObject);
        console.log('making request:', Store.RECIPES_URL + params);
        const response = await fetch(Store.RECIPES_URL + params);
        const result = await response.json();
        this.mResults = result;
        emitter.emit('onRecipesSuccess', result);
      } catch(e) {
        console.log('Error fetching recipes', e);
        emitter.emit('error', {error: e});
      }
    }

    this.mIsFetching = false;
  }

  fetchRecipe = async (id) => {
    this.mIsFetching = true;

    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&`;

    if (this.mIsMockData) {
      setTimeout(() => {
        const result = require('./mockRecipe.json');
        emitter.emit('onRecipeSuccess', result);
      }, 10);
    } else {
      try {
        const params = new URLSearchParams({
          apiKey: Store.API_KEY,
        });
        console.log('making request:', url + params);
        const response = await fetch(url + params);
        const result = await response.json();
        emitter.emit('onRecipeSuccess', result);
      } catch(e) {
        console.log(`Error fetching recipe id ${id}`, e);
        emitter.emit('error', {error: e});
      }
    }

    this.mIsFetching = false;
  }

  fetchRecipeDirections = async (id) => {
    this.mIsFetching = true;

    const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?`;

    if (this.mIsMockData) {
      setTimeout(() => {
        const result = require('./mockDirections.json');
        emitter.emit('onDirectionsSuccess', result);
      }, 10);
    } else {
      try {
        const params = new URLSearchParams({
          apiKey: Store.API_KEY,
        });
        console.log('making request: ', url + params);
        const response = await fetch(url + params);
        const result = await response.json();
        emitter.emit('onDirectionsSuccess', result);
      } catch(e) {
        console.log(`Error fetching recipe directions for id: ${id} `, e);
        emitter.emit('error', { error: e });
      }
    }

    this.mIsFetching = false;
  }
};
