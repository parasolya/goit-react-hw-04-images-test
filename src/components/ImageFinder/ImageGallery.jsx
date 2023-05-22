import { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageFinder.module.css';
import Loader from './Loader';
import Button from './Button';
import getPhotos from '../loadAPI';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export default function ImageGallery({
  page,
  onClick,
  photoName,
  loadMoreBtn,
}) {
  const [arrayPhotos, setArrayPhotos] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (photoName !== '') {
      loadPhotos();
    }
  }, [photoName]);

  useEffect(() => {
    if (page > 1) {
      loadMorePhotos();
    }
  }, [page]);

  const loadPhotos = () => {
    setStatus('pending');

    getPhotos(photoName, page)
      .then(photos => {
        if (photos.hits.length === 0) {
          setArrayPhotos([]);
          setStatus('idle');
          Notiflix.Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        } else {
          setArrayPhotos(photos.hits);
          setStatus('resolve');
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Report.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        setStatus('rejected');
      });
  };

  const loadMorePhotos = () => {
    setStatus('pending');
    getPhotos(photoName, page)
      .then(photos => {
        if (photos.hits.length === 0) {
          Notiflix.Notify.info(
            'We are sorry, but you have reached the end of search results.'
          );
          setStatus('idle');
          return;
        }
        setArrayPhotos([...arrayPhotos, ...photos.hits]);
        setStatus('resolve');
      })

      .catch(error => {
        console.log(error);
        Notiflix.Report.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        setStatus('rejected');
      });
  };
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolve') {
    return (
      <div>
        <ul className={css.ImageGallery}>
          {arrayPhotos.map(el => {
            return (
              <ImageGalleryItem
                key={el.id}
                url={el.webformatURL}
                alt={el.tags}
                largeUrl={el.largeImageURL}
                onClick={onClick}
              />
            );
          })}
        </ul>

        {arrayPhotos.length !== 0 && <Button onClick={loadMoreBtn} />}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  photoName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
};
