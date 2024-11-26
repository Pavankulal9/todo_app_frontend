import Error from "./Error";
import Input from "./Input";

const FormCreator = ({
  formik,
  loading,
  errorMessage,
  inputs,
  buttonText,
  showPassword,
  setShowPassword = null,
}) => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  console.log(touched);
  return (
    <div className="form">
      {errorMessage && <Error error={errorMessage} />}
      <form onSubmit={handleSubmit}>
        {inputs &&
          inputs.map((input) => (
            <>
              <Input
                key={input.name}
                type={
                  input.type === "password" && showPassword
                    ? "text"
                    : input.type
                }
                Name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                value={values[input.name]}
                handleChange={handleChange}
                handleBur={handleBlur}
                autoComplete={input.name === "password" ? "new-password" : null}
                showPassword={input.type === "password" ? showPassword : null}
                setShowPassword={input.type === "password" && setShowPassword}
              />
              {errors[input.name] && touched[input.name] ? (
                <Error error={errors[input.name]} />
              ) : null}
            </>
          ))}
        <button disabled={loading} type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default FormCreator;
