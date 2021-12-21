// api key and base url
const API_KEY = "6a76e3254d065f99647ffb4eb0404c5c";
const BASE_PATH = "https://api.themoviedb.org/3";

// Interface: only get what you need from API
interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
  }
  
export interface IGetMoviesResult {
dates: {
    maximum: string;
    minimum: string;
};
page: number;
results: IMovie[];
total_pages: number;
total_results: number;
}

// function that fetch data from the api
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}