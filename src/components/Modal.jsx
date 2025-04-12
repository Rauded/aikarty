const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4 md:mx-0 bg-white rounded-lg shadow-lg p-4 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 min-h-[44px] w-10 h-10 flex items-center justify-center text-2xl text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="overflow-y-auto max-h-[70vh] pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;