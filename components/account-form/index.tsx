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
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { storage, updateProfileDocument } from "@/config/firebase";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const accountFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(10, {
      message: "Phone number must not be longer than 10 characters.",
    }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  avatar: z.any(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function AccountForm({
  updateData,
  onSuccess,
}: {
  updateData: any;
  onSuccess: () => void;
}) {
  const { toast } = useToast();

  const [isLoadingUpdating, setIsLoadingUpdating] = useState(false);
  const [img, setImg] = useState(null);
  const imageRef = ref(storage, `images/${uuidv4()}`);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    values: {
      fullName: updateData?.fullName ?? updateData?.displayName,
      phoneNumber: updateData?.phoneNumber,
      address: updateData?.address,
    },
  });

  async function onSubmit(data: AccountFormValues) {
    try {
      setIsLoadingUpdating(true);
      if (img) {
        await uploadBytes(imageRef, img);
        const url = await getDownloadURL(imageRef);
        await updateProfileDocument(updateData?.uid, {
          ...data,
          photoURL: url,
        });
      } else {
        await updateProfileDocument(updateData?.uid, data);
      }
      setIsLoadingUpdating(false);
      form.reset({
        avatar: "",
      });
      onSuccess();

      toast({
        title: "Update account successfully",
      });
    } catch (error) {
      console.log("error", error);

      toast({
        title: "Update account failed",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="mb-10">
        <Avatar>
          <AvatarImage src={updateData?.photoURL} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    disabled={isLoadingUpdating}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your phone"
                    {...field}
                    disabled={isLoadingUpdating}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address"
                    {...field}
                    disabled={isLoadingUpdating}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avatar"
                    {...field}
                    type="file"
                    id="picture"
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => {
                      setImg(e.target.files[0]);
                    }}
                    disabled={isLoadingUpdating}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoadingUpdating && (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </>
            )}
            {!isLoadingUpdating && <>Update account</>}
          </Button>
        </form>
      </Form>
    </>
  );
}
