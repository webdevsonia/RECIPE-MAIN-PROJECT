import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";


const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
const ADD_RECIPE_SUCCESS = "ADD_RECIPE_SUCCESS";
const DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS";
const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";


export const fetchRecipes = () => async (dispatch, getState) => {
  const querySnapshot = await getDocs(collection(db, "recipes"));
  const fetchedRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const currentRecipes = getState().recipes.recipes; 

  
  if (JSON.stringify(currentRecipes) !== JSON.stringify(fetchedRecipes)) {
    dispatch({ type: FETCH_RECIPES_SUCCESS, payload: fetchedRecipes });
  }
};

export const addRecipe = (recipe) => async (dispatch, getState) => {
  const docRef = await addDoc(collection(db, "recipes"), recipe);
  const newRecipe = { id: docRef.id, ...recipe };

  
  const currentRecipes = getState().recipes.recipes;
  if (!currentRecipes.some(r => r.id === newRecipe.id)) {
    dispatch({ type: ADD_RECIPE_SUCCESS, payload: newRecipe });
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "recipes", id));
  dispatch({ type: DELETE_RECIPE_SUCCESS, payload: id });
};

export const updateRecipe = (id, updatedRecipe) => async (dispatch) => {  
  const recipeRef = doc(db, "recipes", id);
  await updateDoc(recipeRef, updatedRecipe); 

  dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: { id, updatedRecipe } });
};


const initialState = {
  recipes: [],
};


const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return { ...state, recipes: action.payload };
      
    case ADD_RECIPE_SUCCESS:
      if (state.recipes.some(recipe => recipe.id === action.payload.id)) {
        return state; 
      }
      return { ...state, recipes: [...state.recipes, action.payload] };
      
    case DELETE_RECIPE_SUCCESS:
      return { ...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload) };
      
    case UPDATE_RECIPE_SUCCESS:  
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id
            ? { ...recipe, ...action.payload.updatedRecipe } 
            : recipe
        ),
      };
      
    default:
      return state;
  }
};

export default recipeReducer;
