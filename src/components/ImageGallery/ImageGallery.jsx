import PropTypes from 'prop-types';
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ allImages, ...otherProps }) => {
  return (
    <section>
      <ul className="ImageGallery">
  {allImages.map(oneImage => (
    <ImageGalleryItem key={oneImage.id} image={oneImage} {...otherProps} />
  ))}
</ul>
    </section>
  );
};


ImageGallery.propTypes = {
  allImages: PropTypes.array.isRequired,
};