import { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import FetchImages from 'services/Api';
import Loader from './Loader/Loader';
import Modal from 'components/Modal/Modal';
import css from 'components/App.module.css';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [inputSearch, setInputSearch] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hits, setHits] = useState(0)
  const [largeImage, setLargeImage] = useState(false)
  const [showModal, setShowModal] = useState(false)

useEffect(()=> {
      setLoading(true);
      const response = FetchImages(inputSearch, page);
      response
        .then(res => {
          console.log(res.data);
          setHits(res.data.hits.length);
          if (res.data.total === 0) {
            return toast.warn('No hits found please enter another query');
          }
          res.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              !images.some(image => image.id === id) &&
              setImages(images => [
                ...images,
                { id, webformatURL, largeImageURL, tags },
              ])
            );
          });
        })
        .catch(error => toast.warn(`please enter a query`))
        .finally(setLoading(false));
    },[inputSearch, page, images]
  )

  const searchSubmit = inputValue => {
    if (inputValue === inputSearch) {
      return toast.warn(
        'This request has already been found, please try another quary'
      );
    }
    setInputSearch(inputValue);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(page=> page + 1 );
  };

  const openModal = index => { 
      setShowModal(true);
      setLargeImage(images[index].largeImageURL)
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };

  
    return (
      <div className={css.App}>
        <SearchBar onSubmit={searchSubmit} />
        <ImageGallery images={images} openModal={openModal} />
        {showModal && (
          <Modal
            toggleModal={toggleModal}
            largeImage={largeImage}
          />
        )}
        {loading && <Loader />}
        {hits >= 12 && <Button nextPage={nextPage} />}
        <ToastContainer />
      </div>
    );
  
}
