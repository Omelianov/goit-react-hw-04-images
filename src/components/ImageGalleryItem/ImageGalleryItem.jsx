import React from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { tags, webformatURL, largeImageURL }, onToggleModal }) => {
  const handleToggleModal = () => {
    onToggleModal(largeImageURL, tags);
  };
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={largeImageURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={handleToggleModal}
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