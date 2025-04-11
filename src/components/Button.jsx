const VARIANT_CLASSES = {
  primary: '',
  secondary: '',
  danger: '',
};

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  // Remove the duplicated baseClasses - it's already included in VARIANT_CLASSES.primary
  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const disabledClasses = '';

  return (
    <button
      className={`${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;