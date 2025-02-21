import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipe } from "../Redux/recipeReducer";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipes = useSelector((state) => state.recipes.recipes);
  const recipeToUpdate = recipes.find((recipe) => recipe.id === id);

  const [name, setName] = useState("");
  const [chef, setChef] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState(""); 
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!recipeToUpdate) {
      navigate("/recipe-list");
    } else {
      
      setName(recipeToUpdate?.name || "");
      setChef(recipeToUpdate?.chef || "");
      setImageUrl(recipeToUpdate?.imageUrl || "");
      setCategory(recipeToUpdate?.category || ""); 
      setDescription(recipeToUpdate?.description || "");
    }
  }, [recipeToUpdate, navigate]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && chef && category && description) {
      const updatedRecipe = { name, chef, imageUrl, category, description };
      dispatch(updateRecipe(id, updatedRecipe)); 
      navigate("/recipe-list");
    }
  };

  
  if (!recipeToUpdate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
      <div className="card shadow-sm border-0 rounded-3 p-4 w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 text-dark" style={{ fontFamily: "'Roboto', sans-serif" }}>Update Recipe</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3 w-100">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Recipe Name"
                className="form-control rounded-3"
                required
              />
            </div>
            <div className="mb-3 w-100">
              <input
                type="text"
                value={chef}
                onChange={(e) => setChef(e.target.value)}
                placeholder="Chef Name"
                className="form-control rounded-3"
                required
              />
            </div>
            <div className="mb-3 w-100">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="form-control rounded-3"
              />
            </div>
            <div className="mb-3 w-100">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
                placeholder="Category"
                className="form-control rounded-3"
                required
              />
            </div>
            <div className="mb-3 w-100">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short Description"
                className="form-control rounded-3"
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3 py-2 rounded-3">
              Update Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
