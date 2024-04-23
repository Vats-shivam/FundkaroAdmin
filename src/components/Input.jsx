import React from 'react'

const Input = ({type,value,onChange,placeholder,className,px}) => {
  const classes =`w-full cursor-pointer block rounded-lg placeholder-blue-500 focus:outline-none ${px||px-4} py-1 ${className||''}`;
  const renderInput=()=>{
    return (
      <>
      <input value={value} onChange={onChange} type={type} placeholder={placeholder} className={classes} required/>
      </>
    )
  }
  return renderInput();
}

export default Input