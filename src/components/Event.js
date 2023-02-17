import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Event = () => {
  const navigate = useNavigate()
  const [data,setdata] = useState("")
  useEffect(()=>{
    const data = localStorage.getItem("data")
    console.log(data);
    setdata(data)
  },[])
  return (
    <>
    <h1>Hello </h1>
    
    </>
  )
}

export default Event