const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_ID;

export const getToken = () => {
  const storageKey = `sb-${supabaseProjectId}-auth-token`;
  const sessionDataString = localStorage.getItem(storageKey);
  const sessionData = JSON.parse(sessionDataString || "null");
  const token = sessionData?.access_token;

  return token;
};
