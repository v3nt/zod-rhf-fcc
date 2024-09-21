import { FormFieldProps } from "@/types";

export type FormField = {
  cssClasses: string;
  errors: boolean | undefined;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  validationChecks?: string;
  type: string;
  options?: selectOption[];
  selected?: boolean;
  valueAsNumber?: boolean;
};

interface selectOption {
  label: string;
  optionValue: string;
  selected?: boolean;
}

export type FormFields = FormField[];

export const formFieldsList: FormFields = [
  {
    label: "First name",
    placeholder: "Firstname",
    type: "text",
    id: "firstName",
    name: "firstName",
    cssClasses: "col-span-1",
    required: true,
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "Lastname",
    placeholder: "Lastname",
    type: "text",
    id: "lastName",
    name: "lastName",
    cssClasses: "col-span-1",
    required: true,
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "Address line 1",
    placeholder: "  ",
    type: "text",
    id: "addressLineOne",
    name: "addressLineOne",
    cssClasses: "",
    required: true,
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "Address line 2",
    placeholder: "  ",
    type: "text",
    id: "addressLineTwo",
    name: "addressLineTwo",
    cssClasses: "",
    required: false,
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "City",
    placeholder: "",
    type: "text",
    id: "city",
    name: "city",
    cssClasses: "col-span-1",
    required: true,
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "Postcode",
    placeholder: "",
    type: "text",
    id: "postcode",
    name: "postcode",
    cssClasses: "col-span-1",
    required: true,
    validationChecks: "postcode",
    errors: undefined,
    valueAsNumber: false,
  },
  {
    label: "State",
    placeholder: "state or country",
    type: "text",
    id: "stateOrCounty",
    name: "stateOrCounty",
    cssClasses: "",
    required: true,
    errors: undefined,
    valueAsNumber: false,
  },
  // {
  //   label: "Country",
  //   placeholder: "Country",
  //   type: "select",
  //   id: "country",
  //   name: "country",
  //   cssClasses: "",
  //   required: true,
  //   errors: undefined,
  //   valueAsNumber: false,
  //   options: [
  //     { optionValue: "GB", label: "United Kingdom", selected: true },
  //     { optionValue: "US", label: "United States" },
  //     { optionValue: "NL", label: "Netherlands" },
  //   ],
  // },
];
