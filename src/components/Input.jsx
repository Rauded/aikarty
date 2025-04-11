const Input = ({ label, ...props }) => {
  return (
    <div className="">
      {label && <label className="">{label}</label>}
      <input
        className=""
        {...props}
      />
    </div>
  );
};

export default Input;