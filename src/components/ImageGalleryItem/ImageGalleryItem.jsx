import React from 'react'
import css from "./ImageGalleryItem.module.css"
import { nanoid } from 'nanoid';

const ImageGalleryItem =({imageData,handleClickModal}) => {

    
    return (
     <>
     {imageData !== null && imageData.map(({webformatURL,id })=>{
      const idUniq = nanoid()
        return (
          <li key={idUniq} className={css.galleryItem} onClick={()=>{handleClickModal(webformatURL)}}>
            <img src={webformatURL} alt={id} />
          </li>
        )
     })}
     </>
    )
  
}

export default ImageGalleryItem