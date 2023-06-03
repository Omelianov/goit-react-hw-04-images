import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ErrorImg } from "./ErrorImg/ErrorImg";
import { MagnifyingGlass } from 'react-loader-spinner';
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
        }  {
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
          setIsError(false);

          const totalPages = Math.ceil(totalHits / 12);
          setShowBTN(page < totalPages);
        }
      } catch (error) {
        showErrorToast();
      }

      setLoading(false);
    };

    fetchData();
  }, [text, page]);



  const searchImages = newText => {
    if (text === newText.trim()) {
      showInfoDuplicationToast();
      return;
    }

    setText(newText);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (event) => {
  if (!event) {
    setIsModalOpen(false);
    return;
  }

  const { nodeName, dataset: { source }, alt } = event.target;

  if (nodeName === 'IMG') {
    if (isModalOpen) {
      return;
    }

    setIsModalOpen(true);
    setLargeImageData({
      source,
      alt,
    });
  } else if (nodeName !== 'INPUT') {
    setIsModalOpen(false);
  }
};


  return (
    <>
      <Searchbar onSubmit={searchImages} toastInfo={showInfoNothingToast} />
      {isError ? <ErrorImg errorImg={img} /> : images.length > 0 && <ImageGallery allImages={images} onToggleModal={toggleModal} />}
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#b4dcea"
          color="#354391"
        />
      ) : (
        <>
          {isModalOpen && <Modal data={largeImageData} onToggleModal={toggleModal} />}
          <ToastContainer autoClose={3000} />
          {showBTN && (
            <Button text="Load more" type="button" loadMoreImages={loadMoreImages} />
          )}
        </>
      )}
    </>
  );
};

export default App;
