import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth, clearError } from '../features/auth/authSlice';
import style from "../styles/ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isRegister = false }) => {
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const { error, status } = useSelector(selectAuth);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", data.username.trim());
    formData.append("password", data.password.trim());
    if (isRegister) formData.append("email", data.email.trim());
    formData.append("action", isRegister ? "register" : "login");

    try {
      await dispatch(login(formData)).unwrap();
      setData({
        username: "",
        password: "",
        email: "",
      });
      setSuccessMessage("Successfully logged in!");
      navigate("/");
    } catch (error) {
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style["profile-form"]}>
      <input
        ref={usernameRef}
        type="text"
        name="username"
        placeholder="Username"
        required
        value={data.username}
        onChange={handleChange}
      />
      {isRegister && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength="8"
        value={data.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={
          status === 'loading' ||
          data.username.trim() === "" ||
          (isRegister && data.email.trim() === "") ||
          data.password.trim() === ""
        }
      >
        Submit
      </button>
      {error && <p className={style["error"]}>{error}</p>}
      {successMessage && <p className={style["success"]}>{successMessage}</p>}
    </form>
  );
};
export default AuthForm;
