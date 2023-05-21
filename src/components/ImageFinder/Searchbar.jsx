import { Component } from 'react';
import css from './ImageFinder.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    photoName: '',
  };
  handleInput = e => {
    const { value } = e.currentTarget;
    this.setState({
      photoName: value.toLowerCase(),
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.photoName.trim() === '') {
      Notiflix.Report.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    this.props.onSubmit(this.state.photoName);

    this.reset();
  };
  reset = () => {
    this.setState({
      photoName: '',
    });
  };
  render() {
    return (
      <div>
        <header className={css.Searchbar}>
          <form
            className={css.SearchForm}
            onSubmit={e => {
              this.handleSubmit(e);
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
                this.handleInput(e);
              }}
              value={this.state.photoName}
            />
          </form>
        </header>
      </div>
    );
  }
}
export default Searchbar;
