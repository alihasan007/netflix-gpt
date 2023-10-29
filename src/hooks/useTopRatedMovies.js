import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/contant";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
            .then(response => response.json())
            .catch(err => console.error(err));
        const movieslist = data.results
        dispatch(addTopRatedMovies(movieslist))
    }
    useEffect(() => {
        getTopRatedMovies()
    }, [])
}
export default useTopRatedMovies;
