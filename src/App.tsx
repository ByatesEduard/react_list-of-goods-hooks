import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum  SortType {
 Aplha = 'alpha',
 Length = 'length',
 Null = 'none',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.Null); // alpha / length / null

  const sortAlphabetically = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.localeCompare(b)));
    setIsReversed(false);
    setSortType(SortType.Aplha);
  };

  const sortByLength = () => {
    setGoods(prevGoods => [...prevGoods].sort((a, b) => a.length - b.length));
    setIsReversed(false);
    setSortType(SortType.Length);
  };

  const reversedGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
    setSortType(SortType.Null);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSortType(SortType.Null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alpha' && !isReversed ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' && !isReversed ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {sortType !== null && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
