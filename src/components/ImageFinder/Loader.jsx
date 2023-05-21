import { Audio } from 'react-loader-spinner';
import css from './ImageFinder.module.css';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};
export default Loader;
