/**
 * Card component
 * Provides a styled container for wrapping content, with optional custom class names and props.
 * Usage: <Card className="my-4">Content here</Card>
 */

/**
 * Card functional component.
 * @param {React.ReactNode} children - The content to display inside the card.
 * @param {string} className - Additional CSS classes to apply to the card.
 * @param {object} props - Additional props passed to the div element.
 */
const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`w-full p-4 md:p-6 rounded-lg shadow bg-white text-base md:text-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;