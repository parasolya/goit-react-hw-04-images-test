import React from 'react';
import { Component } from 'react';
import Searchbar from './ImageFinder/Searchbar';
import ImageGallery from './ImageFinder/ImageGallery';
import css from './ImageFinder/ImageFinder.module.css';
import Modal from './ImageFinder/Modal';

class App extends Component {
  state = {
    photoName: '',
    page: 1,
    modalImg: '',
    showModal: false,
  };
  handleSubmitForm = data => {
    this.setState({
      photoName: data,
      page: 1,
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };
  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    console.log(this.state);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery
          photoName={this.state.photoName}
          loadMoreBtn={this.loadMoreBtn}
          page={this.state.page}
          onClick={this.getLargeImg}
        />
        {this.state.showModal && (
          <Modal url={this.state.modalImg} toggleModal={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
