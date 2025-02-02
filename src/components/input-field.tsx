import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        <div className="flex gap-1">
          <label className="text-sm font-normal text-gray-900 dark:text-white">{label}</label>
        </div>
        <input
          className="border rounded-lg border-gray-300 dark:border-gray-600 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
          ref={ref}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

    );
  }
);

InputField.displayName = "InputField";

export default InputField;
