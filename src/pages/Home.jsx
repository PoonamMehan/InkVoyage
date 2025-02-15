import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import firebaseDbService from "../baas/firebase/fbDB"
import { PostCard } from "../components"

function Home() {
    const currentUserStatus = useSelector((state)=>state.auth.status)
    const [posts, setPosts] = useState([])
    

    useEffect(()=> {
      firebaseDbService.getPosts().then((posts) => {
        if(posts) {
            setPosts(posts)
        }{console.log("Home: ", posts)}
      }).catch((err)=>console.log("Home page error in fetching posts from firebase: ", err))
    }, [])
    
    // leaderboard full
    // highly upvoted top 10 posts
    // Just latest 10 posts\

  // return currentUserStatus? (
    
  //   !posts || posts.length === 0? (<><h1>No posts to see here yet.</h1></>): (<>
    
  //   <div>
        
  //       {posts.map((post)=> <PostCard post={post} key={post.id}/>)}
  //       <h3>Checkout all the posts in &quot;All Posts&quot; section.</h3>
  //   </div>
    
  //   </>)
    

  // ):(<h1>Login to see posts</h1>);



return currentUserStatus ? (
  !posts || posts.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-md w-full">
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">No posts to see here yet.</h1>
          <p className="text-gray-500 text-center">Check back later for updates!</p>
      </div>
  ) : (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                  <PostCard post={post} key={post.id} />
              ))}
          </div>
          <h3 className="text-lg font-medium mt-6 text-gray-500">
              Checkout all the posts in the &quot;All Posts&quot; section.
          </h3>
      </div>
  )
) : (
  <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-md w-full">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Login to see posts</h1>
  </div>
);



}

export default Home