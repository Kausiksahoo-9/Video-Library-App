import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function UserRegister() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: (user) => {
      axios.post("http://localhost:3030/register-user", user).then(() => {
        alert("user registered");
        navigate("/user-login");
      });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 w-25">
        <h3 className="text-center mb-4 text-white">Register User</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">UserId</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="UserId"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">UserName</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="UserName"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              onChange={formik.handleChange}
              name="Password"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              onChange={formik.handleChange}
              name="Email"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Mobile</label>
            <input
              type="text"
              onChange={formik.handleChange}
              name="Mobile"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
