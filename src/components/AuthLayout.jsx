import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import "@radix-ui/themes/styles.css";
import {Spinner} from "@radix-ui/themes"

// eslint-disable-next-line react/prop-types
function Protected({children, authentication = true}) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.status)



    useEffect(()=>{
        if(authentication && authStatus != authentication){
            navigate('/login')
        }else if(!authentication && authStatus != authentication){
            navigate('/')
        }
        setLoading(false)

    } , [authStatus, navigate, authentication])


  return loading? (
    <Spinner size="3"/>
  ):(
    <>{children}</>
    
  )
}

export default Protected