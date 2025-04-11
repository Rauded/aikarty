const Spinner = ({ message = '' }) => {
  return (
    <div className="">
      <div className=""></div>
      {message && <p className="">{message}</p>}
    </div>
  );
};

export default Spinner;