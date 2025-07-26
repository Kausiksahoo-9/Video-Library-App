import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserSignOut(){

  const [cookies,setCookies,removeCookie]=useCookies('user-id');

  const navigate = useNavigate();

  function handleSignoutClick(){
    removeCookie('user-id');
    navigate('/');
    window.location.reload();
  }
  
  return(
    <button onClick={handleSignoutClick} className='btn btn-warning me-2'>Signout</button>
  )
}