import "dotenv/config";
import type { OmdbMovieResponse, OmdbSearchResponse } from "../types/omdb.js";

const OMDB_API_KEY = process.env.OMDB_API_KEY;
if (!OMDB_API_KEY) throw new Error("OMDB_API_KEY não definida no .env");

const BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

function clean(value?: string) {
    return !value || value === "N/A" ? null : value;
}

export async function searchMovies(movieName: string, page = 1) {
    // consumir os filmes da API
    const query = encodeURIComponent(movieName);

    const request = await fetch(`${BASE_URL}&s=${query}&page=${page}`);
    const data: OmdbSearchResponse = await request.json();

    if (data.Response === "False") return [];

    return data.Search.map((item) => ({
        imdbId: item.imdbID,
        title: item.Title,
        type: item.Type,
        poster: clean(item.Poster),
    }));
}

export async function getMovieByImdbId(imdbId: string) {
    const query = encodeURIComponent(imdbId);

    const request = await fetch(`${BASE_URL}&i=${query}&plot=full`);
    const data: OmdbMovieResponse = await request.json();

    if (data.Response === "False") return null;

    const releasedDate = new Date(data.Released);

    const hasSeasons =
        data.Type === "series" &&
        data.totalSeasons &&
        data.totalSeasons !== "N/A";

    return {
        imdbId: data.imdbID,
        title: data.Title,
        released: isNaN(releasedDate.getTime()) ? null : releasedDate,
        runtime: clean(
            hasSeasons ? `${data.totalSeasons} seasons` : data.Runtime,
        ),
        genre: clean(data.Genre),
        plot: clean(data.Plot),
        poster: clean(data.Poster),
        type: data.Type,
    };
}
