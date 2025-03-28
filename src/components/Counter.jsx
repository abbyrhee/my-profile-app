import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../features/counter/counterSlice';
import styles from "../styles/home.module.css";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className={styles["profile-container"]}>
      <h2>Profile Views: {count}</h2>
      <button 
        className={styles["button"]}
        onClick={() => dispatch(increment(1))}
      >
        Increment Views
      </button>
    </div>
  );
};

export default Counter;