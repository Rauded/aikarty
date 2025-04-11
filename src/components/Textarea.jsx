const Textarea = ({ label, ...props }) => {
  return (
    <div className="">
      {label && <label className="">{label}</label>}
      <textarea
        style={{
          color: '#667197',
          width: 'calc(100% - 5px)',
          height: '430px',
          border: '4px dashed #ccd4f3',
          background: 'rgba(239, 242, 254, 0.2)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '20px',
          cursor: 'pointer',
          flexDirection: 'column'
        }}
        {...props}
      />
    </div>
  );
};

export default Textarea;