import React, { useCallback, useEffect, useMemo, useState } from "react";
import { get } from "./api";
import { FilmsList } from "./components/FilmsList";
import { ApiResourceList, Film } from "./types/Film";
import { convertDateToYear } from "./utils";
import { FilmCard } from "./components/FilmCard";
import "./App.scss";
import { Loader } from "./components/Loader";

export const App = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const fetchFilms = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorLoading(false);
      const fetchedData = await get<ApiResourceList>();

      setFilms(fetchedData.results);
    } catch (error) {
      setErrorLoading(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFilms();
  }, []);

  const sortedFilms = useMemo(() => {
    return [...films].sort((film1, film2) => (
      (convertDateToYear(film1.release_date)
        - convertDateToYear(film2.release_date))
    ));
  }, [films]);

  console.log('fetched films are ', films);

  return (
    <div className="box">
      <a
        href="#"
        className="logo"
        onClick={() => setSelectedFilm(null)}
      >
        <div className="image is-128x128">
          <div className="logo__image" />
        </div>
      </a>

      {selectedFilm
        ? (
          <FilmCard
            film={selectedFilm}
            onDeselectFilm={setSelectedFilm}
          />
        )
        : (
          <div className="block">
            {isLoading && <Loader />}

            {errorLoading && (
              <p className="notification is-danger">
                Something went wrong
              </p>
            )}

            {(sortedFilms.length === 0) && !errorLoading && !isLoading && (
              <p>
                There are no films on the server.
              </p>
            )}

            {(sortedFilms.length > 0 && !isLoading) && (
              <FilmsList
                films={sortedFilms}
                onSelectFilm={setSelectedFilm}
              />
            )}
          </div>
        )
      }
    </div>
  );
};
