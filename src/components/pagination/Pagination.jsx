import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/home.module.css";

const Pagination = memo(({ 
  page, 
  totalPages, 
  onPrevPage, 
  onNextPage, 
  isPrevDisabled, 
  isNextDisabled 
}) => {
  return (
    <div className={styles["pagination"]}>
      <button
        onClick={onPrevPage}
        disabled={isPrevDisabled}
      >
        <span className="sr-only">Previous</span>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>
        {page}/{totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={isNextDisabled}
      >
        <span className="sr-only">Next</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
});

export default Pagination;