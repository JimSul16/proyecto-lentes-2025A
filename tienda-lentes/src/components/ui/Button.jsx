export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition ${className}`}
    >
      {children}
    </button>
  );
}