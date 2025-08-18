"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password.trim(),
        redirect: false,
        // callbackUrl: "/dashboard",
      })
      console.log("Response from signIn:", response)

      if (response?.error) {
        toast("Login failed: " + response.error)
        return
      }

      toast("Login successful", {
        description: "You are now logged in.",
      })

      // Redirect manually
      router.push("/dashboard")

    } catch (error) {
      console.error("Login error:", error)
      toast("Login failed. Please try again.")
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@example.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
