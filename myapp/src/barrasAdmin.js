// import React, { useState } from 'react';
import styles from './css/barrasAdmin.module.css';
import React from 'react';
import { useState } from 'react';
import FormProductos from './formProductos';
import ListarProductos from './listarProductosAdmin';
import axios from 'axios';
import { useAuth } from './authContext'; //Para botón de cerrar sesión
import { useNavigate } from 'react-router-dom'; //Para botón de cerrar sesión
import Categorias from './categoriasAdmin';
// import EditarProductos from './EditarProductos';
import FormTips from './formTips';
import TipAdmin from './tipAdmin';
import Pedidos from './pedidos';
import { MdOutlineDashboardCustomize } from "react-icons/md";


const BarrasAdmin = () => {
  const [currentComponent, setCurrentComponent] = useState('Pedidos'); //Contiene el estado de la pagina
  const [categoria, setCategoria] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Estado para la visibilidad de la barra lateral
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0)


  //Función activar y desactivar el Sidebar Devuelve un false o un true
  const toggleSidebar = () => {

    setSidebarVisible(!sidebarVisible)

    console.log(sidebarVisible)
  };

  //MANEJAR EL EDITAR... MANIPULACIÓN DEL ID ENVIADO DESDE LISTAR PRODUCTOS **************************




  //MANDANDO ID DE CATEGORÍAS ***********************************************************************
  const estadoCategoria = (cate) => {
    setCategoriaSeleccionada(cate);
    handleItemClick('Categorías');
    // <Categorias categoriaEnv={cate}/>
    mostrarCategoria();
  };
  const mostrarCategoria = () => {
    console.log(categoriaSeleccionada)
  }


  //Cick a caja de categorías
  // const handle =(compCat)=>{
  //     handleClickCategoria(compCat)
  //     handleItemClick('Home Categorias')
  // }
  // //Función que envía la información al componente categoria
  // const handleClickCategoria = (categoriaId) => {
  //     console.log(categoriaId);
  //     <Categorias cat={categoriaId}/>
  // };


  // Al dar click cambia el estado del componente
  const handleItemClick = (component) => {

    if (sidebarVisible) {
      setSidebarVisible(false)
    }
    setCurrentComponent(component);
  };
  // console.log(vista)
  const renderContent = () => {
    switch (currentComponent) {
      case 'Todos los productos':
        return <ListarProductos />;
      case 'Agregar':
        return <FormProductos />;

      case 'Categorías':
        return <Categorias categoriaEnv={categoriaSeleccionada} />;

      case 'Agregar nuevo tip':
        return <FormTips />;

      case 'Admin Tip':
        return <TipAdmin />;

      case 'Pedidos':
        return <Pedidos />;

      default:
        return <Pedidos />;
    }
  };


  //OBTENER CATEGORÍAS - ----------------
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categorias/') // Cambia esta URL si es necesario
      .then(response => {
        setCategoria(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  // FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = () => {
    logout(); // Llama a la función logout para limpiar tokens
    navigate('/'); // Redirige al login después de cerrar sesión
  };




  return (
    <div className={styles.container}>
      <div className={`${!sidebarVisible ? styles.noSidebar : styles.contenedorBurguerSidebar}`}>
        <div
          className=
          {`${!sidebarVisible ? styles.hidden : styles.barraLateral}`}
        // {styles.barraLateral}
        >
          <div className={styles.administradorCont}>
            <div className={styles.icon}>
              <i className="bi bi-person-workspace"></i>
            </div>
            <h3>Administrador</h3>
          </div>
          <div className={styles.contItems}>
            <div className="d-flex flex-column mb-3">
              <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Todos los productos')} ><i className="bi bi-bag-check"></i>Productos</div></div>
              <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Agregar')}><i className="bi bi-box2-heart"></i>Agregar Producto</div></div>
              <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Agregar nuevo tip')}><i class="bi bi-lightbulb"></i>Agregar Tips</div></div>
              <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Admin Tip')}><MdOutlineDashboardCustomize /> Tips</div></div>
              <div className={styles.itemsL}><div className={styles.contIconItem} onClick={() => handleItemClick('Pedidos')}><i className="bi bi-clipboard-data"></i>Pedidos</div></div>

            </div>
          </div>
          <div className={styles.espacio}></div>
        </div>
        <div className={`${!sidebarVisible ? styles.burguerNegro : styles.burguerNoVisible}`} onClick={toggleSidebar}> <i className="bi bi-list"></i></div>


      </div>


      {/* BARRA SUPERIOR Y TODO LADO DERECHO*/}
      <div className={styles.rightSide}>
        <div className={styles.barraSuperior}>
          <div className={styles.searchLogout}>







            {/* Formulario de búsqueda */}
            <div className={styles.search}>
              {accessToken && (
                <button
                  className={styles.lButton}
                  onClick={handleLogout}
                >
                  Cerrar sesión

                  
                </button>
              )}

            </div>

            {/* Botón de logout */}
            {accessToken && (
              <button
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Cerrar sesión

              </button>
            )}


            <div className={styles.pageTittle}>
              <h5>{currentComponent}</h5>
            </div>

          </div>





          {(currentComponent === 'Todos los productos' || currentComponent === 'Categorías') && (
            <div className={styles.categoria}>
              {/* Sección de categoría en tamaño grande */}
              {categoria.map(cat => (
                <div key={cat.id} className={styles.cat} onClick={() => estadoCategoria(cat.id)}>{cat.nombre}</div>
              ))}

              {/* Sección de selección categoría en tamaño pequeño */}
              <div className={`form-group mb-3 ${styles.categoriaPequeña}`}>
                <label htmlFor="categoria">Categoría del Producto</label>
                <select
                  className="form-control input-custom"
                  id="categoria"
                  value={categoria}
                  onChange={(e) => estadoCategoria(e.target.value)} // Actualiza el estado con el valor seleccionado
                  required
                >
                  <option value="">Categorías</option>
                  {categoria.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

          )}

          {
            currentComponent === 'Agregar nuevo tip' ?
              <div className={styles.cat} onClick={() => handleItemClick('Admin Tip')}>Administrar Tips</div>
              : currentComponent === 'Admin Tip' ?
                <div className={styles.cat} onClick={() => handleItemClick('Agregar nuevo tip')}>Agregar Nuevo Tip</div>
                : currentComponent === 'Home'

          }



        </div>

        <div className={styles.dinamicContent}>
          <main>
            {renderContent()}
          </main>
        </div>

      </div>


    </div>
  );
};
export default BarrasAdmin;