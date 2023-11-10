import React, { useEffect } from 'react'
import css from "./Modal.module.css"

const Modal = ({modalData,closeModal,closeModalToESCAPE}) => {

    

      useEffect(()=>{
        document.addEventListener('keydown', closeModalToESCAPE);

        return ()=> document.removeEventListener('keydown', closeModalToESCAPE);
        
      },[closeModalToESCAPE])



    const {largeImageURL,id} = modalData
    return (
        <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={id} />
        </div>
      </div>
    )
  }


export default Modal