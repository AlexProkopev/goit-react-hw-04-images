import React, { useEffect, useState,useCallback } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Swal from 'sweetalert2';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [valueSearch, setValueSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  // const [totalHits, setTotalHits] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(null);

  const fetchImage = useCallback(async (page,valueSearch)=> {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${valueSearch}&page=${page}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (data.total === 0) {
        alert('Ничего не найдено');
        return;
      }
    setShowLoadMore(page<Math.ceil(data.totalHits/12));
      setImage(prev=>[...prev, ...data.hits]);
      // setTotalHits(data.totalHits);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit = valueInput => {
    setValueSearch(valueInput);
    // fetchImage(valueInput);

    setPage(1);
    setImage([]);
    setError(null);
    setShowLoadMore(false);
  };

  // const fetchImageMore = async () => {
  //   try {
  //     setIsLoading(true);

  //     const { data } = await axios.get(
  //       `https://pixabay.com/api/?q=${valueSearch}&page=${page}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photosa&orientation=horizontal&per_page=12`
  //     );

  //     setImage([...image, ...data.hits]);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const hendleClickMore = () => {
    setPage(prev => prev + 1);
  };

  const errorMessage = () => {
    Swal.fire({
      title: 'Что-то пошло не так =(',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  };

  useEffect(() => {
    if (!valueSearch) return
      fetchImage(page, valueSearch);
    
  }, [page,valueSearch,fetchImage]);

  const chekForValue = () => {
    return image !== null && image.length === 0 && image === null;
  };

  const handleClickModal = webformatURL => {
    if (image && image.length > 0) {
      const matchedImage = image.find(
        item => item.webformatURL === webformatURL
      );

      if (matchedImage) {
        setModalData(matchedImage);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const closeModalToESCAPE = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error !== null && errorMessage()}

      <div className={css.wrapper}>
        {chekForValue() && <p> Запрос не найден</p>}

        {image.length && <ImageGallery imageData={image} handleClickModal={handleClickModal} />}
        {!image.length  && <h2 className={css.title}>Начните поиск</h2>}
        {showLoadMore && (
          <Button hendleClickMore={hendleClickMore} />
        )}
        {isModalOpen && (
          <Modal
            modalData={modalData}
            closeModal={closeModal}
            closeModalToESCAPE={closeModalToESCAPE}
          />
        )}
      </div>
    </div>
  );
};

export default App;
