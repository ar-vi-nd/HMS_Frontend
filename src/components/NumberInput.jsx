import React from 'react'

const NumberInput = ({label}) => {
  return (
    <div>
        <label>{label}</label>
        <input type="number" />
    </div>
  )
}

export default NumberInput
