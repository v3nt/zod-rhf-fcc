import { ChangeEvent } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type ZodConfig = {
  min: number;
  max: number;
  postcode: number;
};

export interface SelectOption {
  label: string;
  optionValue: string;
  selected?: boolean;
}

export type FormField = {
  cssClasses: string;
  error: boolean | undefined | any;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  validationChecks?: string;
  type: string;
  options?: SelectOption[];
  selected?: boolean;
  valueAsNumber?: boolean;
};

export type FormFields = FormField[];

export type FormData = {
  addressLineOne: string;
  addressLineTwo: string;
  postcode: string;
  stateOrCounty: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
};

export type FormFieldProps = {
  error: FieldError | undefined | keyof typeof FormData;
  label?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FormData>; // wtf should this be
  required?: boolean;
  type: string;
  valueAsNumber?: boolean;
  zodConfig?: ZodConfig; // TODO: config built via main array or fields
};

export interface InputSelectProps
  extends Omit<FormFieldProps, "handleInputChange"> {
  options: SelectOption[];
}

export type ValidFieldNames =
  | "addressLineOne"
  | "addressLineTwo"
  | "city"
  | "country"
  | "firstName"
  | "lastName"
  | "postcode"
  | "stateOrCounty";

// TODO. postcode only valid for UK. Would need to use another service for changing countries.
// Maybe one that can check if that postcode (or zipcode etc) exists
export const UserSchema: ZodType<FormData> = z.object({
  firstName: z.string().min(2, { message: "Needs at least 2 Characters" }),
  lastName: z.string().min(2, { message: "Needs at least 2 Characters" }),
  addressLineOne: z.string().min(8, { message: "Needs at least 8 Characters" }),
  addressLineTwo: z.string().min(8, { message: "Needs at least 8 Characters" }),
  stateOrCounty: z.string(),
  city: z.string(),
  country: z.string(),
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
});
