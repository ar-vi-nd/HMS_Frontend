import React, { useEffect, useId } from 'react';

const Input = ({ type, value, setValue, placeholder,label, className }) => {

    const id = useId(); // Generate a unique id for accessibility purposes
  
//   useEffect(() => {
//     if (!value && predefined) {
//       setValue(predefined); // Set default value if the input is empty and predefined is provided
//     }
//   }, [value, predefined, setValue]);

// console.log({ type, value, setValue, placeholder,label })

  return (
    <>
   {label && <label htmlFor={id}>{label}</label>}
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`border rounded-lg md:${className?className:"w-full"}  p-2 `}
      />
    </>
  );
};

export default Input;
