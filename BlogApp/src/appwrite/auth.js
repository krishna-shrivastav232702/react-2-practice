import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                //call another method
                return this.login({email,password});
                
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user; // Return the user object if successful
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null; // Return null in case of an error
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser ::error",error);
        }
    }

}



const authService = new AuthService();


export default authService;