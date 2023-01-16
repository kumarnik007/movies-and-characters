import React, { useState } from 'react';
import { Film } from '../../types/Film';

import './FilmsList.scss';

type Props = {
  films: Film[];
  onSelectFilm: (value: Film) => void,
};

export const FilmsList: React.FC<Props> = ({
  films,
  onSelectFilm,
}) => {
  return (
    <>
      <ul className="films">
        {films.map((film, idx) => (
          <li key={idx}>
            <a
              className="title is-5"
              onClick={() => onSelectFilm(film)}
            >
              {film.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
