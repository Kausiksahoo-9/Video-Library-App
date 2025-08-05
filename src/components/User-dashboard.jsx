import axios from "axios";
import { useState,useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function UserDashBoard(){

  const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);

  const [cookies,setCookies,removeCookie]=useCookies('user-id');

  const navigate = useNavigate();

  function LoadVideos(){
    axios.get("http://localhost:3030/get-videos")
    .then(response=>{
      setVideos(response.data);
    })
  }

  useEffect(()=>{
    LoadVideos();
  },[]);

  function handleSignoutClick(){
    removeCookie('user-id');
    navigate('/user-login');
  }

  return(
    <div>
      <h3>{cookies['user-id']} Dashboard - <button onClick={handleSignoutClick} className="btn btn-danger">Signout</button></h3>
      <main className="d-flex flex-wrap mt-4">
        {
          videos.map(video=>(
            <div key={video.VideoId} className="card m-2 p-2" style={{width:'350px'}}>
              <div className="card-header" style={{height:"200px"}}>
                <iframe src={video.Url} width="100%" height="200"></iframe>
              </div>
              <div className="card-body">
                {video.Title}
              </div>
              <div className="card-footer">
                <button className="bi bi-eye btn">{video.Views}</button>
                <button className="bi bi-hand-thumbs-up btn">{video.Likes}</button>
                <button className="bi bi-hand-thumbs-down btn">{video.Dislikes}</button>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  )
}