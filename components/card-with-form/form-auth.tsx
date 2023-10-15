"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Please enter a password of at least 8 characters.",
  }),
});

type FormAuthProps = {
  type: "sign-in" | "sign-up";
};

export default function FormAuth({ type }: FormAuthProps) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    createAuthUserWithEmailAndPassword,
    signInAuthUserWithEmailAndPassword,
    isLoading,
  } = useAuthStore();
  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        await signInAuthUserWithEmailAndPassword(values.email, values.password);
        router.push("/");
        toast({
          description: "You have successfully signed in.",
        });
      }
      if (type === "sign-up") {
        await createAuthUserWithEmailAndPassword(values.email, values.password);
        router.push("/");
        toast({
          description: "You have successfully signed up.",
        });
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-login-credentials") {
        console.log("Invalid login credentials.");

        toast({
          description: "Invalid login credentials.",
          variant: "destructive",
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
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
                <Input placeholder="Your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
          {!isLoading && (
            <>
              {type === "sign-in" && "Sign in"}
              {type === "sign-up" && "Sign up"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
