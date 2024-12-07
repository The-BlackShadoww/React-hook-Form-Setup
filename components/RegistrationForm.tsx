"use client";

import React from "react";
import FieldSet from "./FieldSet";
import Field from "./Field";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import NumberInput from "./NumberInput";
interface SocialHandle {
  name: string;
  url: string;
}

interface FormData {
  picture: string;
  fname: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  socials: SocialHandle[];
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  // Watch specific fields or the entire form
  const watchedData = watch(); // To watch the entire form data
  const watchedAge = watch("age"); // To watch only the 'age' field
  const watchedFname = watch("fname"); // To watch only the 'age' field

  console.log("Form Data:", watchedData); // Logs real-time form data
  console.log("Watched Age:", watchedAge); // Logs real-time 'age' value
  console.log("Watched Full Name:", watchedFname); // Logs real-time 'age' value

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });

  const formSubmit = (data: FormData) => {
    console.log(data);

    setError("root.random", {
      message: `Registration unsuccessful`,
      type: "random",
    });
  };
  return (
    <main className="size-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-[580px] flex flex-col gap-y-4 mb-20 p-4 border"
      >
        <FieldSet label="Registration">
          <Field label="Picture (Type has to be file)">
            <input
              {...register("picture", {
                required: "Picture is required",
              })}
              type="file"
              id="picture"
              name="picture"
            />
            <ErrorMessage
              errors={errors}
              name="picture"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </Field>
          <Field label="Full Name">
            <input
              {...register("fname", { required: "Full name is required" })}
              type="text"
              name="fname"
              id="fname"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />{" "}
            <ErrorMessage
              errors={errors}
              name="fname"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </Field>
          {/* Handling external component with Controller */}
          <Field label="Age (This is an external component)">
            <Controller
              name="age"
              control={control}
              defaultValue={1}
              render={({ field: { ref, ...field } }) => (
                <NumberInput
                  id="age"
                  className={`p-2 border box-border w-full rounded-md text-black ${
                    !!errors.age ? "border-red-500" : "border-gray-200"
                  }`}
                  {...field}
                />
              )}
              rules={{
                max: { value: 100, message: "Age can between 0 to 100" },
              }}
            />
            <ErrorMessage
              errors={errors}
              name="age"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </Field>
          <Field label="Email">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />{" "}
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </Field>
          <Field label="Password">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p className="text-red-500" key={type}>
                    {message}
                  </p>
                ))
              }
            />
          </Field>{" "}
          <Field label="Confirm password">
            <input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className={`w-full p-2 border border-gray-300 rounded-md text-black${
                !!errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
          </Field>
        </FieldSet>
        <FieldSet label="Socials">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex justify-between items-center w-max"
              >
                <Field label="Social Name">
                  <input
                    className="p-2 border box-border w-full rounded-md"
                    {...register(`socials[${index}].name` as keyof FormData)}
                    type="text"
                    id={`socials.${index}.name`}
                    name={`socials.${index}.name`}
                  />
                </Field>
                <Field label="Social URL">
                  <input
                    className="p-2 border box-border w-full rounded-md"
                    type="text"
                    {...register(`socials[${index}].url` as keyof FormData)}
                    id={`socials[${index}].url`}
                    name={`socials[${index}].url`}
                  />
                </Field>
                <button
                  onClick={() => remove(index)}
                  className="mt-8 mr-2 text-2xl"
                >
                  &#8722;
                </button>
              </div>
            );
          })}
          <button
            className="bg-orange-500 rounded-sm p-2 w-40 mt-4"
            onClick={() => append({ name: "", url: "" })}
          >
            Add A Social Handle
          </button>
        </FieldSet>
        {/* Global error */}
        <div className="my-2">
          <p className="text-red-500 font-bold">
            {errors?.root?.random?.message}
          </p>
        </div>
        <Field>
          <button type="submit" className="w-full bg-green-500 rounded-sm p-2">
            Submit
          </button>
        </Field>
      </form>
    </main>
  );
};

export default RegistrationForm;
