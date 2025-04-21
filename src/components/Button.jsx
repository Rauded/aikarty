/**
 * Button component
 * Renders a customizable button with support for different visual variants, loading state, and disabled state.
 * Uses Tailwind CSS for styling.
 * Usage: <Button variant="secondary" isLoading={true}>Submit</Button>
 */

// Maps button variants to their corresponding Tailwind CSS class names.
const VARIANT_CLASSES = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

/**
 * Button functional component.
 * @param {React.ReactNode} children - The content to display inside the button.
 * @param {string} variant - The visual style of the button ('primary', 'secondary', 'danger'). Default is 'primary'.
 * @param {boolean} isLoading - If true, shows a loading state and disables the button.
 * @param {boolean} disabled - If true, disables the button.
 * @param {string} className - Additional CSS classes to apply.
 * @param {object} props - Additional props passed to the button element.
 */
const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  // Selects the appropriate variant classes, defaults to 'primary' if not found.
  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  // Placeholder for additional disabled classes if needed.
  const disabledClasses = '';

  // Base Tailwind CSS classes for consistent button styling.
  const baseClasses =
    'min-h-[44px] px-4 py-2 rounded text-base md:text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Show loading text if isLoading is true, otherwise render children */}
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;