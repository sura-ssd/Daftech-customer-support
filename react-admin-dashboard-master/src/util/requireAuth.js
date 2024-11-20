import { redirect } from "react-router-dom";

export async function useRequireAuth(request) {
  
  const pathname = new URL(request.url).pathname
  // const isAuthenticated = useSelector(store => store.auth.isAuthenticated); 
  const isAuthenticated = localStorage.getItem('isAuthenticated') || false
  if (!isAuthenticated) {
    return redirect(`/login?redirectTo=${pathname}`);
  }

  return null;
}
