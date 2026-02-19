import { useEffect, useState, type JSX } from "react";
import api from "../api/axios";
import { Navigate } from "react-router";



function ProtectedRoute({children}:{children:JSX.Element}) {
// send a request to /me endpoint to get info of the loggedin user and check if the user is admin or clerk and render the children accordingly
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const checkAuthorization = async ()  => {
        try {
            const res = await api.get("/api/me")
            if(res.data.role === "admin" || res.data.role === "clerk"){
                setAuthorized(true)
                setLoading(false)
            }
        } catch (error) {
            setAuthorized(false)
            setLoading(false)
        }
    }
    checkAuthorization()
  }, [])

  if (loading) return <div>Loading...</div>

  return authorized ? children : <Navigate to="/forbidden" />
}

export default ProtectedRoute;