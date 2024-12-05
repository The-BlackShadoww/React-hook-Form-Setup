"use client";

import React from "react";
import FieldSet from "./FieldSet";
import Field from "./Field";
import { useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface FormData {
  fname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });

  const formSubmit = (data: FormData) => {
    console.log(data);

    setError("root.random", {
      message: `User not found`,
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
          <Field label="Full Name">
            <input
              {...register("fname", { required: "Full name is required" })}
              type="text"
              name="fname"
              id="fname"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />{" "}
            <ErrorMessage
              errors={errors}
              name="fname"
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
              className={`w-full p-2 border border-gray-300 rounded-md ${
                !!errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
          </Field>
        </FieldSet>
        <FieldSet label="Socials">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <Field label="Social Name">
                  <input
                    {...register(`socials[${index}].name`)}
                    type="text"
                    id={`socials.${index}.name`}
                    name={`socials.${index}.name`}
                  />
                </Field>
              </div>
            );
          })}
          <button
            className="bg-orange-500 rounded-sm p-2 w-40"
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
