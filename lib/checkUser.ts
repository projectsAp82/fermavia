// lib/auth/isAdmin.ts
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function GetConnected() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return false;
    return session
}

async function isAdmin(): Promise<boolean> {
    try{
        const session = await GetConnected();
        if (!session || !session.user?.id) return false;
        const admin = await prisma.adminUser.findFirst({
            where: {userId: session.user.id}
        });

        return !!admin;
    } catch (error){
        console.error('Erreur isAdmin', error);
        return false
    }
}

export async function requireUser(){
    const session = await GetConnected();
    if (!session || !session.user?.id){
        redirect("/login");
    }
    const user = session.user
    return user;
}

export async function requireAdmin(){
    const user = await requireUser();
    const admin = await isAdmin();
    if (!admin){
        redirect("/login");
    }
    return user;
}