import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ErrorImg } from "./ErrorImg/ErrorImg";
import { MagnifyingGlass } from 'react-loader-spinner';
import { fetchImages } from "../api";
import img from '../images/img-not-found.jpg'

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
    const fetchData = async () => {
      if (text.trim() === '') {
        toastInfoNothing();
        return;
      }

      setLoading(true);
      try {
        const result = await fetchImages(text, page);
        const { totalHits, hits } = result;

        if (totalHits === 0) {
          toastWarn();
          setIsError(true);
        } else {
          const onlyNeedValues = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          }));

          if (page === 1 && hits.length > 1) {
            toastSuccess();
          }

          setImages(prevImages => [...prevImages, ...onlyNeedValues]);
          setIsError(false);

          const totalPages = Math.ceil(totalHits / 12);
          setShowBTN(page < totalPages);
        }
      } catch (error) {
        toastError();
      }

      setLoading(false);
    };

    fetchData();
  }, [text, page]);

  const toastSettings = {
    theme: "colored",
  };

  const searchImages = newText => {
    if (text === newText.trim()) {
      toastInfoDuplication();
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
    const { code } = event;
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
    } else if (nodeName === 'DIV' || code === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const toastSuccess = () => {
    return toast.success("Hooray! We found what you were looking for 🤗", toastSettings);
  };

  const toastInfoNothing = () => {
    return toast.info("It looks like you want to find nothing, please check your query 😕", toastSettings);
  };

  const toastInfoDuplication = () => {
    return toast.info("It looks like there are already pictures found for your request, please check if this will be a new search 🤔", toastSettings);
  };

  const toastWarn = () => {
    return toast.warn("Sorry, nothing was found for your request, try something else 🙈", toastSettings);
  };

  const toastError = () => {
    return toast.error("Oops, something went wrong, please try again 🙊", toastSettings);
  };

  return (
    <>
      <Searchbar onSubmit={searchImages} toastInfo={toastInfoNothing} />
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
          {showBTN && images.length >= 12 && images.length % 12 === 0 && (
            <Button text="Load more" type="button" loadMoreImages={loadMoreImages} />
          )}
        </>
      )}
    </>
  );
};

export default App;
