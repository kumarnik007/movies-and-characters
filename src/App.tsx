import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getFilm } from "./api";
import { FilmsList } from "./components/FilmsList";
import { ApiResourceList, Film } from "./types/Film";
import { convertDateToYear } from "./utils";

export const App = () => {
  const [films, setFilms] = useState<Film[]>([]);

  const fetchFilms = useCallback(async () => {
    try {
      const fetchedData = await getFilm<ApiResourceList>();

      setFilms(fetchedData.results);
    } catch (error) {

    }
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
    <FilmsList films={sortedFilms} />
  );
};
