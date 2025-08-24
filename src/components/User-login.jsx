import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


export function UserLogin(){

  const navigate = useNavigate();

  const [cookies,setCookies,removeCookie]=useCookies('user-id');

  const formik = useFormik({
    initialValues:{
      UserId:'',
      Password:''
    },
    onSubmit:(user)=>{
      axios.get("http://localhost:3030/get-users")
      .then(response=>{
        var data = response.data.find(item=>item.UserId === user.UserId);
        if(data){
          if(data.Password === user.Password){
            setCookies('user-id',user.UserId);
            navigate('/user-dashboard');
            window.location.reload();
          }else{
            navigate('/user-error');
          }
        }else{
          navigate('/user-error');
        }
      })
    }
  })


  return(
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <form className='w-25' onSubmit={formik.handleSubmit}>
        <div className='text-center bi bi-person-circle'>User Login</div>
        <dl>
          <dt>UserId</dt>
          <dd><input type="text" onChange={formik.handleChange} name="UserId" className='form-control' /></dd>
          <dt>Password</dt>
          <dd><input type="password" onChange={formik.handleChange} name="Password" className='form-control' /></dd>
        </dl>
        <p>
            Already have account? <span onClick={() => navigate('/register-user')} className="text-primary cursor-pointer">click here</span>
        </p>
        <button type="submit" className="btn btn-warning w-100">Login</button>
      </form>
    </div>
  )
}