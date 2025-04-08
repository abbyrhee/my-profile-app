import React, { Suspense, useMemo, useCallback } from "react";
import Wrapper from "../components/Wrapper";
import LoadingSpinner from "../components/LoadingSpinner";
import useHomePage from "../reducers/hooks/homePageHook";
import Counter from "../components/Counter";
import ChatBot from "../components/ChatBot";
import styles from "../styles/home.module.css";

// Lazy load non-critical components
const FiltersContainer = React.lazy(() => import("../components/filters/FiltersContainer"));
const ProfileList = React.lazy(() => import("../components/profiles/ProfileList"));
const Pagination = React.lazy(() => import("../components/pagination/Pagination"));
const ScrollToTop = React.lazy(() => import("../components/ScrollToTop"));

const HomePage = () => {
  const { state, dispatch } = useHomePage();
  const { titles, title, search, profiles, page, count } = state;

  // Memoize handlers
  const handleTitleChange = useCallback((e) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  }, [dispatch]);

  const handleSearchChange = useCallback((e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, [dispatch]);

  const handlePrevPage = useCallback(() => {
    dispatch({ type: "SET_PAGE", payload: page - 1 });
  }, [dispatch, page]);

  const handleNextPage = useCallback(() => {
    dispatch({ type: "SET_PAGE", payload: page + 1 });
  }, [dispatch, page]);

  // Memoize computed values
  const totalPages = useMemo(() => Math.ceil(count / 10), [count]);
  const isPrevDisabled = useMemo(() => page === 1, [page]);
  const isNextDisabled = useMemo(() => page >= totalPages, [page, totalPages]);

  return (
    <Wrapper>
      <h1>Profile App</h1>

      <Counter />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={styles["profile-container"]}>
          <FiltersContainer
            title={title}
            titles={titles}
            search={search}
            onTitleChange={handleTitleChange}
            onSearchChange={handleSearchChange}
            onClear={handleClear}
          />

          <ProfileList profiles={profiles} />

          {count === 0 && <p>No profiles found!</p>}

          {count > 10 && (
            <div className={styles.pagination}>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
              />
            </div>
          )}

          <ScrollToTop />
        </div>

        <div className={styles["chat-container"]}>
          <h2>Need Help?</h2>
          <ChatBot />
        </div>
      </Suspense>
    </Wrapper>
  );
};

export default HomePage;
