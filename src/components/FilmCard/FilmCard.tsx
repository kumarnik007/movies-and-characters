import React, { useCallback, useEffect, useState } from 'react';
import { get } from '../../api';
import { Film, Character } from '../../types/Film';
import { convertDateToYear } from '../../utils';
import { Loader } from '../Loader';
import './FilmCard.scss';

type Props = {
  film: Film;
  onDeselectFilm: (value: null) => void,
};

export const FilmCard: React.FC<Props> = ({
  film,
  onDeselectFilm,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);
    setErrorLoading(false);
    try {
      const fetchedCharacters = film.characters.map(
        async (characterUrl) => {
          try {
            const fetchedCharacter = await get<Character>(characterUrl);

            return fetchedCharacter;
          } catch (error) {
            console.log('1. An error occured while fetching characters ', error);
            setErrorLoading(true);
            setIsLoading(false);
            throw error;
          }
        }
      )

      await Promise.all(fetchedCharacters).then((values) => {
        console.log('values are ', values);
        setCharacters(values);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('2. An error occured while fetching characters ', error);
      setErrorLoading(true);
      setIsLoading(false);
    }
    console.log('Outside all try catch');
  }, [film]);

  useEffect(() => {
    fetchCharacters();
  }, [film]);

  console.log('Film characters are ', characters);

  return (
    <div>
      <p className="title is-4">
        {`${film.title} (${convertDateToYear(film.release_date)})`}
      </p>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {errorLoading && !isLoading && (
          <p className="notification is-danger">
            Something went wrong
          </p>
        )}

        {(characters.length === 0) && !errorLoading && !isLoading && (
          <p>
            There are no characters on the server
          </p>
        )}

        {(characters.length > 0 && !isLoading) && (
          <ul className="characters">
            {characters.map((character, idx) => (
              <li key={idx} className="characters__item" >
                <p className="title is-6">
                  {character.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav
        className="pagination is-centered tile"
        role="navigation"
      >
        <button
          className="pagination-previous"
          onClick={() => onDeselectFilm(null)}
          disabled={isLoading}
        >
          Back
        </button>
      </nav>
    </div>
  );
};
