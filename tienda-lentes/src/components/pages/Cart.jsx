import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, checkout } = useCart();
  const navigate = useNavigate(); 

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-center">Tu carrito está vacío</p>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg">
          {cart.map(product => (
            <div key={product.id} className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>Precio: ${product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                  className="w-16 p-1 border rounded"
                />
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <hr className="my-6" />

          <div className="text-right">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
