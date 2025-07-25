import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { useCart } from '../../context/CartContext';
import CartIcon from '../ui/CartIcon';

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            ÓpticaLens
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-amber-500 transition">Inicio</Link>
            <Link to="/products" className="font-medium hover:text-amber-500 transition">Productos</Link>
            <Link to="/brands" className="font-medium hover:text-amber-500 transition">Marcas</Link>

            {!user && (
              <Link to="/login" className="font-medium hover:text-amber-500 transition">Login</Link>
            )}

            {user && (
              <>
                <span className="text-sm text-gray-600">Hola, {user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                >
                  Cerrar sesión
                </button>
              </>
            )}

            <Link to="/cart" className="relative">
              <CartIcon itemCount={itemCount} /> {}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
