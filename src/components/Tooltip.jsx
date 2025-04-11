const Tooltip = ({ text, children }) => {
  return (
    <div className="">
      {children}
      <div className="">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;