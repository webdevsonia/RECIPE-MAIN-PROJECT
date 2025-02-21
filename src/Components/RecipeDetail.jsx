import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes } from "../Redux/recipeReducer";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === id);
    setRecipe(foundRecipe || null);
  }, [recipes, id]);

  if (!recipe) {
    return <p className="not-found">Recipe not found.</p>;
  }

  return (
    <div className="recipe-page">
      <header className="recipe-header">
        <h1 className="recipe-title">{recipe.name}</h1>
        <p className="recipe-meta">By {recipe.chef} | {recipe.cuisine} | ⏳ {recipe.preparationTime} mins</p>
      </header>

      {recipe.imageUrl && (
        <div className="recipe-image-wrapper">
          <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
        </div>
      )}

      <main className="recipe-body">
        <h2>Description</h2>
        <p>{recipe.description || "No description available."}</p>
      </main>

      <footer className="recipe-footer">
        <button className="back-button" onClick={() => navigate(-1)}>⬅️ Back</button>
      </footer>
    </div>
  );
};

export default RecipeDetail;
