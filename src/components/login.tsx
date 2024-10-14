"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LoggedIn } from "./LoggedIn";

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [session]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa, className: { container: "" } }}
      />
    );
  } else {
    return <LoggedIn />;
  }
}
