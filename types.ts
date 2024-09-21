import { ChangeEvent } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type ZodConfig = {
  min: number;
  max: number;
  postcode: number;
};

interface selectOption {
  label: string;
  optionValue: string;
  selected?: boolean;
}

export interface InputSelectProps
  extends Omit<FormFieldProps, "handleInputChange"> {
  handleInputChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: selectOption[];
  error: FieldError | undefined;
}

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  label?: string;
  register?: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  zodConfig?: ZodConfig; // TODO: config built via main array or fields
};

// repetition of all these field names adds a lot of admin for types, form building & zod config.
// TODO: find a way to configure all form inputs, types and zod requirements from one array
export type FormData = {
  email: string;
  addressLineOne: string;
  addressLineTwo: string;
  state: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  postcode: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
};

const requiredFieldMessage = "Required field";

// TODO. postcode only valid for UK. Would need to use another service for changing countries.
// Maybe one that can check if that postcode (or zipcode etc) exists
export const UserSchema: ZodType<FormData> = z
  .object({
    firstName: z.string().min(2, { message: "Needs at least 2 Characters" }),
    lastName: z.string().min(2, { message: "Needs at least 2 Characters" }),
    addressLineOne: z
      .string()
      .min(10, { message: "Needs at least 10 Characters" }),

    addressLineTwo: z.string(),
    state: z.string(),
    city: z.string(),
    country: z.string(),
    email: z.string().email(),
    postcode: z
      .string()
      .min(5, { message: "Needs at least 5 Characters" })
      .max(8, { message: "Too many" })
      .refine(
        (value) =>
          /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/.test(
            value ?? ""
          ),
        { message: "Not a valid postcode" }
      ),
    githubUrl: z
      .string()
      .url()
      .includes("github.com", { message: "Invalid GitHub URL" }),
    yearsOfExperience: z
      .number({
        required_error: requiredFieldMessage,
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(30, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
