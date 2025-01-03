"use client";

import React from "react";
import Field from "./Field";
import FieldSet from "./FieldSet";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const formSubmit = (data: FormData) => {
    console.log(data);

    const user = { email: "x@example.com", password: "123456789" };
    const found = data.email === user.email && data.password === user.password;

    if (!found) {
      setError("root.random", {
        message: `User not found`,
        type: "random",
      });
    }
  };

  return (
    <main className="size-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-[580px] flex flex-col gap-y-4 mt-20 p-4 border"
      >
        <FieldSet label="Log In">
          <Field label="Name">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className={`w-full ${
                !!errors.name ? "border-2 border-red-500" : "border-none"
              }`}
            />
            {/* <ErrorMessage errors={errors} name="name" /> */}
            <ErrorMessage
              errors={errors}
              name="name"
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
              className={`w-full ${
                !!errors.email ? "border-2 border-red-500" : "border-none"
              }`}
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
              className={`w-full ${
                !!errors.password ? "border-2 border-red-500" : "border-none"
              }`}
            />
          </Field>
          {/* Global error */}
          <div className="my-2">
            <p className="text-red-500 font-bold">
              {errors?.root?.random?.message}
            </p>
          </div>
          <Field>
            <button type="submit" className="w-full bg-blue-500 rounded-sm p-2">
              Submit
            </button>
          </Field>
        </FieldSet>
      </form>
    </main>
  );
};

export default Form;
