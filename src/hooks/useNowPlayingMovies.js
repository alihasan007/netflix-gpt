import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../store/moviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
            .then(response => response.json())
            .catch(err => console.error(err));
        const movieslist = data.results

        dispatch(addNowPlayingMovies(movieslist))
    }
    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies()
    }, [])
}
export default useNowPlayingMovies