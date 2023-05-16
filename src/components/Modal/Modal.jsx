// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

// const Modal = ({ largeImageURL, onClose }) => {
//   useEffect(() => {
//     const instance = basicLightbox.create(
//       `<img src="${largeImageURL}" alt="Large Image" />`
//     );

//     instance.show();

//     return () => {
//       instance.close();
//     };
//   }, [largeImageURL]);

//   const handleClose = () => {
//     onClose();
//   };

//   return null;
// };

// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;

import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
    static propTypes = {
        data: PropTypes.shape({
            source: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        }).isRequired,
        onToggleModal: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { onToggleModal } = this.props;
        window.addEventListener("keydown", onToggleModal);
    };
    componentWillUnmount() {
        const { onToggleModal } = this.props;
        window.removeEventListener("keydown", onToggleModal);
    };

    render() {
    const { data: { source, alt }, onToggleModal } = this.props;
        return (
            <div className="Overlay" onClick={onToggleModal}>
                <div className="Modal">
                    <img src={source} alt={alt} />
                </div>
            </div>
        );
    };
};