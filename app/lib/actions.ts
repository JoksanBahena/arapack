"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { BoxState } from "./states";
import { createBoxSchema } from "./zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createBox(prevState: BoxState, formData: FormData) {
  const validatedFields = createBoxSchema.safeParse({
    symbol: formData.get("symbol"),
    ect: formData.get("ect"),
    liner: formData.get("liner"),
    width: formData.get("width"),
    length: formData.get("length"),
    flute: formData.get("flute"),
    treatment: formData.get("treatment"),
    client: formData.get("client"),
    status: formData.get("status"),
    type: formData.get("box_type"),
    creases: {
      r1: formData.get("crease1"),
      r2: formData.get("crease2"),
      r3: formData.get("crease3"),
    },
    pdf_link: formData.get("file"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  revalidatePath("/dashboard/cajas");
  redirect("/dashboard/cajas");
}
  // const response = await fetch("/api/boxes", {
  //   method: "POST",
  //   body: formData,
  // });

  // if (!response.ok) {
  //   const data = await response.json();
  //   return {
  //     ...prevState,
  //     errors: data.errors,
  //     message: data.message,
  //   };
  // }

  // return {
  //   ...prevState,
  //   errors: {},
  //   message: "Box created successfully.",
  // };
