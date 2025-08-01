import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"


export function UserRegister(){

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      UserId:'',
      UserName:'',
      Password:'',
      Email:'',
      Mobile:''
    },
    onSubmit: (user) => {
    axios.post("http://localhost:3030/register-user", user).then(()=>{
      alert("user registered");
      navigate('/user-login');
    })
  }
  })

  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h3>Register User</h3>
        <dl>
          <dt>UserId</dt>
          <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
          <dt>UserName</dt>
          <dd><input type="text" onChange={formik.handleChange} name="UserName" /></dd>
          <dt>Password</dt>
          <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
          <dt>Email</dt>
          <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
          <dt>Mobile</dt>
          <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
        </dl>
        <button type="submit" className="btn btn-warning">Register</button>
      </form>
    </div>
  )
}