import { supabase } from "@/app/lib/supabase";
import { getToken } from "@/app/utils/token";
import { useEffect, useState } from "react";

export const LoggedIn = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSecretData = async () => {
      const token = getToken();
      try {
        const response = await fetch(
          "https://fastapi-supabase-production.up.railway.app/emojis",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data received:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
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
        This makes a request to a protected route!
      </div>
      <div className="grid grid-cols-6">
        {data && data.map((emoji) => <div key={emoji}>{emoji}</div>)}
      </div>
    </>
  );
};
