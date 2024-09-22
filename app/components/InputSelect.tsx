import React, { FC } from "react";

import { InputSelectProps } from "@/types";
import { SelectOption } from "@/types";

export const InputSelect: FC<InputSelectProps> = ({
  id,
  label,
  options,
  required,
  handleInputChange,
  validationChecks,
  errors,
  name,
  register,
  valueAsNumber,
}) => {
  const containerClasses = ["relative "];
  if (errors)
    containerClasses.push(
      "[&>input]:text-red-800 [&>input]:bg-red-50 [&>input]:outline [&>input]:outline-red-200"
    );
  const inputClasses = [""];
  inputClasses.push(
    "bg-selectarrow bg-right bg-no-repeat bg-[length:12px_12px] bg-[right_15px_top_18px] w-full px-3 pt-4 py-3 rounded-md dark:border-gray-600 focus:outline focus:outline-primary-500 block appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  );
  const labelClasses = [""];
  labelClasses.push(
    "text-ash-500 absolute text-sm duration-200 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
  );

  return (
    <div>
      <div className={containerClasses.join(" ")}>
        <select
          className={inputClasses.join(" ")}
          data-validation-checks={validationChecks}
          id={id}
          name={name}
          onChange={handleInputChange}
          required={required}
          defaultValue="GB"
          {...register(name, { valueAsNumber })}
        >
          {options.length &&
            options.map((item: SelectOption, index: number) => {
              return (
                <option value={item.optionValue} key={index}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <label htmlFor={id} className={labelClasses.join(" ")}>
          {label} {!required && "(optional)"}
        </label>
      </div>
    </div>
  );
};
