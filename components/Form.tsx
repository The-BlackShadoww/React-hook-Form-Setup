import React from "react";
import Field from "./Field";
import FieldSet from "./FieldSet";

const Form = () => {
  return (
    <div className="size-full flex justify-center items-center">
      <form className="w-[580px] flex flex-col gap-y-4 mt-20 p-4 border">
        <FieldSet label="User Details">
          <Field label="Name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full"
            />
          </Field>
          <Field label="Confirm password">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className="w-full"
            />
          </Field>
          <button type="submit" className="bg-blue-500 rounded-sm">
            Submit
          </button>
        </FieldSet>
      </form>
    </div>
  );
};

export default Form;
