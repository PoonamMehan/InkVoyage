/* eslint-disable react/prop-types */
import {useState, useCallback, useRef, useEffect} from 'react'
import {Input, RTE, Select} from "../"
import appwriteStorageService from "../../baas/appwrite/awStorage"
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form'
import firebaseDbService from '../../baas/firebase/fbDB';
import { addDataIn } from '../../store/editPostSlice';

function PostForm() {

   const post = useSelector((state)=> state.postData).postData
   

  const {register, handleSubmit, setValue, control, getValues, watch} = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.id ||"",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData)
  const [fileError, setFileError] = useState("")
  const imageInputField = watch("image");
  const [imageInputEmpty, setImageInputEmpty] = useState(true)
  
  useEffect(()=>{
    const val = imageInputField && imageInputField.length > 0
    if(imageInputField){
      console.log("legnth", imageInputField)
      console.log("legnth 2", val)
      setImageInputEmpty(false)
    }else{
      setImageInputEmpty(true)
    }
  }, [imageInputField])

  const submit = async(data) => {
    console.log("submit button clicked")
    if(post){
      console.log("submiting after updating started")
      const file = data.image[0]? await appwriteStorageService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteStorageService.deleteFile(post.featuredImage)
      }else{
        setFileError(file)
        console.log("no file" , file)
      }
      // console.log("post", post)
      await firebaseDbService.updatePost(post.id, {
        ...data,
        featuredImage: file? file.$id : post.featuredImage,
      });

      let dbPost = await firebaseDbService.getPost(post.id)
      // dbPost = dbPost.data()
      // console.log("DBPOST: ", dbPost)
      if(dbPost){
        // console.log("pofst made successfully in firestore", dbPost)
        navigate(`/post/${dbPost.id}`)
      }

      dispatch(addDataIn(""))
      
    }else{
      const file = await appwriteStorageService.uploadFile(data.image[0])
      console.log("This is the data collected by React-hook-form: ", data)
  
      if(file){  
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log("userData", userData)
        await firebaseDbService.createPost({...data, userId: userData.uid})
        // const dbPost = await firebaseDbService.getPost(data.slug)
        // console.log("dbPost created", dbPost )
        console.log(data.slug)
        const idThing = await firebaseDbService.addSlugField(data.slug)
        const dbPost = await firebaseDbService.getPost(data.slug)
        console.log("id thing ", idThing)
        if(dbPost){
          navigate(`/post/${dbPost.id}`);
        }
      }
    }
    console.log("submit got executed")
  }


  const slugTransform = useCallback((value)=>{
    if(value && typeof value === "string"){
      return value.trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d]+/g, "-")
    }
    return ""  
  }, [])


  return (
    // <form onSubmit={handleSubmit(submit)}>
    //   {/* {console.log("rendering post", post)} */}
    //   <div className="flex">
    //     <div className="inline-block w-2/3">
    //       <Input
    //       className="text-black"
    //         label="Title: "
    //         placeholder="Title"
    //         {...register("title", {required: true})}
    //         onInput={(e) => {
    //           const transformedSlug = slugTransform(e.currentTarget.value);
    //           setValue("slug", transformedSlug, { shouldValidate: true });
    //         }}
    //       />

    //       <Input 
    //       className="text-black"
    //         label="Slug: "
    //         placeholder="Slug"
    //         {...register("slug", {required: true})}
    //         onInput={(e)=>{
    //           setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
    //         }}
    //       />

    //       <RTE label="Content: " name="content" onChange control={control} defaultValue={getValues("content")}/>
    //     </div>
    //     <div className="inline-block w-1/3">
    //       <Input 
    //       className="text-black"
    //         label="Featured Image: "
    //         type="file"
    //         accept="image/png, image/jpg, image/jpeg, image/gif"
    //         {...register("image", {required: !post})}
    //       />
    //       {/* {formState.errors.image && <span className="text-red-700">{formState.errors.image.message}</span>} */}
    //       {post && 
    //       <div>
    //         {/* {console.log( "POst image:", post, post.postData.featuredImage)} */}
    //         <img src={appwriteStorageService.getFilePreview(post.featuredImage)} alt={post.title} />
    //       </div>
    //       }
    //       <Select 
    //       className="text-black"
    //         options={["active", "inactive"]}
    //         label="Status: "
    //         {...register("status", {required: true})}
    //       />
    //       <button type="submit">{post? "Update":"Submit"}</button>
    //     </div>
    //   </div>
    // </form>

<form onSubmit={handleSubmit(submit)} className="bg-white rounded-2xl shadow-xl px-6 ">
    <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <Input
                placeholder="Title"
                {...register("title", { required: true })}
                onInput={(e) => {
                    const transformedSlug = slugTransform(e.currentTarget.value);
                    setValue("slug", transformedSlug, { shouldValidate: true });
                }}
                className="mb-4 text-black py-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">Slug:</label>
            <Input
                placeholder="Slug"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
                className="mb-4 text-black py-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            />

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                <RTE name="content" onChange control={control} defaultValue={getValues("content")} />
            </div>
        </div>

        <div className="w-full md:w-1/3 px-3 flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">Featured Image:</label>
            <Input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
                className="mb-4 text-black  py-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            />
            {(post && imageInputEmpty) && (
                <div className="mb-4">
                    <img
                        src={appwriteStorageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-2xl"
                    />
                </div>
            )}

            <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
            <Select
                options={["active", "inactive"]}
                {...register("status", { required: true })}
                className="mb-6 text-black py-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm"
            />

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 shadow-md"
                >
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </div>
    </div>
</form>

  )
}

export default PostForm