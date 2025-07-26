import axios from "axios"
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom";

export function AddVideos(){

  const navigate = useNavigate();

  const [categories,setCategories] = useState([{CategoryId:0,CategoryName:''}]);

  const formik = useFormik({
    initialValues:{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0},
    onSubmit:(video)=>{
      axios.post("http://localhost:3030/add-video",video)
      .then(()=>{
        alert("video added successfully");
        navigate('/admin-dashboard');
      })
    }
  })

  function LoadCategories(){
    axios.get("http://localhost:3030/get-categories")
    .then(response=>{
      response.data.unshift({CategoryId:-1,CategoryName:"Select category"})
      setCategories(response.data);
    })
  }

  useEffect(()=>{
    LoadCategories();
  },[])
  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-warning px-5">Add New Video</h2><br />
        <dl className="row">
          <dt className="col-3">VideoId</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="number" name="VideoId" /></dd>
          <dt className="col-3">Title</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="text" name="Title" /></dd>
          <dt className="col-3">Url</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="text" name="Url" /></dd>
          <dt className="col-3">Description</dt>
          <dd className="col-9"><textarea onChange={formik.handleChange} name="Description" rows="4" cols="40"></textarea></dd>
          <dt className="col-3">Likes</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="number" name="Likes" /></dd>
          <dt className="col-3">Dislikes</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="number" name="Dislikes" /></dd>
          <dt className="col-3">Views</dt>
          <dd className="col-9"><input onChange={formik.handleChange} type="number" name="Views" /></dd>
          <dt className="col-3">Category</dt>
          <dd className="col-9">
            <select onChange={formik.handleChange} name="categoryId">
              {
                categories.map(category=>(
                  <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
                ))
              }
            </select>
          </dd>
        </dl>
        <button className="btn btn-primary">Add Video</button>
        <Link className='btn btn-warning ms-2' to="/admin-dashboard">Cancle</Link>
      </form>
    </div>
  )
}