/* eslint-disable react/prop-types */
import React from 'react'
import {useId} from 'react'


const Input = React.forwardRef(({
    label, type="text", className="", labelClass="", ...props
}, ref ) => {
    const id = useId()
  return (
    <div>
        {label && <label 
        className={`${labelClass}`}
        htmlFor={id}
        >{label}</label>}
        <input type={type} 
        className={`${className}`} 
        id={id}
        {...props}
        ref={ref} />
    </div>
  )
});

Input.displayName = "Input";


export default Input