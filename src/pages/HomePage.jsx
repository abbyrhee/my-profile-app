import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { useDebounce } from '../hooks/useDebounce';
import ScrollToTop from "../components/ScrollToTop";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // This effect will only run 500ms after the user stops typing
  useEffect(() => {
    // Perform search with debouncedSearch value
    fetch(`https://web.ics.purdue.edu/~rhee27/profile-app/fetch-data-with-filter.php?search=${debouncedSearch}`)
      .then(response => response.json())
      .then(data => {
        // Handle search results
      });
  }, [debouncedSearch]);

  return (
    <Wrapper>
      <h1>Profile App</h1>
      <div className={styles["filter-wrapper"]}>
        <div className={styles["filter--select"]}>
          <label htmlFor="title-select">Select a title:</label>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {Array.isArray(titles) && titles.map((titleOption) => (
              <option key={titleOption} value={titleOption}>
                {titleOption}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["filter--search"]}>
          <label htmlFor="search">Search by name:</label>
          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />
        </div>
        <button onClick={handleClear} style={buttonStyle}>
          <span className="sr-only">Reset</span>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className={styles["profile-cards"]}>
        {Array.isArray(profiles) && profiles.map((profile) => (
          <Link to={`/profile/${profile.id}`} key={profile.id}>
            <Card {...profile} />
          </Link>
        ))}
      </div>
      {count === 0 && <p>No profiles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })}
            disabled={page === 1}
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>
            {page}/{Math.ceil(count / 10)}
          </span>
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
            disabled={page >= Math.ceil(count / 10)}
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
      <ScrollToTop />
    </Wrapper>
  );
};

export default HomePage;
