"use server";

import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
    try{
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "Signed in successfully"
        }
    } catch (error) {
        console.log(error);
        return{
            success: false,
            message: "Email ou mot de passe invalide"
        }
    }
    
}

export const signUp = async (email: string, password: string, password2: string, name: string) => {

    if (password != password2){
        return{
            success: false,
            message: "Veuillez vérifier votre mot de passe !"
        }
    }
    try{
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            }
        })
        return {
            success: true,
            message: "Inscription validée."
        }
    } catch (error) {
        console.log(error);
        return{
            success: false,
            message: "Erreur du serveur"
        }
    }
    
}