const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="">
      <div className="">
        <button
          onClick={onClose}
          className=""
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;