import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, FormData, ValidFieldNames } from "@/types";
import axios from "axios";

const Form = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
    try {
      // const response = await axios.post("/api/form", data); // Make a POST request
      // const response = await fetch("/api/form", {   method: "POST",  body:data});

      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "Not an email",
          githubUrl: "Not a URL",
          yearsOfExperience: "Hello",
          password: 1234,
          confirmPassword: 1234,
        }),
      });

      // const response = await axios.post("/api/form", {
      //   email: "Not an email",
      //   githubUrl: "Not a URL",
      //   yearsOfExperience: "Hello",
      //   password: 1234,
      //   confirmPassword: 1234,
      // });

      // Destructure the 'errors' property from the response data
      const { errors = {} } = response.data;

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        email: "email",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
    } catch (error) {
      console.log("issues!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-columns-1">
        <h1>Zod & React Hook form</h1>
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <FormField
          type="text"
          placeholder="GitHub URL"
          name="githubUrl"
          register={register}
          error={errors.githubUrl}
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
