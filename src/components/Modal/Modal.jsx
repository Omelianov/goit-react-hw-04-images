
import { useEffect } from 'react';
import PropTypes from 'prop-types';


export const Modal = ({data, onToggleModal}) =>  {
    const [source, alt] = data;


    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onToggleModal();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onToggleModal]);

        return (
            <div className="Overlay" onClick={onToggleModal}>
                <div className="Modal">
                    <img src={source} alt={alt} />
                </div>
            </div>
        );
    };

    Modal.propTypes = {
        data: PropTypes.shape({
            source: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        }).isRequired,
        onToggleModal: PropTypes.func.isRequired,
    };
