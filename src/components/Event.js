import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const Event = () => {
  const navigate = useNavigate()
  const [data,setdata] = useState("")
  useEffect(()=>{
    navigate("/")
  },[])
  return (
    <>
    <Loading/>
    </>
  )
}

export default Event