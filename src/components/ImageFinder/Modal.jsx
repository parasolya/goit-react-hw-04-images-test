import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageFinder.module.css';

export default class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
  }

  clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  clickEsc = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.clickBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
