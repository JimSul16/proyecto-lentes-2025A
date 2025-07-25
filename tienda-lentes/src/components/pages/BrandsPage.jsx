export default function BrandsPage() {
  const brands = [
    {
      name: "ANNE KLEIN",
      logo: "/images/brands/anne-klein.jpg"
    },
    {
      name: "AIX",
      logo: "/images/brands/aix.webp"
    },
    {
      name: "ARMELIEX",
      logo: "/images/brands/armeliex.jpg"
    },
    {
      name: "AURA",
      logo: "/images/brands/aura.jpg"
    },
    {
      name: "BALENCIAGA",
      logo: "/images/brands/balenciaga.jpg"
    }
  ];

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-amber-600">Marcas de Lentes</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-200 hover:border-amber-500 w-full max-w-xs text-center"
          >
            <img
              src={brand.logo}
              alt={brand.name + " logo"}
              className="w-24 h-24 object-contain mx-auto mb-3 transition-transform duration-300 hover:scale-110"
            />
            <h2 className="text-lg font-semibold text-gray-800">{brand.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
