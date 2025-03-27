import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/home.module.css";
import TitleFilter from './TitleFilter';
import SearchFilter from './SearchFilter';

const FiltersContainer = memo(({ 
  title, 
  titles, 
  search, 
  onTitleChange, 
  onSearchChange, 
  onClear 
}) => {
  return (
    <div className={styles["filter-wrapper"]}>
      <TitleFilter 
        title={title} 
        titles={titles} 
        onTitleChange={onTitleChange} 
      />
      <SearchFilter 
        search={search} 
        onSearchChange={onSearchChange} 
      />
      <button onClick={onClear}>
        <span className="sr-only">Reset</span>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
});

export default FiltersContainer;