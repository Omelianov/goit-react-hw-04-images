import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import 'basiclightbox/dist/basicLightbox.min.css';
import BasicLightbox from 'basiclightbox';

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages(response.data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    BasicLightbox.create(`<img src="${largeImageUrl}" alt="Large Image">`).show();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <img src={largeImageUrl} alt="Large Image" onClick={openModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
