import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import styles from "../styles/register.module.css";

const Register = () => {
    return (
        <Wrapper>
            <h1>Register</h1>
            <AuthForm isRegister={true} />
            <Link to="/login" className={styles['login-link']}>Already have an account? Login here</Link>
        </Wrapper>
    );
}

export default Register;