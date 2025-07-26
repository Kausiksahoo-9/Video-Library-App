import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export function RegisterLink(){
  return(
    <Link to='/register-user' className='btn btn-warning'>Register</Link>
  )
}

export function PasswordComponent(){
  return(
    <div className='input-group'>
      <input type="password" placeholder='Enter your Password' className='form-control' />
      <Link to='/user-dashboard' className='btn btn-warning'>Continue</Link>
    </div>
  )
}

function VideoLibraryHome() {

  const [view,setView] = useState('');

  const formik = useFormik({
    initialValues:{UserId:'',UserName:'',Password:'',Email:'',Mobile:''},
    onSubmit:(user)=>{
      axios.get(`http://localhost:3030/get-users`)
      .then(response=>{
        var data = response.data.find(client=>client.Email===user.Email);
        if(data){
          setView(<PasswordComponent />);
        }
        else{
          setView(<RegisterLink />);
        }
      })
    }
  })

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
      <main className='text-center'>
        <h1>Watch Technology Videos</h1>
        <p>Any Where Any Time</p>
        <div className='input-group'>
          <form onSubmit={formik.handleSubmit} className='input-group'>
            <input type="email" name='Email' onChange={formik.handleChange} placeholder='Enter Your Email...' className='form-control' />
            <button type='submit' className='btn btn-danger'>Get Started <span className='bi bi-chevron-right'></span></button>
          </form>
          <div className='my-3'>
            {view}
          </div>
        </div>
      </main>
    </div>
  )
}

export default VideoLibraryHome