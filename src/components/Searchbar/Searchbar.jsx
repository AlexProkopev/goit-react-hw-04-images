import React from 'react'
import css from "./Searchbar.module.css"

const  Searchbar=({onSubmit})=>{

  

   const hendleSubmitForm =(e)=>{
      e.preventDefault()
        const value = e.currentTarget.elements.search.value.trim()
        if (value === '') {
          alert('Введите текст для поиска')
          return
        } 
        onSubmit(value)
        e.currentTarget.reset()
    }



    


    
    return (
        <header className={css.searchbar}>
        <form className={css.form} onSubmit={hendleSubmitForm} >
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
      
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='search'
          />
        </form>
      </header>
    )
  }


export default Searchbar