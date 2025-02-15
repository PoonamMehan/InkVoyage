// import conf from "../conf/conf.js";
import {initializeApp} from "firebase/app";
import {getFirestore, doc, setDoc, collection, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit} from "firebase/firestore";
import conf from '../../conf/conf.js'

export class FirebaseDbService{
    firebaseConfig;
    firebaseApp;
    firebaseDb;
    constructor(){
        this.firebaseConfig = {
            apiKey : conf.firebaseUrl,
            authDomain : conf.firebaseAuthDomain,
            projectId : conf.firebaseProjectId,
            storageBucket: conf.firebaseStorageBucket ,
            messagingSenderId: conf.firebaseMessagingSenderId,
            appId: conf.firebaseAppId,
            
        };
        this.firebaseApp = initializeApp(this.firebaseConfig);
        this.firebaseDb =  getFirestore(this.firebaseApp);
    }
    async createPost({title, slug, content="THE BESTT", featuredImage, status, userId}){
        // eslint-disable-next-line no-useless-catch
        try{
            // console.log("create post atleast started the execution")
            await setDoc(doc(this.firebaseDb, "posts", slug),{
                title : title,
                content,
                featuredImage,
                status, 
                userId
            }) 
           
        }catch(error){
            throw error
        }         
    }

    async getPost(slug){
        // eslint-disable-next-line no-useless-catch
        try{
            const docRef = doc(this.firebaseDb, "posts", slug);
            let docSnap = await getDoc(docRef);
            return docSnap.data()
        }catch(error){
            throw error;//we might need to stop throwing these errors and start to just console.log them to prevent the app from crashing, or print them out at higher levels
        }  
    }

    async getPosts(){
        let q = query(collection(this.firebaseDb, "posts"), where("status", "==", "active"));
        

        console.log("Atleast the getting posts process started.")
        try{
            const gotDocs = await getDocs(q);
            console.log("Docs from fbdb: ", gotDocs)

            const posts = gotDocs.docs.map((doc)=>({id: doc.id, ...doc.data() }))
            return posts;
        }catch(error){
            console.log("Fb error getPosts: ", error)
            throw error
        }
    }

   

    async updatePost(slug, {title, content, featuredImage, status}){
        const docRef = doc(this.firebaseDb, "posts", slug)
        // console.log("started process of updating post")
        // eslint-disable-next-line no-useless-catch
        try{
            const docSnap = await updateDoc(docRef, {
            title,
            content,
            featuredImage,
            status
        })
        // console.log("this is doc snap", docSnap)
        return docSnap
        }catch(error)
        {
            throw error
        }
    }

    async addSlugField (id){
        const docRef = doc(this.firebaseDb, "posts", id)
            const docSnap = await updateDoc(docRef, {
                id: id
            })
            return docSnap;
    }
    
    async deletePost(slug){
        try{
            await deleteDoc(doc(this.firebaseDb, "posts", slug))
            return true;
        }catch(error){
            console.log(error)
            return false;
        }
    }
}

const firebaseDbService = new FirebaseDbService();
export default firebaseDbService;