import React, { useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginImg from "../assets/Images/login-img.png";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #6a11cb, #2575fc);
`;

const Card = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 800px;
  height: 500px;
`;

const ImageContainer = styled.div`
  flex: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #f8f9fa;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: #2575fc;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: #1a5bcc;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <LoginContainer>
      <Card>
        <ImageContainer>
          <Image src={loginImg} alt="Login" />
        </ImageContainer>
        <FormContainer>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <StyledButton type="submit">Login</StyledButton>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <a href="/register" className="text-primary">Register</a>
          </p>
        </FormContainer>
      </Card>
    </LoginContainer>
  );
};

export default Login;