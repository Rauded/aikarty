const Spinner = ({ message = '' }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      {message && <p className="text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default Spinner;