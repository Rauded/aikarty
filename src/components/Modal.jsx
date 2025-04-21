/**
 * This file defines a React component called Modal.
 * A "modal" is a popup window that appears on top of the main content, often used to show important information or ask the user for input.
 * This Modal component shows its content in the center of the screen and darkens the background.
 *
 * Usage example:
 * <Modal isOpen={isModalOpen} onClose={closeModal}>Some content here</Modal>
 */

/**
 * The Modal component takes three props:
 * - isOpen: a boolean (true/false) that controls whether the modal is visible.
 * - onClose: a function to call when the user wants to close the modal (like clicking the close button or the background).
 * - children: the content you want to show inside the modal.
 */
const Modal = ({ isOpen, onClose, children }) => {
  // If isOpen is false, don't show anything (return null means render nothing).
  if (!isOpen) return null;

  return (
    // This <div> covers the whole screen with a semi-transparent black background.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* This <div> is the actual modal box that appears in the center of the screen. */}
      <div className="relative w-full max-w-md mx-4 md:mx-0 bg-white rounded-lg shadow-lg p-4 md:p-8">
        {/* This button is the "X" in the top-right corner that lets the user close the modal.
            When clicked, it calls the onClose function passed as a prop. */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 min-h-[44px] w-10 h-10 flex items-center justify-center text-2xl text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* This <div> holds the content you want to show inside the modal.
            {children} means whatever you put between <Modal> and </Modal> will appear here. */}
        <div className="overflow-y-auto max-h-[70vh] pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// This line makes the Modal component available for use in other files.
export default Modal;