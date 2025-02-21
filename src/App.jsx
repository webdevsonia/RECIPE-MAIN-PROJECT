import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import RecipeForm from "./Components/RecipeForm";
import RecipeList from "./Components/RecipeList";
import Header from "./Components/Header";
import UpdateRecipePage from "./Components/UpdateRecipePage"; 
import Login from "./Components/Login";
import Register from "./Components/Register";
import RecipeDetail from "./Components/RecipeDetail"; 
import { auth } from "./Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login"); 
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const hideHeader = location.pathname === "/login" || location.pathname === "/register" || location.pathname.startsWith("/recipe/");

  return (
    <div>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/recipe-form" element={user ? <RecipeForm /> : <Login />} />
        <Route path="/recipe-list" element={user ? <RecipeList /> : <Login />} />
        <Route path="/update-recipe/:id" element={user ? <UpdateRecipePage /> : <Login />} /> 
        <Route path="/recipe/:id" element={user ? <RecipeDetail /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
