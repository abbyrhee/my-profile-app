import { useEffect, useReducer } from "react";
import { initialState, homeReducer } from "../homeReducer";

export default function useHomePage() {
    const [state, dispatch] = useReducer(homeReducer, initialState);
    const { title, search, page } = state;
    
    useEffect(() => {
        fetch("https://web.ics.purdue.edu/~rhee27/profile-app/get-titles.php")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "SET_TITLES", payload: data.titles });
            });
    }, []);

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~rhee27/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "FETCH_DATA", payload: data });
            });
    }, [title, search, page]);

    return {
        state,
        dispatch,
    };
}
