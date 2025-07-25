import { useEffect, useRef } from 'react';
import ProductList from '../products/ProductList';

const mockProducts = [
  {
    id: 1,
    name: 'Lentes Ray-Ban Aviator',
    price: 150,
    image: '/images/rayban.webp'
  },
  {
    id: 2,
    name: 'Lentes Oakley Holbrook',
    price: 180,
    image: '/images/oakley.webp'
  }
];

const brands = [
  { name: 'ANNE KLEIN', url: 'https://www.anneklein.com', logo: '/images/brands/anne-klein.jpg' },
  { name: 'AIX', url: 'https://www.aixeyewear.com', logo: '/images/brands/aix.webp' },
  { name: 'ARMELIEX', url: 'https://www.armeliex.com', logo: '/images/brands/armeliex.jpg' },
  { name: 'AURA', url: 'https://www.auraframes.com', logo: '/images/brands/aura.jpg' },
  { name: 'BALENCIAGA', url: 'https://www.balenciaga.com', logo: '/images/brands/balenciaga.jpg' }
];

export default function Home() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth;

        if (isEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container mx-auto py-8 px-4">
      {}
      <section className="bg-gray-900 text-white py-12 mb-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">
          Armazones y Gafas de Sol <span className="text-amber-400">de Diseñador</span>
        </h1>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded">
          Ver Modelos
        </button>
      </section>

      {}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">MARKETPLACE PARA ÓPTICAS DE LATINOAMÉRICA</h2>
        <p className="mb-6">Encuentra las mejores marcas</p>

        <div
          ref={carouselRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <div className="flex gap-6 w-max px-2">
            {brands.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-amber-300 w-48 text-center p-4"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-24 h-24 object-contain mx-auto mb-2"
                />
                <p className="font-semibold text-gray-800">{brand.name}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      {}
      <h1 className="text-3xl font-bold mb-8">Nuestros Lentes</h1>
      <ProductList products={mockProducts} />
    </main>
  );
}
