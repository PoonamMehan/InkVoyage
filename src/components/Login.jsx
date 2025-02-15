import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import{Input} from "./"
import {Logo} from "./index"
import firebaseAuthService from '../baas/firebase/auth'
import {useDispatch} from 'react-redux'
import {login as storeLogin} from "../store/authSlice.js"
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"

function Login() {
 
    const[errorMsg, setErrorMsg] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState} = useForm()
    const checkingStoredUserData = useSelector((state)=> state.auth.userData)

    const login = async(data) =>{
        setErrorMsg("")
        try{
            const session = await firebaseAuthService.login(data)
            console.log(session)
            if(session){
                let userData = await firebaseAuthService.getCurrentUser()
                console.log(userData)
                if(userData){
                    userData = {
                            uid: userData.uid,
                            email: userData.email,
                            displayName: userData.displayName,
                        
                    }
                    dispatch(storeLogin(userData))
                }
                console.log(checkingStoredUserData)
                // navigate("/")
                setErrorMsg("Some error in fetching the current user data: "+ userData)
                console.log(userData)
            }
        }catch(error){
            setErrorMsg(error.message)
        }
    }
  return (
    // <div className="px-10 py-16 max-w-60">
    //     <h3>Sign in to your account</h3>
    //     <p> Don{'&apos;'}t have an account? <span className="inline-block text-blue-800"><Link to="/signup" className="inline-block">Sign up</Link></span></p>
    //     {errorMsg && <p>{errorMsg}</p>}
    //     <form onSubmit={handleSubmit(login)}>
    //         <Input label="E-mail" placeholder="Enter your email" {...register("email", {
    //             required: true,
    //             validate: {
    //                 matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //             "Email address must be a valid address",
    //             }
    //         })} />
    //         {formState.errors.email && <span className="text-red-600">{formState.errors.email.message}</span>}

    //         <Input label="Password" placeholder="Enter your password" {...register("password", {
    //             required: true,
              
    //             })} />
    //         <button type="submit">Sign-in</button>
    //     </form>  
    // </div>




<div className="max-w-md mx-auto p-8 rounded-2xl shadow-xl bg-white">
<h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Sign in to your account</h3>
<p className="text-gray-600 mb-8 text-center">
    Don&#39;t have an account?
    <span className="text-gray-900 hover:text-gray-700 transition-colors duration-200">
        <Link to="/signup" className="inline-block font-medium">Sign up</Link>
    </span>
</p>
{errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

<form onSubmit={handleSubmit(login)}>
    <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
        <Input
        className="text-black py-3 px-4 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            id="email"
            type="text"
            placeholder="Enter your email"
            {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                }
            })}
        />
        {formState.errors.email && (
            <span className="text-red-600 mt-1 block">{formState.errors.email.message}</span>
        )}
    </div>

    <div className="mb-8">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <Input
        className="text-black py-3 px-4 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
                required: true,
            })}
        />
    </div>

    <button type="submit" className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
        Sign in
    </button>
</form>
</div>



  )
}

export default Login