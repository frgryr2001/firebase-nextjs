"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createProductDocument, storage } from "@/config/firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const productFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  price: z
    .string()
    .min(1, {
      message: "Price must be at least 1.",
    })
    .max(100000000, {
      message: "Price must not be longer than 100000000.",
    }),
  description: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  image: z.any(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProductFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function CreateProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const [img, setImg] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const imageRef = ref(storage, `images/${uuidv4()}`);

  async function onSubmit(data: ProductFormValues) {
    try {
      if (img) {
        setIsCreating(true);
        await uploadBytes(imageRef, img);
        const url = await getDownloadURL(imageRef);
        await createProductDocument({
          ...data,
          price: parseInt(data.price),
          image: url,
        });
        setIsCreating(false);
        form.reset({
          name: "",
          price: "",
          description: "",
          image: "",
        });
        toast({
          title: "Product created.",
        });
      }
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="product name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" {...field} type="number" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  placeholder="image"
                  {...field}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e: any) => {
                    setImg(e.target.files[0]);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isCreating ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
