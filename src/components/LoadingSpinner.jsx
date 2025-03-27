import styles from "../styles/loading-spinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
};

export default LoadingSpinner;