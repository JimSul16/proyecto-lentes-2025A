import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-800 font-bold my-2">${product.price}</p>
        <Button className="w-full">Añadir al carrito</Button>
      </div>
    </div>
  );
}