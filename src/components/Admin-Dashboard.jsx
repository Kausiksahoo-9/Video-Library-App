import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export function AdminDashBoard(){

  const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);

  function LoadVideos(){
    axios.get("http://localhost:3030/get-videos")
    .then(response=>{
      setVideos(response.data);
    })
  }

  useEffect(()=>{
    LoadVideos();
  },[]);

  return(
    <div>
      <h2 className="text-center text-warning">Admin Dashboard</h2>
      <div className="text-end mb-2">
        <Link to="/add-video" className="btn btn-light bi bi-camera-video-fill">Add New</Link>
      </div>
      <table className="table table-hover table-dark text-white">
        <thead>
          <th>Title</th>
          <th>Preview</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            videos.map(video=>(
              <tr>
                <td>{video.Title}</td>
                <td><iframe width="400" height="200" src={video.Url}></iframe></td>
                <td>
                  <Link to={`/edit-video/${video.VideoId}`} className='btn btn-warning bi bi-pen-fill'></Link>
                  <Link to={`/delete-video/${video.VideoId}`} className='btn btn-danger bi bi-trash-fill ms-2'></Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}