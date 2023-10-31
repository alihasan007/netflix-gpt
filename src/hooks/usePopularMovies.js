import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/contant";
import { addPopularMovies } from "../store/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies)
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
            .then(response => response.json())
            .catch(err => console.error(err));
        const movieslist = data.results
        dispatch(addPopularMovies(movieslist))
    }
    useEffect(() => {
        !popularMovies && getPopularMovies()
    }, [])
}
export default usePopularMovies;

