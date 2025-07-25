import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.cardNumber || form.cardNumber.length !== 16) {
      setError('Número de tarjeta inválido');
      return false;
    }
    if (!form.cardName) {
      setError('El nombre en la tarjeta es obligatorio');
      return false;
    }
    if (!form.expiryDate) {
      setError('La fecha de expiración es obligatoria');
      return false;
    }
    if (!form.cvv || form.cvv.length < 3 || form.cvv.length > 4) {
      setError('CVV inválido');
      return false;
    }
    if (cart.length === 0) {
      setError('El carrito está vacío');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('Debes iniciar sesión para realizar una compra.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart,
        total: totalPrice,
        createdAt: serverTimestamp(),
        paymentInfo: {
          cardName: form.cardName,
          cardNumber: form.cardNumber.replace(/\d{12}(\d{4})/, '**** **** **** $1'),
          expiryDate: form.expiryDate,
        },
      });

      setSuccess(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Error al procesar la compra, intenta más tarde.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">¡Compra realizada con éxito!</h2>
        <p>Gracias por tu compra. Serás redirigido a la página principal...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Checkout - Datos de Pago</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="cardNumber">
            Número de tarjeta
          </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            maxLength="16"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full p-2 border rounded"
            inputMode="numeric"
            pattern="\d*"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="cardName">
            Nombre en la tarjeta
          </label>
          <input
            type="text"
            name="cardName"
            id="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Juan Pérez"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="expiryDate">
              Fecha expiración
            </label>
            <input
              type="month"
              name="expiryDate"
              id="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="w-24">
            <label className="block font-semibold mb-1" htmlFor="cvv">
              CVV
            </label>
            <input
              type="password"
              name="cvv"
              id="cvv"
              maxLength="4"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full p-2 border rounded"
              inputMode="numeric"
              required
            />
          </div>
        </div>

        <p className="font-semibold text-right text-lg">
          Total a pagar: <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          {loading ? 'Procesando...' : 'Pagar Ahora'}
        </button>
      </form>
    </main>
  );
}
