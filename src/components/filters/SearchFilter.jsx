import { memo } from 'react';
import styles from "../../styles/home.module.css";

const SearchFilter = memo(({ search, onSearchChange }) => {
  return (
    <div className={styles["filter--search"]}>
      <label htmlFor="search">Search by name:</label>
      <input
        type="text"
        id="search"
        onChange={onSearchChange}
        value={search}
      />
    </div>
  );
});

export default SearchFilter;