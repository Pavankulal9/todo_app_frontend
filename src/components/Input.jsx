import { AiFillEye } from "react-icons/ai";

const Input = ({
  type = "text",
  label,
  placeholder,
  Name,
  value,
  handleChange,
  handleBur,
  showPassword = null,
  setShowPassword,
  autoComplete = "",
}) => {
  return (
    <div className="input-container">
      <label htmlFor={Name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={Name}
        value={value}
        onChange={handleChange}
        onBlur={handleBur}
        autoComplete={autoComplete}
      />
      {showPassword !== null && (
        <AiFillEye
          onClick={() => setShowPassword(!showPassword)}
          style={{ color: `${showPassword ? "red" : "#fff"}` }}
        />
      )}
    </div>
  );
};

export default Input;
