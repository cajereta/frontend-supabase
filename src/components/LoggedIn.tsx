import { supabase } from "@/app/lib/supabase";
import { getToken } from "@/app/utils/token";
import { useState } from "react";

export const LoggedIn = () => {
  const [data, setData] = useState([]);

  const getSecretData = () => {
    const token = getToken();
    fetch("https://fastapi-supabase-production.up.railway.app/emojis", {
      method: "GET",
      headers: {
        // This is the token that we get from Supabase.
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <div className="mb-32">
        <button
          className="rounded p-2 bg-red-600 font-bold hover:bg-red-400 hover:text-black"
          onClick={handleSignOut}
        >
          Sign out!
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl">You are logged in!</h1>
        <p>Lets check if you have superpowers!</p>
        <button
          className="rounded p-2 bg-blue-600 font-bold hover:bg-blue-300 hover:text-black"
          onClick={getSecretData}
        >
          A button that makes a GET request to a protected route!
        </button>
      </div>
      <div className="grid grid-cols-6">
        {data && data.map((emoji) => <div key={emoji}>{emoji}</div>)}
      </div>
    </>
  );
};
