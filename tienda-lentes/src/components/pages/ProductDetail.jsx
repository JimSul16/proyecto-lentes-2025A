import { useParams } from 'react-router-dom';
import Button from "../ui/Button";
;

export default function ProductDetail() {
  const { id } = useParams();
  
  const product = {
    id: 1,
    name: 'Lentes Ray-Ban Aviator',
    price: 150,
    description: 'Lentes clásicos con montura dorada y lentes verdes.',
    image: '/images/rayban.webp'
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-lg shadow"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-amber-600 font-bold my-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <Button>Añadir al carrito</Button>
        </div>
      </div>
    </main>
  );
}