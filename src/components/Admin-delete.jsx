import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

export function DeleteVideo(){

  const params = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);

  useEffect(()=>{
    axios.get(`http://localhost:3030/get-videos/${params.id}`)
    .then(response=>{
      setVideos(response.data);
    },[]);
  });

  function handleYesClick(){
    axios.delete(`http://localhost:3030/delete-video/${params.id}`)
    .then(()=>{
      navigate('/admin-dashboard');
    })
  }

  return(
    <div className='d-flex justify-content-center align-items-center'>
      <div>
        <h3>Delete Video</h3>
        <p>Are you sure? what to delete?</p>
        <div className="card w-100">
          <div className="card-header">
            <iframe src={videos[0].Url} width="100%" ></iframe>
          </div>
          <div className="card-body">
            {videos[0].Title}
          </div>
          <div className="card-footer">
            <button onClick={handleYesClick} className="btn btn-success me-2">Yes</button>
            <Link className='btn btn-danger' to='/admin-dashboard'>No</Link>
          </div>
        </div>
      </div>
    </div>
  )
}