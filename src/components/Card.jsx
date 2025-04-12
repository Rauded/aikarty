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