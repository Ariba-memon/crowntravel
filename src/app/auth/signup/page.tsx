"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const formSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string(),
})
export default function RegistrationForm() {

    const [loading, setLoading] = useState(false);

const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: "",
    phone: "",
    email: "",
    password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        setLoading(true);
        const response = await fetch("https://api.crownumrah.co.uk/accounts/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
                "first_name":values.name,
            }),
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 400) {
            if (data.email) {
                toast.error(data.email[0], { position: "bottom-right" });
            }
            if (data.first_name) {
                toast.error(data.first_name[0], { position: "bottom-right" });
            }
            if (data.phone) {
                toast.error(data.phone[0], { position: "bottom-right" });
            }
            if (data.password) {
                toast.error(data.password[0], { position: "bottom-right" });
            }
            return; 
        }
        const token = data.access;
        localStorage.setItem('token', token);
        toast.success("Registered successfully", { position: "bottom-right" });
        console.log(values);
        form.reset();
        setTimeout(() => {
            router.push('/shop');
        }, 2000);
    } catch (error: any) {
        console.log(error)
        toast.error(error.message, { position: "bottom-right" });
    } finally {
        setLoading(false);
    }
}


  
  return (
    <div className="w-full my-12 h-screen bg-gray-200 flex items-center justify-center">
        <div className=" lg:w-1/3 border-[2px] bg-white border-gray-200 shadow-xl p-4">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-8">Sign Up </h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Full Name</FormLabel> */}
              <FormControl>
                <Input 
                placeholder="Full Name"
                type="text"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input 
                placeholder="email"
                type="email"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Phone</FormLabel> */}
              <FormControl>
                <Input 
                placeholder="Phone Number"
                type="text"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input 
                placeholder="Password"
                type="password"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="px-10" type="submit" >{loading ? "Loading..." : "Signup"}</Button>
      </form>
    </Form>
    <div className="flex justify-center mt-4">
        <Link href="/auth/login">
            <p className="text-stone-500">Already have an account? Login here</p>
        </Link>
        
    </div>
        </div>
    </div>
  )
}
