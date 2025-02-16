import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import firebaseDbService from '../baas/firebase/fbDB'
import parse from "html-react-parser"
import appwriteStorageService from '../baas/appwrite/awStorage'
import { addDataIn } from '../store/editPostSlice'

function Post() {
    const [post, setPost] = useState(null)
   
    const {slug} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userData = useSelector((state)=>state.auth.userData)
    const [isAuthor, setIsAuthor] = useState(false)
    
    useEffect(()=>{
        setIsAuthor(post && userData? userData.uid == post.userId : false);
    }, [post, userData])
    

    useEffect(()=>{console.log("consoling", isAuthor, userData)},[isAuthor, userData])


    useEffect(()=>{
        if(slug){
            firebaseDbService.getPost(slug).then((result)=>{

                setPost(result)
            }).catch((err)=> console.log("Error: Post.jsx: fetching postData: ", err))
        }else navigate('/')

    }, [slug, navigate])

    const postDeletion = async()=>{
        try{  
            const status = await firebaseDbService.deletePost(slug)
            if(status){
                await appwriteStorageService.deleteFile(post.featuredImage)
                navigate('/')                
            }
        }catch(error){
            console.log("Error in deletion of post: ", error)
        }
    }

    const handleEditClick = ()=>{
        dispatch(addDataIn(post))
        console.log("handling edit click: ", post)
        navigate("/add-post")
    }

    

  return post? (
    // <div>

    //     {isAuthor && <div>
    //         {console.log("Auther", isAuthor)}
    //         <button className="bg-orange-500" onClick={handleEditClick}>Edit</button>
    //         <button onClick={postDeletion}>Delete</button>
    //     </div>}

    //     {console.log("Auther", isAuthor, "userData", userData, "post", post)}
    //     <div>
    //         {/* {console.log(post)} */}
            
    //         <img className="w-10" src={appwriteStorageService.getFilePreview(post.featuredImage)} alt={post.title}/>
    //     </div>


    //     <div>
    //         <div><h1>{post.title}</h1></div>
    //         <div>{parse(post.content)}</div>
    //     </div>
    //     {console.log(isAuthor, "isAuthor")}

    // </div>


//  <div className="min-h-[calc(100vh-theme('spacing.20'))] w-full bg-gray-800 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
//     {/* Author Controls */}
//     {isAuthor && (
//         <div className="mb-4 w-full flex justify-end"> {/* Align to the right */}
//             {console.log("Author", isAuthor)}
//             <div className="flex space-x-2">
//                 <button 
//                     className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
//                     onClick={handleEditClick}
//                 >
//                     Edit
//                 </button>
//                 <button 
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
//                     onClick={postDeletion}
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     )}

//     {console.log("Author", isAuthor, "userData", userData, "post", post)}

//     {/* Centered Image */}
//     <div className="mb-8"> {/* Increased margin bottom for spacing */}
//         <img 
//             className="w-[40rem] h-[25rem] object-cover" // Increased image size
//             src={appwriteStorageService.getFilePreview(post.featuredImage)} 
//             alt={post.title} 
//         />
//     </div>

//     {/* Title and Content */}
//     <div className="w-full text-left"> {/* Left-align the title and content */}
//         <div className="text-3xl font-bold mb-5">{post.title}</div> {/* Added margin bottom for spacing */}
//         <div className="text-gray-300">{parse(post.content)}</div>
//     </div>
//     {console.log(isAuthor, "isAuthor")}
// </div> 

<div className="min-h-[calc(100vh-theme('spacing.20'))] w-full bg-white text-gray-700 rounded-2xl shadow-md px-6 pt-1 pb-6 flex flex-col items-start">
    {/* Author Controls */}
    {isAuthor && (
        <div className="mb-4 w-full flex justify-end">
            <div className="flex space-x-2">
                <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors duration-200 border border-gray-200"
                    onClick={handleEditClick}
                >
                    Edit
                </button>
                <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-full transition-colors duration-200 border border-gray-200"
                    onClick={postDeletion}
                >
                    Delete
                </button>
            </div>
        </div>
    )}

    {/* Centered Image */}
    <div className="mb-24 w-full flex justify-center">
        <img
            className="max-w-full h-auto rounded-2xl object-cover"
            style={{ maxHeight: '400px' }} 
            src={appwriteStorageService.getFilePreview(post.featuredImage)}
            alt={post.title}
        />
    </div>

    {/* Title and Content */}
    <div className="w-full text-left">
        <div className="text-4xl font-semibold text-gray-900 mb-4">{post.title}</div>
        <div className="text-gray-700">{parse(post.content)}</div>
    </div>
</div>



  ) : null
}

export default Post