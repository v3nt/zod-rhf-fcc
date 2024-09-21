import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, FormData, ValidFieldNames } from "@/types";
import { formFieldsList } from "../data/appContentData";
import axios from "axios";
import { InputSelect } from "./InputSelect";

const Form = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/form", {
        ...data,
      });

      const { errors = {} } = response.data;

      // server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        firstName: "firstName",
        email: "email",
        postcode: "postcode",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
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
    } catch (error) {
      // gen API error
      console.log("issues!", error);
    }
  };
  const getFieldError = (field: string) => {
    console.log(errors);
    console.log(field);
    return `${field}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-columns-1">
        <h1>Zod & React Hook form</h1>

        {formFieldsList &&
          formFieldsList.map((field) => {
            return (
              <div key={field.id}>
                {field.type === "text" && (
                  <FormField
                    type={field.type}
                    placeholder={field.name}
                    name={field.name}
                    register={register}
                    error={errors.firstName}
                    label={field.label}
                  />
                )}
                {field.type === "select" && field.options && (
                  <InputSelect
                    type={field.type}
                    placeholder={field.name}
                    name={field.name}
                    register={register}
                    error={errors.firstName}
                    cssClasses={field.cssClasses}
                    id={field.id}
                    label={field.label}
                    options={field.options}
                  />
                )}
              </div>
            );
          })}

        <FormField
          type={formFieldsList[0].type}
          placeholder={formFieldsList[0].name}
          name={formFieldsList[0].name}
          register={register}
          error={errors.firstName}
        />
        <FormField
          type="text"
          placeholder="GitHub URL"
          name="githubUrl"
          register={register}
          error={errors.githubUrl}
        />
        <FormField
          type="text"
          placeholder="Postcode"
          name="postcode"
          register={register}
          error={errors.postcode}
        />
        <FormField
          type="number"
          placeholder="Years of Experience (1 - 10)"
          name="yearsOfExperience"
          register={register}
          error={errors.yearsOfExperience}
          valueAsNumber
        />
        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />
        <FormField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
