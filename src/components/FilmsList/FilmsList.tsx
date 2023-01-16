import React from 'react';
import { Film } from '../../types/Film';

import './FilmsList.scss';

type Props = {
  films: Film[];
};

export const FilmsList: React.FC<Props> = ({ films }) => {
  return (
    <ul className="films">
      {films.map((film, idx) => (
        <li key={idx}>
          <a
            href=""
          >
            {film.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
