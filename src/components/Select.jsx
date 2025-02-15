/* eslint-disable react/prop-types */
import React from 'react'
import {useId} from 'react'

function Select({options, className="", label, ...props}, ref) {
    const id = useId()
  return (
    <div>
        {label && <label htmlFor={id}></label>}
        {options && <select id={id}
        className={`${className}`} {...props} 
        name={label}
        ref={ref}>
            {options?.map((option)=> <option key={option} value={option}>{option}</option> )}
        </select>} 
    </div>
  )
}

export default React.forwardRef(Select);