const VARIANT_CLASSES = {
  success: '',
  error: '',
  warning: '',
  info: '',
};

const Alert = ({ variant = 'info', children }) => {
  const classes = VARIANT_CLASSES[variant] || VARIANT_CLASSES.info;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Alert;