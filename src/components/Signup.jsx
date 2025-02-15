import React, {useState} from 'react'
import {Logo} from './'
import {Link} from 'react-router-dom'
import {Input} from "./"
import {useForm} from 'react-hook-form'
import firebaseAuthService from '../baas/firebase/auth'
import {useDispatch} from 'react-redux'
import {login as storeLogin} from "../store/authSlice"
import { useNavigate } from 'react-router-dom'


function Signup() {
    const [errorMsg, setErrorMsg] = useState("")
    const {register, handleSubmit, formState} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = async (data)=>{
        setErrorMsg("") // change it to be this on the components's mounting
        try{
            const response = await firebaseAuthService.createAccount(data);
            if(response){

                await firebaseAuthService.profileUpdate(data.name)

                let latestUserData = await firebaseAuthService.getCurrentUser()

                console.log(latestUserData)
                if(latestUserData){
                    latestUserData = {
                        uid: latestUserData.uid,
                            email: latestUserData.email,
                            displayName: latestUserData.displayName,
                    }
                    dispatch(storeLogin(latestUserData))
                    navigate("/")
                }
            }
        }
        catch(error){
            setErrorMsg(error.message)
        }
    }

  return (
    // <div>
    //     <h3>Create a new account</h3>
    //     <p> Already have an account? <span className="text-blue-800"><Link to="/login" className="inline-block text-blue-800">Sign-in</Link></span></p>
    //     {errorMsg && <p>{errorMsg}</p>}
    //     <form onSubmit={handleSubmit(signup)}>
    //         <Input label="FullName" type="text" placeholder="Enter your full name here" {...register("name", {
    //             required: true,
    //         } )}/>
    //         <Input label="E-mail" type="text" placeholder="Enter your e-mail here" {...register("email", {
    //             required: true,
    //             validate: {
    //                 matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //             "Email address must be a valid address"
    //             }
    //         } )}/>
    //         {formState.errors.email && <span className="text-red-600">{formState.errors.email.message}</span>}
    //         <Input label="Password" type="text" placeholder="Enter your password here" {...register("password", {
    //             required: true,
    //             minLength: 6,
    //         })}/>
    //         <button type="submit">Submit</button>
    //     </form>
    // </div>
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-xl bg-white">
    <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Create a new account</h3>
    <p className="text-gray-600 mb-8 text-center">
        Already have an account?
        <span className="text-gray-900 hover:text-gray-700 transition-colors duration-200">
            <Link to="/login" className="inline-block font-medium"> Sign in</Link>
        </span>
    </p>
    {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

    <form onSubmit={handleSubmit(signup)}>
        <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <Input
                className="text-black py-3 px-4 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
                id="name"
                type="text"
                placeholder="Enter your full name here"
                {...register("name", {
                    required: "Name is required!",
                })}
            />
        </div>

        <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
            <Input
                className="text-black py-3 px-4 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
                id="email"
                type="text"
                placeholder="Enter your e-mail here"
                {...register("email", {
                    required: "Email is required!",
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
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
                type="password" // Changed to "password" for security
                placeholder="Enter your password here"
        
                {...register("password", {
                    required: "Password is required!",
                    minLength: {
                        value: 6,
                        message: "Password must be longer than 6 characters!"
                    }
                })}
            />
        </div>

        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">
            Submit
        </button>
    </form>
</div>



  )
}

export default Signup