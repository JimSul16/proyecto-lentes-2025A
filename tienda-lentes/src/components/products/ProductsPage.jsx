import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 1, name: 'Lentes Ray-Ban Aviator', image: '/images/rayban.webp', price: 150 },
  { id: 2, name: 'Lentes Oakley Holbrook', image: '/images/oakley.webp', price: 120 },
  { id: 3, name: 'Lentes Ray-Ban Clubmaster', image: '/images/clubmaster.webp', price: 140 },
  { id: 4, name: 'Lentes Oakley Frogskins', image: '/images/frogskins.png', price: 130 },
  { id: 5, name: 'Lentes Ray-Ban Wayfarer', image: '/images/wayfarer.png', price: 160 },
  { id: 6, name: 'Lentes Oakley Flak Jacket', image: '/images/flak.webp', price: 170 },
  { id: 7, name: 'Lentes Persol 714', image: '/images/persol.png', price: 180 },
  { id: 8, name: 'Lentes Maui Jim', image: '/images/maui.webp', price: 200 },
  { id: 9, name: 'Lentes Gucci GG0061S', image: '/images/gucci.webp', price: 250 },
];

export default function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Nuestro catálogo de lentes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(({ id, name, image, price }) => (
          <div key={id} className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col items-center">
            <img src={image} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-lg font-semibold mb-2 text-center">{name}</h2>
            <p className="mb-2 font-semibold text-amber-700">${price.toFixed(2)}</p>

            <Link
              to={`/product/${id}`}
              className="mt-auto inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition mb-2"
            >
              Ver detalles
            </Link>

            <button
              onClick={() => addToCart({ id, name, image, price, quantity: 1 })}
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
