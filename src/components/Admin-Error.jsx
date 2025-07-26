import { Link } from "react-router-dom"

export function AdminError(){
  return(
    <div className="text-center">
      <h2 className="text-danger">Invalid Credential</h2>
      <Link to="/admin-login">Try Again</Link>
    </div>
  )
}