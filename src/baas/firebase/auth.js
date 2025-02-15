import {initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged} from "firebase/auth"

import {login as storeLogin, logout as storeLogout} from "../../store/authSlice.js"
import conf from '../../conf/conf.js'


export class FirebaseAuthService{
    firebaseConfig;
    firebaseApp;
    firebaseAuth;
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
        this.firebaseAuth = getAuth(this.firebaseApp);
    }

    async createAccount({email, password}){
            const userAccount = await createUserWithEmailAndPassword(this.firebaseAuth, email, password)
            if(userAccount){
                await this.login({email, password})
                return await this.getCurrentUser()

            }else{
                throw userAccount
            } 
    }

    async profileUpdate(name = "Guest"){  
        return await updateProfile(this.firebaseAuth.currentUser, {displayName: name}) 
    }


    async login({email,password}){
        const userCredentials = await signInWithEmailAndPassword(this.firebaseAuth, email, password);

        return userCredentials.user

    }
// try{
        //     onAuthStateChanged(this.firebaseAuth, (user)=>{
        //         if(user){
        //             return user;
        //         }else{ 
        //             console.log(user)
        //             return user;
        //         }
        //     })
        //     // return this.firebaseAuth.currentUser
        // } catch(error){
        //     console.log(error)
        //     throw error;
        // }

        
    getCurrentUserListener(dispatch, setLoading){
        
        return onAuthStateChanged(this.firebaseAuth, (user)=>{
            console.log("running listeneer")
            
            if(user){
                console.log("listener:", user.uid, user.email, user.displayName)
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                }
                dispatch(storeLogin(userData))
                
            }else{ 
                dispatch(storeLogout())
            }
            setLoading(false);
        })
    }

    async getCurrentUser(){
        const userObj = this.firebaseAuth.currentUser
        console.log("method:", userObj)
        return userObj;
    }


    async logout(){
        try{
            return await signOut(this.firebaseAuth)
        }catch(error){
            return error;
        }
    }
}

const firebaseAuthService = new FirebaseAuthService();
export default firebaseAuthService;