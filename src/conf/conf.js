const conf = {
firebaseUrl : String(import.meta.env.VITE_FIREBASE_API_KEY),
firebaseAuthDomain : String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
firebaseProjectId : String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
firebaseStorageBucket : String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
firebaseMessagingSenderId : String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
firebaseAppId : String(import.meta.env.VITE_FIREBASE_APP_ID),
appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf