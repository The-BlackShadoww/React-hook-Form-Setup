import React from "react";

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber || 0;
    onChange(newValue);
  };

  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default NumberInput;

// import React from "react";

// const NumberInput = ({ value, onChange, ...props }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.valueAsNumber || 0;
//     onChange(value);
//   };

//   return (
//     <input
//       type="number"
//       min={0}
//       value={value}
//       onChange={handleChange}
//       {...props}
//     />
//   );
// };

// export default NumberInput;
