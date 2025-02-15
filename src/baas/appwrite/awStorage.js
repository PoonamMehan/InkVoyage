import App from "../../App.jsx";
import conf from "../../conf/conf.js";
import {Client, ID, Storage} from "appwrite";
export class AppwriteStorageService{
    client = new Client();
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        
        this.bucket = new Storage(this.client)
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
            
        }catch(error){
            // console.log("Appwrite :: uploadFile :: error", error)
            throw error.message
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileId){
        console.log("appwrite file preview ran: ", fileId)
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appwriteStorageService = new AppwriteStorageService();
export default appwriteStorageService;