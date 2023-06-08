import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ imageURL, tags, onToggleModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event?.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const CloseModalClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
      onToggleModal();
    }
  };

  return (
    <div className="Overlay" onClick={CloseModalClickOnOverlay} tabIndex={0}>
      <div className="Modal">
        <img src={imageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
