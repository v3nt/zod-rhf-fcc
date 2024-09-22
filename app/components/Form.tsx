import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, FormData, ValidFieldNames } from "@/types";
import { formFieldsList } from "../data/appContentData";
import axios from "axios";
import InputText from "./InputText";
import { InputSelect } from "./InputSelect";

const Form = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const onSubmit = async (data: FormData) => {
    console.log("form data", data);
    try {
      const response = await axios.post("/api/form", {
        ...data,
      });

      const { errors = {} } = response.data;

      // server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        addressLineOne: "addressLineOne",
        addressLineTwo: "addressLineTwo",
        city: "city",
        country: "country",
        firstName: "firstName",
        lastName: "lastName",
        postcode: "postcode",
        stateOrCounty: "stateOrCounty",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      // or better find all
      Object.keys(fieldErrorMapping).map((field) => {
        setError(fieldErrorMapping[field], {
          type: "server",
          message: errors[field],
        });
      });

      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }

      console.log("fieldErrorMapping", fieldErrorMapping);
    } catch (error) {
      // gen API error
      console.log("issues!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-columns-1">
        <h1>Zod & React Hook form</h1>

        {/* 
        Hardcoded field inputs work
         */}

        {/* <FormField
          type="text"
          placeholder="firstName"
          name="firstName"
          register={register}
          error={errors.firstName}
          label="firstName"
          valueAsNumber={false}
        />
        <FormField
          type="text"
          placeholder="lastName"
          name="lastName"
          register={register}
          error={errors.lastName}
          label="lastName"
          valueAsNumber={false}
        />
        <FormField
          type="text"
          placeholder="addressLineOne"
          name="addressLineOne"
          register={register}
          error={errors.addressLineOne}
          label="addressLineOne"
          valueAsNumber={false}
        />
        <FormField
          type="text"
          placeholder="addressLineTwo"
          name="addressLineTwo"
          register={register}
          error={errors.addressLineTwo}
          label="addressLineTwo"
          valueAsNumber={false}
        />
        <FormField
          type="text"
          placeholder="city"
          name="city"
          register={register}
          error={errors.city}
          label="city"
          valueAsNumber={false}
        />
        <FormField
          type="text"
          placeholder="postcode"
          name="postcode"
          register={register}
          error={errors.postcode}
          label="postcode"
          valueAsNumber={false}
        />

        <FormField
          type="text"
          placeholder="stateOrCounty"
          name="stateOrCounty"
          register={register}
          error={errors.stateOrCounty}
          label="stateOrCounty"
          valueAsNumber={false}
        /> */}

        {/* <FormField
          // effin name has to be hardcoded as string - why?!
          error={errors[formFieldsList[6].name]}
          label={formFieldsList[6].label}
          name={`${formFieldsList[6].name}`}
          placeholder={formFieldsList[6].placeholder}
          register={register}
          type={formFieldsList[6].type}
          valueAsNumber={formFieldsList[6].valueAsNumber}
        /> */}

        {/* this loop doesn't register the inputs */}

        {formFieldsList &&
          formFieldsList.map((field) => {
            return (
              <div key={field.name}>
                {field.type === "text" && (
                  <InputText
                    error={errors[field.name]}
                    label={field.label}
                    name={`${field.name}`}
                    placeholder={field.placeholder}
                    register={register}
                    required={field.required}
                    type={field.type}
                    valueAsNumber={field.valueAsNumber}
                  />
                )}

                {/* {field.type === "select" && field.options?.length && (
                  <InputSelect
                    error={errors[field.name]}
                    label={field.label}
                    name={`${field.name}`}
                    placeholder={field.placeholder}
                    register={register}
                    type={field.type}
                    valueAsNumber={field.valueAsNumber}
                    options={field.options}
                  />
                )} */}
              </div>
            );
          })}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
