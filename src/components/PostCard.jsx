/* eslint-disable react/prop-types */
import React from 'react'
import firebaseDbService from '../baas/firebase/fbDB'
import {Link} from 'react-router-dom'
import appwriteStorageService from '../baas/appwrite/awStorage'


function PostCard({post}) {
  console.log("post id", post)
  const imgSrc = appwriteStorageService.getFilePreview(post.featuredImage)
  return (
    // <>
    // <Link to={`/post/${post.id}`}>

    //   <div className="w-20">
    //     <div>
    //     <img src={imgSrc} alt="Title Image"/>
    //     </div> 
    //     <h3>{post.title.length > 35? post.title.slice(0, 35)+"...":post.title}</h3>
    //   </div>
    // </Link>
    // </>

<Link to={`/post/${post.id}`} className="block hover:opacity-80 transition-opacity duration-200">
    <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-md bg-white">
        <div className="h-40 overflow-hidden relative"> {/* Fixed height for consistent image size */}
            <img
                className="w-full h-full object-cover object-center absolute top-0 left-0"
                src={imgSrc}
                alt="Title Image"
            />
        </div>
        <div className="px-6 py-4">
            <div className="font-semibold text-xl mb-2 text-gray-900">
                {post.title.length > 35 ? post.title.slice(0, 45) + "..." : post.title}
            </div>
        </div>
    </div>
</Link>


  )
}

export default PostCard