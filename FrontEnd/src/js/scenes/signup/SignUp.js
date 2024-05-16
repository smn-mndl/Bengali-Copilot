// SignUpPage.js
import React, { useState } from "react";
import "./SignUp.scss";
import { useDispatch } from "react-redux";
import { userLoginStatusAction, userRegisterAction } from "../../redux/actions/appActions";
import Modal from "antd/es/modal/Modal";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [registerData, setRegisterData] = useState({});
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Handle sign-up logic (e.g., send data to backend)
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Reset form and clear errors
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    const payload = JSON.parse(JSON.stringify({
      name: name,
      password: password,
      email: email
    }))
    userRegisterAction(dispatch, payload, setShowRegisterModal)
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <Modal
          style={{ top: 20 }}
          open={showRegisterModal}
          centered
          onCancel={() => {
            setShowRegisterModal(false);
            navigate("/");
            setRegisterData({});
            // userLoginStatusAction(dispatch, true);
          }}
          footer={null}
        >
          <p>Successfully Registered!</p>
        </Modal>
    </div>
  );
}

export default SignUpPage;
