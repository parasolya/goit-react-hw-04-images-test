import React, { useState } from 'react';
import Searchbar from './ImageFinder/Searchbar';
import ImageGallery from './ImageFinder/ImageGallery';
import css from './ImageFinder/ImageFinder.module.css';
import Modal from './ImageFinder/Modal';

export default function App() {
  const [photoName, setPhotoName] = useState('');
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmitForm = data => {
    setPhotoName(data);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };
  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmitForm} />
      <ImageGallery
        photoName={photoName}
        loadMoreBtn={loadMoreBtn}
        page={page}
        onClick={getLargeImg}
      />
      {showModal && <Modal url={modalImg} toggleModal={toggleModal} />}
    </div>
  );
}
