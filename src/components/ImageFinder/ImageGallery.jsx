import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageFinder.module.css';
import Loader from './Loader';
import Button from './Button';
import getPhotos from '../loadAPI';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export default class ImageGallery extends Component {
  state = {
    arrayPhotos: [],
    loading: false,
  };
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    photoName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.photoName !== this.props.photoName) {
      this.loadPhotos();
    }
    if (prevProps.page !== this.props.page && this.props.page > 1) {
      this.loadMorePhotos();
    }
  }
  loadPhotos = () => {
    this.setState({ loading: true });
    const { photoName, page } = this.props;
    getPhotos(photoName, page)
    .then(photos => {
      console.log(photos);
      if (photos.hits.length === 0) {
        
        this.setState({ 
          loading: false,
          arrayPhotos: [],
         });
         Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {this.setState({
        arrayPhotos: photos.hits,
      })}
        
      }
      )
      .catch(error => {        
          console.log(error);
          Notiflix.Report.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );        
      })
      .finally(() => this.setState({ loading: false }));
  };
  loadMorePhotos = () => {
    this.setState({ loading: true });
    const { photoName, page } = this.props;
    getPhotos(photoName, page)
      .then(photos => {
        if (photos.hits.length === 0) {
          Notiflix.Notify.info(
            'We are sorry, but you have reached the end of search results.'
          );
          this.setState({ loading: false });
          return;
        }

        this.setState(prevState => ({
          arrayPhotos: [...prevState.arrayPhotos, ...photos.hits],
          loading: false,
        }));
      })

      .catch(error => {
        console.log(error);
        Notiflix.Report.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  };

  render() {
    return (
      <div>       
        {this.state.loading && <Loader />}       
        {this.state.arrayPhotos && (
          <ul className={css.ImageGallery}>
            {this.state.arrayPhotos.map(el => {
              return (
                <ImageGalleryItem
                  key={el.id}
                  url={el.webformatURL}
                  alt={el.tags}
                  largeUrl={el.largeImageURL}
                  onClick={this.props.onClick}
                />
              );
            })}
          </ul>
        )}
        {this.state.arrayPhotos.length !== 0 && (
          <Button onClick={this.props.loadMoreBtn} />
        )}
      </div>
    );
  }
}
