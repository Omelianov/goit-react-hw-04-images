import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const instance = basicLightbox.create(
      `<img src="${largeImageURL}" alt="" />`
    );

    instance.show();

    return () => {
      instance.close();
    };
  }, [largeImageURL]);

  const handleClose = () => {
    onClose();
  };

  return null;
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;