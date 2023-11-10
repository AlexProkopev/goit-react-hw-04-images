import React from 'react'
import css from "./Button.module.css"

 const Button =({hendleClickMore})=> {



    return (
      <>
      <button type="button" className={css.button} onClick={hendleClickMore}>Load more</button>
      </>
    )
  
}

export default Button