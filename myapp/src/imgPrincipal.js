import React from 'react';
import styles from './css/imgPrincipal.module.css'

const ImgPrincipal = () => {
  return (
    <div className={styles.contenedorImgs}>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item active ${styles.imagCarusel}`}>
            <img src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1727139827/imgCarusel_zosuve.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${styles.imagCarusel}`}>
            <img src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726775517/f5c4502f-e328-4ef1-94a0-8a4db47acacf_tons14.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${styles.imagCarusel}`}>
            <img src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1725729003/Leonardo_Phoenix_A_breathtakingly_vibrant_and_cinematic_photog_2_suj6up.jpg" className="d-block w-100" alt="" />
          </div>
        </div>
        <button className={`carousel-control-prev ${styles.controlCarusel}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className={`carousel-control-next ${styles.controlCarusel}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

  );
}

export default ImgPrincipal;
