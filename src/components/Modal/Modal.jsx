import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';


export default function Modal ({toggleModal, largeImage}) {
 

  useEffect(() => {
    const keyDown = e => e.key === 'Escape' && toggleModal();
    window.addEventListener('keydown', keyDown);
    return (() => {window.removeEventListener('keydown', keyDown);}
    )
},[toggleModal])

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

 
    return (
      <div className={css.Overlay} onClick={clickBackdrop}>
        <div className={css.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  
}

  Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };