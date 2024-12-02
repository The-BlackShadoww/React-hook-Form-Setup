"use client";
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};

const FieldSet = ({ label, children }: Props) => {
  return (
    <fieldset className="m-2 border-none p-0 w-full">
      {label && <legend className="text-lg font-bold mb-2">{label}</legend>}
      <div className="flex flex-col justify-center self-start">{children}</div>
    </fieldset>
  );
};

export default FieldSet;
