import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ErrorImg } from "./ErrorImg/ErrorImg";
import LoadingSpinner from './Loader/MagnifyingGlass';
import { fetchImages } from "../api";
import img from '../images/img-not-found.jpg'
import {
  showSuccessToast,
  showInfoNothingToast,
  showInfoDuplicationToast,
  showWarnToast,
  showErrorToast,
} from '../toastSettings';

const App = () => {
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageData, setLargeImageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showBTN, setShowBTN] = useState(false);

  useEffect(() => {
     if (text.trim() === '') {
        showInfoNothingToast();
        return;
      }
    const fetchData = async () => {

      setLoading(true);
      try {
        const result = await fetchImages(text, page);
        const { totalHits, hits } = result;

        if (totalHits === 0) {
          showWarnToast();
          return;
        }  
          const onlyNeedValues = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          }));

          if (page === 1 && hits.length > 1) {
            showSuccessToast();
          }

          setImages(prevImages => [...prevImages, ...onlyNeedValues]);
        

          const totalPages = Math.ceil(totalHits / 12);
          setShowBTN(page < totalPages);
        
      } catch (error) {
        showErrorToast();

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [text, page]);



  const searchImages = newText => {
    if (text === newText.trim()) {
      showInfoDuplicationToast();
      return;
    }

    setIsError(false);

    setText(newText);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
  setLargeImageData({ imageURL: largeImageURL, alt: tags });
  setIsModalOpen(prevState => !prevState);
};


  return (
    <>
      <Searchbar onSubmit={searchImages} toastInfo={showInfoNothingToast} />
      <div style={{ marginTop: '10px' }}></div>
      {isError ? <ErrorImg errorImg={img} /> : images.length > 0 && <ImageGallery allImages={images} onToggleModal={toggleModal} />}
      {loading &&
        <LoadingSpinner />}
      <div style={{ marginTop: '10px' }}></div>
          {isModalOpen && (
  <Modal imageURL={largeImageData.imageURL} tags={largeImageData.tags} onToggleModal={toggleModal} />
)}
          {showBTN && 
            <Button text="Load more" type="button" loadMoreImages={loadMoreImages} />
          }
    </>
  );
};

export default App;
