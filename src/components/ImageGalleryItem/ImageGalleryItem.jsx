import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { tags, webformatURL, largeImageURL }, onToggleModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onToggleModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onToggleModal: PropTypes.func.isRequired,
};