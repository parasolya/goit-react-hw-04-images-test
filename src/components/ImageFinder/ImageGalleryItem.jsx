import css from './ImageFinder.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, alt, onClick, largeUrl }) => {
  return (
    <div>
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          src={url}
          alt={alt}
          onClick={() => onClick(largeUrl)}
        />
      </li>
    </div>
  );
};
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
