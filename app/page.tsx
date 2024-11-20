"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/Tiptap";
import React from "react";

export default function Home() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const formSchema = z.object({
    title: z
      .string()
      .min(4, { message: "The title is not long enough" })
      .max(100, { message: "The title is too long" }),
    price: z.number().min(0, { message: "The price must be positive" }),
    description: z
      .string()
      .max(500, { message: "The description is too long" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setTitle(values.title);
    console.log(values.description);
    setDescription(values.description);
  };

  return (
    <main className="p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your product" {...field} />
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
                  <Tiptap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="my-4">
            Submit
          </Button>
        </form>
      </Form>
      <h1>Title: {title}</h1>
      <p>Description: {description}</p>
    </main>
  );
}
