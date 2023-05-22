import { useState } from 'react';
import css from './ImageFinder.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export default function Searchbar({ onSubmit }) {
  const [photoName, setPhotoName] = useState('');

  const handleInput = e => {
    const { value } = e.currentTarget;
    setPhotoName(value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (photoName.trim() === '') {
      Notiflix.Report.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    onSubmit(photoName);

    setPhotoName('');
  };

  return (
    <div>
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <button type={css.submit} className={css.SearchForm_button}>
            <ImSearch />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={e => {
              handleInput(e);
            }}
            value={photoName}
          />
        </form>
      </header>
    </div>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
