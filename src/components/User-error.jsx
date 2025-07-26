import { Link } from "react-router-dom";


export function UserError(){
  return(
    <div className="text-center">
      <h2 className="text-danger">Invalid Credential</h2>
      <Link to="/user-login">Try Again</Link>
    </div>
  )
}