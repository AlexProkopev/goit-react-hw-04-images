import React, { useEffect, useState } from 'react';
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
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  const fetchImage = async value => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${value}&page=${1}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (data.total === 0) {
        alert('Ничего не найдено');
        return;
      }

      setImage([...data.hits]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = valueInput => {
    setValueSearch(valueInput);
    fetchImage(valueInput);
  };

  const fetchImageMore = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${valueSearch}&page=${page}&key=39354546-4613c0428bf062669fa06b3f7&image_type=photosa&orientation=horizontal&per_page=12`
      );

      setImage([...image, ...data.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const hendleClickMore = () => {
    setPage(page + 1);
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
    if (image && image.length < totalHits) {
      fetchImageMore();
    }
  }, [page]);

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

        <ImageGallery imageData={image} handleClickModal={handleClickModal} />
        {image === null && <h2 className={css.title}>Начните поиск</h2>}
        {image !== null && image.length < totalHits && (
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
