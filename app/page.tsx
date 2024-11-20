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

const reducer = (
  state: { title: string; description: string },
  action: any
) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, {
    title: "",
    description: "",
  });
  const formSchema = z.object({
    title: z
      .string()
      .min(4, { message: "The title is not long enough" })
      .max(100, { message: "The title is too long" }),
    description: z
      .string()
      .max(500, { message: "The description is too long" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({ type: "title", payload: values.title });
    dispatch({
      type: "description",
      payload: values.description,
    });
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
      <h1>Title: {state.title}</h1>
      <h2>Description:</h2>
      <div dangerouslySetInnerHTML={{ __html: state.description }} />
    </main>
  );
}
