import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/contant";
import { addTrailerVideo } from "../store/moviesSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
            .then(response => response.json())
            .catch(err => console.error(err));
        const filterTrailerData = data.results.filter((video) => video.type === 'Trailer')
        const Finaltrailer = filterTrailerData.length !== 0 ? filterTrailerData[0] : data.results[0]
        dispatch(addTrailerVideo(Finaltrailer))
    }

    useEffect(() => {
        getMovieVideo()
    }, [])
}
export default useMovieTrailer