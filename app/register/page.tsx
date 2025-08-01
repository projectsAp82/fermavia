'use client'
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { signUp } from "@/lib/auth-functions"

import { Input } from "@/components/ui/form/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form"

const formSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8),
    password2: z.string().min(8),
})

export default function RegisterPage({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            password2: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const {success, message} = await signUp(values.email, values.password, values.password2, values.username);
        if (success) {
            toast.success(message as string);
            router.push("/dashboard");
        } else {
            toast.error(message as string);
        }
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-fermaviabg-500 flex flex-col justify-center items-center px-4">
            {/* Logo et titre */}
            <div className="flex flex-col items-center mb-8">
                <div>
                    <Image src="/logofermavia.png" alt="Logo Fermavia" width={1000} height={1000} className="mx-auto mb-3 w-32 h-auto" /> {/* Remplace par une icône SVG ou un logo */}
                </div>
                <h1 className="text-2xl font-bold text-fermaviatxt-500">Fermavia</h1>
                <p className="text-sm text-gray-600 text-center mt-2">
                    Rejoignez votre communauté locale autour du bon sens paysan.
                </p>
            </div>

            {/* Card formulaire */}
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">
                    <div>
                        <FormField 
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-fermaviatxt-500">Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-fermaviatxt-500">Adresse email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="votre@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-fermaviatxt-500">Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        
                        <FormField 
                            control={form.control}
                            name="password2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-fermaviatxt-500">Confirmation du mot de passe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-fermaviabtnbg-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-fermaviabtnhv-500 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="size-4 animate-spin"/>:"S'enregistrer"}
                        
                    </button>
                </form>
                </Form>
            </div>

            {/* Bas de page */}
            <p className="text-sm text-gray-600 mt-6">
                Déjà membre ?{' '}
                <a href="/login" className="text-fermaviatxt-500 font-medium hover:underline">
                    Connectez vous
                </a>
            </p>

            <div className="flex gap-2 mt-4 opacity-40">
                <span>🥕</span>
                <span>🌿</span>
                <span>🍏</span>
            </div>
        </div>
    )
}
