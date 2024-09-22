import { FormFieldProps } from "@/types";

const InputText: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
  required,
}) => {
  const reg = register(name, valueAsNumber);

  const containerClasses = ["relative "];
  if (error)
    containerClasses.push(
      "[&>input]:text-red-800 [&>input]:bg-red-50 [&>input]:outline [&>input]:outline-red-200"
    );
  const inputClasses = [""];
  inputClasses.push(
    "w-full px-3 pt-4 py-3 rounded-md focus:outline focus:outline-primary-500 block appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  );
  const labelClasses = [""];
  labelClasses.push(
    "text-ash-500 absolute text-sm duration-200 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
  );

  return (
    <div className={containerClasses.join(" ")}>
      <input
        id={name}
        className={inputClasses.join(" ")}
        type={type}
        placeholder={placeholder}
        // issues when value not a string
        {...reg}
      />
      {error && <span className="error-message">{error.message}</span>}
      <label htmlFor={name} className={labelClasses.join(" ")}>
        {label} {required} {!required && "(optional)"}
      </label>
    </div>
  );
};

export default InputText;
