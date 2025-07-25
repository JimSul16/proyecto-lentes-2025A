import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    async function loadCart() {
      const cartRef = doc(db, "carts", user.uid);
      const docSnap = await getDoc(cartRef);
      if (docSnap.exists()) {
        setCart(docSnap.data().items || []);
      } else {
        setCart([]);
      }
    }
    loadCart();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const saveCart = async () => {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: cart });
    };
    saveCart();
  }, [cart, user]);

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  async function checkout() {
    if (!user) {
      throw new Error("Debes estar logueado para finalizar la compra");
    }
    if (cart.length === 0) {
      throw new Error("Tu carrito está vacío");
    }
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        createdAt: Timestamp.now(),
        status: "pending", 
      });

      setCart([]);
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: [] });

      return true;
    } catch (error) {
      console.error("Error al finalizar compra:", error);
      throw error;
    }
  }

  // Aquí calculamos el total de items sumando todas las cantidades del carrito
  const itemCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, checkout, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
