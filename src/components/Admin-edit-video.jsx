import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik";


export function EditVideo(){

  const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);

  const [categories,setCategories] = useState([{CategoryId:0,CategoryName:''}]);

  const params = useParams();
  const navigate = useNavigate();


  function LoadVideo(){
    axios.get(`http://localhost:3030/get-videos/${params.id}`)
    .then(response=>{
      setVideos(response.data);
    })
  }

  function LoadCategories(){
    axios.get("http://localhost:3030/get-categories")
    .then(response=>{
      setCategories(response.data);
    })
  }

  useEffect(()=>{
    LoadVideo();
    LoadCategories();
  },[])

  const formik = useFormik({
      initialValues:{VideoId:videos[0].VideoId,Title:videos[0].Title,Url:videos[0].Url,Description:videos[0].Description,Likes:videos[0].Likes,Dislikes:videos[0].Dislikes,Views:videos[0].Views,CategoryId:videos[0].CategoryId},
      onSubmit:(video)=>{
        axios.put(`http://localhost:3030/edit-video/${video.VideoId}`,video)
        .then(()=>{
          alert("video edited successfully..");
          navigate('/admin-dashboard');
        })

      },
      enableReinitialize:true,
    })

  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-warning px-5">Edit Video</h2><br />
        <dl className="row">
          <dt className="col-3">VideoId</dt>
          <dd className="col-9"><input type="number" onChange={formik.handleChange} name="VideoId" value={formik.values.VideoId} /></dd>
          <dt className="col-3">Title</dt>
          <dd className="col-9"><input type="text" onChange={formik.handleChange} name="Title" value={formik.values.Title} /></dd>
          <dt className="col-3">Url</dt>
          <dd className="col-9"><input type="text" onChange={formik.handleChange} name="Url" value={formik.values.Url} /></dd>
          <dt className="col-3">Description</dt>
          <dd className="col-9"><textarea name="Description" onChange={formik.handleChange} rows="4" cols="40" value={formik.values.Description}></textarea></dd>
          <dt className="col-3">Likes</dt>
          <dd className="col-9"><input type="number" onChange={formik.handleChange} name="Likes" value={formik.values.Likes} /></dd>
          <dt className="col-3">Dislikes</dt>
          <dd className="col-9"><input type="number" onChange={formik.handleChange} name="Dislikes" value={formik.values.Dislikes} /></dd>
          <dt className="col-3">Views</dt>
          <dd className="col-9"><input type="number" onChange={formik.handleChange} name="Views" value={formik.values.Views} /></dd>
          <dt className="col-3">Category</dt>
          <dd className="col-9">
            <select name="categoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
              {
                categories.map(category=>(
                  <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                ))
              }
            </select>
          </dd>
        </dl>
        <button className="btn btn-success">Save</button>
        <Link to='/admin-dashboard' className="btn btn-warning ms-2">Cancle</Link>
      </form>
    </div>
  )
}