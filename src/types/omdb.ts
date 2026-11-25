export type OmdbTitleType = "movie" | "series" | "episode";

export interface OmdbMovie {
    Response: "True";
    imdbID: string;
    Title: string;
    Released: string; // "31 Mar 1999" ou "N/A"
    Runtime: string; // "136 min" ou "N/A"
    Genre: string;
    Plot: string;
    Poster: string; // URL ou "N/A"
    Type: OmdbTitleType;
    totalSeasons?: string;
}

export type OmdbSearch = Pick<
    OmdbMovie,
    "imdbID" | "Title" | "Poster" | "Type"
>;

export interface OmdbError {
    Response: "False";
    Error: string;
}

export type OmdbSearchResponse =
    | {
          Response: "True";
          Search: OmdbSearch[];
          totalResults: string;
      }
    | OmdbError;

export type OmdbMovieResponse = OmdbMovie | OmdbError;
