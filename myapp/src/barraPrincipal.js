import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Badge, Drawer, List, ListItem, ListItemText, Hidden, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { CiShoppingBasket } from "react-icons/ci";
import { CartContext } from './cartContext';
import SearchBar from './searchBar';
import { styled } from '@mui/system';
import styles from './css/barraPrincipal.module.css';

const StyledLogo = styled('img')({
  maxWidth: '130px',
});

const GreenBar = styled('div')({
  backgroundColor: '#4CAF50',
  height: '15px',
  width: '100%',
});

const BarraPrincipal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error al cargar las categorías:', error));
  }, []);

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/productos/?search=${term}`);
      setSearchResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error buscando el producto: ', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setShowDropdown(false);
    }
  };

  const handleResultClick = () => {
    setShowDropdown(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleCategoryClick = (id) => {
    handleMenuClose(); // Cerrar el menú
    navigate(`/categoria/${id}`); // Redirigir a la ruta con la categoría seleccionada
  };

  const handleProductClick = () => {
    navigate('/productosLista');
    handleMenuClose(); 
  };
  

  return (
    <>
      <GreenBar />

      <AppBar position="static" color="white" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: '64px' }}>
        <Toolbar>
          {/* Logo */}
          <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
            <StyledLogo src="https://res.cloudinary.com/dj1cegfhf/image/upload/v1726073299/logoTienda_deyf5y.jpg" alt="Logo" />
          </IconButton>

          {/* Barra de búsqueda */}
          <SearchBar
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
            showDropdown={showDropdown}
            searchResults={searchResults}
            handleResultClick={handleResultClick}
          />

          {/* Espacio flexible para separar el contenido */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Íconos en pantallas grandes */}
          <Hidden mdDown>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button component={Link} to="/ofertas" color="inherit">Ofertas</Button>
                <Button component={Link} to="/nosotros" color="inherit">Nosotros</Button>
                <Button component={Link} to="/contacto" color="inherit">Contáctanos</Button>
              </Box>
              
              <Box
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
              >
                <Button
                  aria-controls="tienda-virtual-menu"
                  aria-haspopup="true"
                  onClick={handleProductClick}
                  color="inherit"
                >
                  Productos
                </Button>

                {/* Menú desplegable al pasar el mouse */}
                <Menu
                  id="tienda-virtual-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose} 
                  MenuListProps={{ 
                    onMouseLeave: handleMenuClose,
                    disablePadding: true, // Elimina el padding
                    disableAutoFocusItem: true, // Desactiva el auto enfoque
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  PaperProps={{
                    style: {
                      position: 'absolute',
                      top: '64px', // Posiciona justo debajo de la barra de navegación
                    },
                  }}
                >
                  {categorias.map((categoria) => (
                    <MenuItem
                      key={categoria.id}
                      onClick={() => handleCategoryClick(categoria.id)}
                    >
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
            <IconButton color="inherit" component={Link} to="/carrito" sx={{ marginLeft: 'auto', marginRight: '10px' }}>
              <Badge badgeContent={totalItems} color="secondary">
                <CiShoppingBasket />
              </Badge>
            </IconButton>
          </Hidden>

          {/* Menú Hamburguesa en pantallas pequeñas */}
          <Hidden mdUp>
            <ListItem button component={Link} to="/carrito" onClick={toggleDrawer(false)}>
              <ListItemText />
              <Badge badgeContent={totalItems} color="secondary" sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: 'transparent', // Elimina el fondo azul
                },
                '& .MuiBadge-root': {
                  backgroundColor: 'transparent', // Elimina el fondo azul
                },
              }}>
                <CiShoppingBasket sx={{ color: 'black' }} />
              </Badge>
            </ListItem>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                <ListItem className={styles.linkDecoracion} button component={Link} to="/ofertas" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Ofertas" />
                </ListItem>
                <ListItem className={styles.linkDecoracion} button component={Link} to="/nosotros" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Nosotros" />
                </ListItem>
                <ListItem className={styles.linkDecoracion} button component={Link} to="/contacto" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Contáctanos" />
                </ListItem>
                <ListItem className={styles.linkDecoracion} button component={Link} to="/productosLista" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Productos" />
                </ListItem>
                <ListItem className={styles.linkDecoracion} button onClick={handleMenuOpen}>
                  <ListItemText primary="Categorias de productos" />
                </ListItem>
                <Menu
                  id="tienda-virtual-menu-drawer"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {categorias.map((categoria) => (
                    <MenuItem
                      key={categoria.id}
                      onClick={() => handleCategoryClick(categoria.id)} // Usamos el slug en lugar del id
                    >
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                </Menu>
              </List>
            </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default BarraPrincipal;
