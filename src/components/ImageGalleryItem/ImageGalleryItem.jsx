import React from 'react'
import css from "./ImageGalleryItem.module.css"


const ImageGalleryItem =({imageData,handleClickModal}) => {

    
    return (
     <>
     { imageData.map(({webformatURL,id })=>{
        return (
          <li key={id} className={css.galleryItem} onClick={()=>{handleClickModal(webformatURL)}}>
            <img src={webformatURL} alt={id} />
          </li>
        )
     })}
     </>
    )
  
}

export default ImageGalleryItem