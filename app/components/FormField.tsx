import { FormFieldProps } from "@/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && (
        <span className="error-message">
          {label} {error.message}
        </span>
      )}
    </>
  );
};

export default FormField;
