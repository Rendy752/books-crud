import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}:
      </label>
      <input
        name={name}
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormField;
