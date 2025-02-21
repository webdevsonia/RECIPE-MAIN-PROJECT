import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../Redux/recipeReducer";
import { GiCook, GiMeal } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { FaImage, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RecipeForm.css";

const RecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [chef, setChef] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [description, setDescription] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Recipe name is required!";
    if (!chef) errors.chef = "Chef name is required!";
    if (!imageUrl) errors.imageUrl = "Image URL is required!";
    if (!cuisine) errors.cuisine = "Cuisine type is required!";
    if (!description) errors.description = "Description is required!";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    
    dispatch(addRecipe({ 
      name, 
      chef, 
      imageUrl, 
      category: cuisine, 
      description 
    }));

    
    setName("");
    setChef("");
    setImageUrl("");
    setCuisine("");
    setDescription("");
    navigate("/recipe-list");
  };

  return (
    <div className="recipe-form-container">
      <div className="recipe-card">
        <h2 className="title">Add Your Recipe 🍽️</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <GiMeal className="icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Recipe Name"
            />
          </div>
          {formErrors.name && <small className="error">{formErrors.name}</small>}

          <div className="input-box">
            <GiCook className="icon" />
            <input
              type="text"
              value={chef}
              onChange={(e) => setChef(e.target.value)}
              placeholder="Chef Name"
            />
          </div>
          {formErrors.chef && <small className="error">{formErrors.chef}</small>}

          <div className="input-box">
            <MdFastfood className="icon" />
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Cuisine Type"
            />
          </div>
          {formErrors.cuisine && <small className="error">{formErrors.cuisine}</small>}

          <div className="input-box">
            <FaClipboardList className="icon" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description"
            ></textarea>
          </div>
          {formErrors.description && <small className="error">{formErrors.description}</small>}

          <div className="input-box">
            <FaImage className="icon" />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
            />
          </div>
          {formErrors.imageUrl && <small className="error">{formErrors.imageUrl}</small>}

          <button type="submit" className="submit-btn">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
