import React,{useId, forwardRef} from 'react'


const FormInput = forwardRef(({label,type="text",className="",...props},ref) => {
    const id = useId()
    return (
      <div className='w-full'>
          {label&&<label className='inline-block pl-1 ' htmlFor={id}>
              {label}
              </label>}
          <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} id={id} {...props}></input>
      </div>
    )
})

export default FormInput
