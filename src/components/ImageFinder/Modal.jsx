import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

export default function Modal({ url, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', clickEsc);

    return function cleanup() {
      window.removeEventListener('keydown', clickEsc);
    };
  });
  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };
  const clickEsc = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={clickBackdrop}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
