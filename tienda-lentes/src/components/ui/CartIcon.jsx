import { FaShoppingCart } from 'react-icons/fa';

export default function CartIcon({ itemCount = 0 }) {
  return (
    <div className="relative">
      <FaShoppingCart className="text-xl" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}