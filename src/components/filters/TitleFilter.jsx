import { memo } from 'react';
import styles from "../../styles/home.module.css";

const TitleFilter = memo(({ title, titles, onTitleChange }) => {
  return (
    <div className={styles["filter--select"]}>
      <label htmlFor="title-select">Select a title:</label>
      <select id="title-select" onChange={onTitleChange} value={title}>
        <option value="">All</option>
        {Array.isArray(titles) && titles.map((titleOption) => (
          <option key={titleOption} value={titleOption}>
            {titleOption}
          </option>
        ))}
      </select>
    </div>
  );
});

export default TitleFilter;