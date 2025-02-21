import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig"; 
import { signOut } from "firebase/auth";
import logo from "../assets/Images/logo.png";
import logoutimg from "../assets/Images/logout-icon.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fef6e4;
  padding: 15px 5rem;
  box-shadow: 0 5px 15px #0000000f;
  position: relative;
`;

const Logo = styled.div`
  img {
    width: 120px;
    height: auto;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 15px;
  }
  a {
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    transition: color 0.3s ease;
  }
  a:hover {
    color: #f582ae;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 30px; /* Adjust icon size */
    height: 30px;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate("/login", { replace: true }); 
      window.history.pushState(null, null, "/login"); 
      window.addEventListener("popstate", () => {
        navigate("/login"); 
      });
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <HeaderContainer>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipe-list">Recipes</Link>
          </li>
          <li>
            <Link to="/recipe-form">Add Recipes</Link>
          </li>
          <li>
            <LogoutButton onClick={handleLogout}>
              <img src={logoutimg} alt="Logout" />
            </LogoutButton>
          </li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
