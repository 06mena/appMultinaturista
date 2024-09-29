import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
const CartProvider = ({ children }) => {
  // Estado inicial del carrito
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartProducts');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Efecto para guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      // Verifica si el producto ya está en el carrito
      const existingProduct = prevCart.find(item => item.id === productToAdd.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? {
              ...item,
              quantity: item.quantity + (productToAdd.quantity || 1),
              precio: productToAdd.precio,  // Asegurarse de mantener el precio original
              precio_final: productToAdd.en_oferta && typeof productToAdd.precio_final === 'number'
                ? productToAdd.precio_final
                : item.precio_final || item.precio,
            }
            : item
        );
      } else {
        // Si el producto no está en el carrito, añádelo con la cantidad especificada
        return [...prevCart, {
          ...productToAdd,
          quantity: productToAdd.quantity || 1,
          precio: productToAdd.precio,  // Guardar el precio original
          precio_final: productToAdd.en_oferta && typeof productToAdd.precio_final === 'number'
            ? productToAdd.precio_final
            : productToAdd.precio,
        }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: parseInt(quantity, 10) || 1 }
          : item
      )
    );
  };

  // Obtener el subtotal de los productos en el carrito, considerando precios con descuento
  const getSubtotal = () => {
    return cart.reduce((total, product) => {
      // Usar el precio con descuento si el producto está en oferta, de lo contrario usar el precio original
      const price = product.precio_final && product.en_oferta
        ? parseFloat(product.precio_final)
        : parseFloat(product.precio) || 0;

      return total + price * (product.quantity || 1);
    }, 0);
  };

  // Obtener el total (incluyendo costos adicionales)
  const getTotal = () => {
    const subtotal = getSubtotal();
    const shippingCost = 5000; // Suponiendo un costo fijo de envío
    return subtotal + shippingCost;
  };

  // Agrupar productos idénticos y sumar sus cantidades
  const groupCartItems = () => {
    return cart.reduce((acc, item) => {
      const existingItem = acc.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // Sumar cantidades si el producto ya existe
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
      } else {
        // Mantener tanto el precio original como el precio final
        acc.push({
          ...item,
          quantity: item.quantity || 1,
          precio: item.precio, // Precio original sin descuento
          precio_final: item.precio_final
        });
      }

      return acc;
    }, []);
  };


  // Obtener el número total de productos en el carrito
  const getTotalItems = () => {
    return groupCartItems().reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]); // Esto vacía el carrito
  };

  // Proveer el contexto
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getSubtotal,
        getTotal,
        groupCartItems,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
const useCart = () => useContext(CartContext);

export { CartContext, CartProvider, useCart };
