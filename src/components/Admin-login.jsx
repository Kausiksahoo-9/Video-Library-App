import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [admin,setAdmin] = useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);

  const [cookies,setCookie,removeCookie] = useCookies('admin-id');

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      UserId:'',
      Password:''
    },
    onSubmit:(admin)=>{
      axios.get("http://localhost:3030/get-admin")
      .then(response=>{
        if(admin.UserId===response.data[0].UserId && admin.Password===response.data[0].Password){
          setCookie('admin-id',admin.UserId);
          navigate('/admin-dashboard');
          window.location.reload();
        }
        else{
          navigate('/admin-Error');
        }
      })
    }
  })
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <form className='w-25' onSubmit={formik.handleSubmit}>
        <div className='text-center bi bi-person-circle'>Admin Login</div>
        <dl>
          <dt>Admin Id</dt>
          <dd><input type='text' name='UserId' onChange={formik.handleChange} className='form-control'/></dd>
          <dt>Password</dt>
          <dd><input type='password' name='Password' onChange={formik.handleChange} className='form-control'/></dd>
        </dl>
        <button className='btn btn-danger w-100'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin;