import React from 'react'
import { useDispatch } from 'react-redux'
import firebaseAuthService from '../baas/firebase/auth'
import { logout} from '../store/authSlice';


function LogoutBtn() {
    const dispatch = useDispatch();
    const handleClick = ()=>{
        try{
           firebaseAuthService.logout().then(()=>{
            dispatch(logout()) 
            console.log(firebaseAuthService.getCurrentUser())
          })
          .catch((error)=>console.log(error))   
        }catch(error){
            console.log(error)
        }
        
    }
  return (
    <button className="bg-black p-2 text-white rounded-full " onClick={handleClick}>Logout</button>
  )
}

export default LogoutBtn;