import React, { useCallback, useEffect, useState } from "react";
import { getFilm } from "./api";
import { ApiResourceList, Film } from "./types/Film";

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

  console.log('fetched films are ', films);

  return (
    <figure className="image is-128x128">
      <img
        src="./"
        alt="Stars background"
      />
    </figure>
  );
};
