import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import './barraPrincipal';
import Categoria from './categoria'
import ImgPrincipal from './imgPrincipal';
import BarraPrincipal from './barraPrincipal';
import Oferta from './ofertas';
import Recomendaciones from './recomendaciones';
import Tips from './tips';
import Footer from './footer';


const Home = () => {
  return (
    <div>
      <BarraPrincipal />
      <ImgPrincipal />
      <Categoria />
      <Oferta />
      <Recomendaciones/>
      <Tips/>
      <Footer />
    </div>
  );
};
export default Home;