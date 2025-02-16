import {useState, useEffect} from 'react'
import {PostCard} from '../components'
import firebaseDbService from '../baas/firebase/fbDB'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{


      firebaseDbService.getPosts().then((postData)=> {
        // console.log("This is post data: ", postData); 
        setPosts(postData)
        console.log("posts set")
      // console.log(postData.map((post)=>console.log(post.id)))
      }
        )
        .catch((err)=> console.log("error fetching posts: ", err))
      
    },[])

    useEffect(()=>{
      console.log("Posts got updated: ",posts)
    }, [posts])

//   return posts && posts.length !==0 ? (
//     <div>
//         {posts.map((post)=>(<PostCard post={post} key={post.id}/>))}
//     </div>
//   ): (<h1>No posts to see here yet</h1>)



return posts && posts.length !== 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
          <PostCard post={post} key={post.id} />
      ))}
  </div>
) : (
  <div className="flex items-center justify-center h-48 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700">No posts to see here yet</h1>
  </div>
);


}
export default AllPost