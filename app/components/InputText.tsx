import { FormFieldProps } from "@/types";

const InputText: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
}) => {
  const reg = register(name, valueAsNumber);
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        // issues when value not a string
        {...reg}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
};

export default InputText;
