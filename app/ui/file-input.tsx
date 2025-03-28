import clsx from "clsx";
import React, { forwardRef } from "react";

interface FileInputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  onChange: (files: File[]) => void;
  value?: File[];
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const {
    label,
    placeholder,
    icon,
    error,
    onChange,
    value = [],
    ...rest
  } = props;

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = files.filter((file) => file.type === "application/pdf");
    onChange(validFiles);
  };

  return (
    <div className="mb-4">
      <label className="block text-primary mb-1 font-medium">{label}</label>
      <div
        className={
          clsx("relative flex items-center border rounded-md p-2", {
            "border-red-500": error,
            "border-gray-300 focus:border-primary focus:ring-primary": !error,
          }) + " focus:outline-none"
        }
      >
        <div className="flex-grow">
          <input
            {...rest}
            type="file"
            accept=".pdf"
            onChange={handleFileSelection}
            className="w-full py-2 px-10 hidden"
            id="pdf_link"
          />
          <label
            htmlFor="pdf_link"
            className="cursor-pointer text-sm text-gray-600"
          >
            {value.length > 0
              ? `${value.length} archivo(s) seleccionado(s)`
              : placeholder}
          </label>
        </div>
        {icon && (
          <div className="absolute right-3 text-primary">
            <span className="icon">{icon}</span>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
});

export default FileInput;
