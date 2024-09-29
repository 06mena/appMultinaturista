import React from 'react';
import SearchDropdown from './searchDropdown';
import { useNavigate } from 'react-router-dom';
import styles from './css/searchBar.module.css';

const SearchBar = ({ searchTerm, handleInputChange, showDropdown, searchResults, handleResultClick }) => {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      if (searchTerm.trim()) {
        navigate(`/productosLista?search=${searchTerm.trim()}`); // Redirigir con el término de búsqueda
      }
    }
  };

  return (
    <div className={styles.relativeContainer}>
      <form className={`d-flex ${styles.searchForm}`} role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className={`${styles.formControl} form-control me-2`}
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
      {showDropdown && (
        <SearchDropdown
          searchResults={searchResults}
          handleResultClick={handleResultClick}
          styles={styles}
        />
      )}
    </div>

  );
};

export default SearchBar;
