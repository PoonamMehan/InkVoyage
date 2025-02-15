import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import  firebaseAuthService from "./baas/firebase/auth";
import {Footer, Header} from "./components"

import "@radix-ui/themes/styles.css";
import {Spinner} from "@radix-ui/themes"

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const userData = useSelector((state)=> state.auth.userData)

  useEffect(()=>{
    //adding the listener for keeping the user logged in even upon refreshing
    const unsubscribe = firebaseAuthService.getCurrentUserListener(dispatch, setLoading);
    console.log("Env", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET)
    return () => unsubscribe();
  }, [dispatch])


  // return !loading? (
  //     <div className="min-h-screen w-full mx-auto font-inter">
  //       <Header className="mb-24"/>
  //       <Outlet/>
  //       <Footer/>
  //     </div>  
         
  // ):( 
  //     <div className="min-h-screen w-full flex justify-center items-center">
  //           <Spinner size="3"/>
  //     </div>
  //   )

  

return !loading ? (
  <div className="min-h-screen w-full mx-auto font-inter bg-white text-gray-700 flex flex-col">
      <div className="flex justify-center mb-6 py-2 ">
          <div className="w-full max-w-7xl px-4">
              <Header />
          </div>
      </div>
      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow w-full max-w-7xl">
          <Outlet />
      </main>
      <Footer />
  </div>
) : (
  <div className="min-h-screen w-full flex justify-center items-center bg-white">
      <Spinner size="3" />
  </div>
);





}

export default App