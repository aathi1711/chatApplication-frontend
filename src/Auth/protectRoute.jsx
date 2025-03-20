
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({component}) =>{
  const token = localStorage.getItem('token')
  if(token){
    return component
  } else{
    return <Navigate to='/login'/>
  }
}
export default ProtectedRoute;
