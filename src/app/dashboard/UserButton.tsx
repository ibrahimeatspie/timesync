"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export default function UserButton({ user }: { user: User | null }) {
  const supabase = createClient();

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
        redirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  return user ? (
    <Button onClick={() => signOut()}>Logout</Button>
  ) : (
    <Button onClick={() => googleSignIn()}>Login</Button>
  );
}
