import React from 'react'
import css from "./ImageGallery.module.css"
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'

const ImageGallery =({imageData,handleClickModal})=>{


  
    return (
        <ul className={css.gallery}>
       <ImageGalleryItem imageData={imageData} handleClickModal={handleClickModal}/>
      </ul>
    )
  
}

export default ImageGallery