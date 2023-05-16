import PropTypes from 'prop-types';

export const ErrorImg = ({ errorImg }) => {
    return (
        <img className="error-img" src={errorImg} alt="Wow dude, try one more time" />
    );
};

ErrorImg.propTypes = {
    errorImg: PropTypes.string.isRequired,
};