import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/contant";
import { addUpcomingMovies } from "../store/moviesSlice";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)
    const getUpcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
            .then(response => response.json())
            .catch(err => console.error(err));
        const movieslist = data.results
        dispatch(addUpcomingMovies(movieslist))
    }
    useEffect(() => {
        !upcomingMovies && getUpcomingMovies()
    }, [])
}
export default useUpcomingMovies;

