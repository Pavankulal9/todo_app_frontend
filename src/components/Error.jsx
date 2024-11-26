const Error = ({ error }) => {
  return error ? (
    <div className="input-error">
      <p>{error}</p>
    </div>
  ) : null;
};

export default Error;
