/**
 * Alert component
 * Displays a message box styled according to the provided variant.
 * Variants can be: 'success', 'error', 'warning', 'info'.
 * Usage: <Alert variant="error">Error message</Alert>
 */

 // Maps alert variants to their corresponding CSS class names.
const VARIANT_CLASSES = {
  success: '',
  error: '',
  warning: '',
  info: '',
};

/**
 * Alert functional component.
 * @param {string} variant - The type of alert to display (default: 'info').
 * @param {React.ReactNode} children - The content to display inside the alert.
 */
const Alert = ({ variant = 'info', children }) => {
  const classes = VARIANT_CLASSES[variant] || VARIANT_CLASSES.info;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Alert;