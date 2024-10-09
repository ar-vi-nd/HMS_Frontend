import React, { useEffect, useId } from 'react';

const Input = ({ type, value, setValue, predefined, placeholder,label }) => {

    const id = useId(); // Generate a unique id for accessibility purposes
  
  useEffect(() => {
    if (!value && predefined) {
      setValue(predefined); // Set default value if the input is empty and predefined is provided
    }
  }, [value, predefined, setValue]);

  return (
    <>
   {label && <label htmlFor={id}>{label}</label>}
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border rounded-lg w-full p-2 md:w-1/5"
      />
    </>
  );
};

export default Input;
