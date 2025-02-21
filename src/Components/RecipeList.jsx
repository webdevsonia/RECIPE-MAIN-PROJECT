import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../Redux/recipeReducer";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "./RecipeList.css";

const RecipeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.recipes);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const defaultCategories = [];

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    let updatedRecipes = [...recipes];

    
    if (searchQuery.trim()) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    if (selectedCategory !== "All Categories") {
      updatedRecipes = updatedRecipes.filter((recipe) => {
        const category = recipe.category?.trim() || recipe.cuisineType?.trim() || "Other";
        return category.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    
    if (sortOption === "name-asc") {
      updatedRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      updatedRecipes.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredRecipes(updatedRecipes);
  }, [searchQuery, sortOption, selectedCategory, recipes]);

  return (
    <div className="recipe-list-container">
      <h2 className="page-title">🍽️ Recipe Collection</h2>

      
      <div className="controls">
        
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        
        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      
      <div className="category-filter">
        <button
          className={`category-btn ${selectedCategory === "All Categories" ? "active" : ""}`}
          onClick={() => setSelectedCategory("All Categories")}
        >
          All Categories
        </button>
        {[...new Set([...defaultCategories, ...recipes.map((r) => r.category?.trim() || r.cuisineType?.trim() || "Other")])].map(
          (category, index) => (
            <button
              key={index}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>

      
      {filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              
              <div className="recipe-image-container">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipe-image"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>

              <h3 className="recipe-name">{recipe.name}</h3>

              
              <p className="recipe-category">
                <strong>Category:</strong> {recipe.category?.trim() || recipe.cuisineType?.trim() || "Other"}
              </p>

              <div className="button-group">
                <button className="btn view-btn" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                  <FaEye />
                </button>
                <button className="btn edit-btn" onClick={() => navigate(`/update-recipe/${recipe.id}`)}>
                  <FaEdit />
                </button>
                <button className="btn delete-btn" onClick={() => dispatch(deleteRecipe(recipe.id))}>
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recipes">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
