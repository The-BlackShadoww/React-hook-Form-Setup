"use client";
import React from "react";

interface FieldProps {
  label?: string;
  children: React.ReactNode;
  htmlFor?: string;
  error?: string;
}
const Field = ({ label, children, htmlFor, error }: FieldProps) => {
  //   const id = htmlFor || Math.random().toString(36).substring(7);
  const id = htmlFor || getChildId(children);
  return (
    <div className=" flex flex-col items-start justify-start mt-2 p-0 w-full mr-2">
      {label && (
        <label htmlFor={id} className="mb-1">
          {label}
        </label>
      )}
      {children}
      {!!error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

const getChildId = (children: React.ReactNode): string | undefined => {
  //   const child = React.Children.only(children) as React.ReactElement;
  const child = React.Children.toArray(children)[0] as React.ReactElement;

  if ("id" in child?.props) {
    return child.props.id;
  }
};

export default Field;
