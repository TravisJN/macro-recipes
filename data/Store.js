import api from '../private/api';
import emitter from 'tiny-emitter/instance';

//https://spoonacular.com/food-api/docs

export default class Store {
  static RECIPES_URL = 'https://api.spoonacular.com/recipes/findByNutrients?';
  static RECIPES_WITH_INGREDIENTS_URL = 'https://api.spoonacular.com/recipes/complexSearch?'
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

  parseRecipesResponse = (response) => {
    // A little messy, format response object
    return response.results.map((item) => {
      const { nutrition } = item;
      nutrition.nutrients.forEach((nutrient) => {
        let key = nutrient.title.toLowerCase();
        if (key === 'carbohydrates') {
          key = 'carbs';
        }
        item[key] = Math.floor(nutrient.amount);
      });
      return item;
    });
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
        // Remove null params (messes up the API)
        let formattedParams = { ...searchParams };
        Object.keys(formattedParams).forEach((key) => {
          !formattedParams[key] && delete formattedParams[key];
        });

        if (Object.keys(formattedParams).length > 0) {
          const url = Store.RECIPES_WITH_INGREDIENTS_URL;
          const searchParamObject = {
            ...formattedParams,
            apiKey: Store.API_KEY,
            number: Store.NUM_RESULTS,
            offset: Store.NUM_RESULTS * this.mOffset,
            addRecipeNutrition: true,
            fillIngredients: true,
          };
          const params = new URLSearchParams(searchParamObject);
          console.log('making request:', url + params);
          const response = await fetch(url + params);
          const result = await response.json();
          // console.log(result);
          this.mResults = this.parseRecipesResponse(result);
          emitter.emit('onRecipesSuccess', result);
        } else {
          throw new Error({ error: 'Invalid search params' });
        }
      } catch(e) {
        console.log('Error fetching recipes', e);
        emitter.emit('error', {error: e});
      }
    }

    this.mIsFetching = false;
  }
};
