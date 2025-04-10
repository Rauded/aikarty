const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white shadow rounded p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;