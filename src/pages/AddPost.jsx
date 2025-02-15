import {PostForm} from "../components"
import { useSelector } from 'react-redux'



function AddPost() {

    
    const postData = useSelector((state)=>state.postData.postData)
  return postData?(
    <div><PostForm postData/></div>
  ):(<div><PostForm/></div>)
}

export default AddPost