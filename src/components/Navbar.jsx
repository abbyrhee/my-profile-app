import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode, selectMode } from '../features/mode/modeSlice';
import { logout, selectAuth } from '../features/auth/authSlice';

const Navbar = () => {
  const mode = useSelector(selectMode);
  const { isLogin } = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <nav className={`${styles["navbar"]}`}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/add-profile">Add Profile</Link></li>
      </ul>
      {
        isLogin ? 
        <button onClick={() => dispatch(logout())}>Logout</button> 
        : 
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      }
      <button onClick={() => dispatch(toggleMode())}>
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
