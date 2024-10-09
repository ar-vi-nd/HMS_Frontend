import React, { useId } from 'react'

const Checkbox = ({ label, value, setValue }) => {

    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id} className='ml-2'>{label}</label>}
            <input
                id={id}  // Unique id for accessibility purposes
                type="checkbox"
                value={value}
                onChange={() => setValue(!value)}
                className="border rounded-lg cursor-pointer ml-1"
            />
        </div>
    )
}

export default Checkbox
