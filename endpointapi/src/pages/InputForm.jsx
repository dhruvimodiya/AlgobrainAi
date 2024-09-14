import axios from "axios";
import React, { useEffect, useState } from "react";

function InputForm() {
  const initialData = { email: "", first_name: "", last_name: "", avatar: "" };
  
  // State for form input data
  const [inputData, setInputData] = useState(initialData);
  console.log("🚀 ~ InputForm ~ inputData:", inputData)
  
  // State for fetched users
  const [users, setUsers] = useState([]);

  const handleData = (e) => {
    if (e.target.name === "avatar") {
      // Handle file input separately
      setInputData({ ...inputData, [e.target.name]: e.target.files[0] });
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("first_name", inputData.first_name);
    formData.append("last_name", inputData.last_name);
    formData.append("avatar", inputData.avatar);

    axios
      .post('https://reqres.in/api/register', formData)
      .then((res) => {
        console.log(res.data);
        // Refresh user data after submission
        setUsers([...users, res.data]);
        setInputData(initialData); // Clear form after submission
      })
      .catch((err) => console.log(err));
  };

//   const handleEdit = (editIDNotState) => {
//     axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
//         .then(res => {
//             setFormData(res.data)

//         })
//         .catch(err => console.log(err))
// };

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        setUsers(res.data.data); // Store fetched user data in the state
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>User Data</h1>
      <div className="container">
        <div className="row col-lg-12">
          <form action="" className="mt-5" onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label"> Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  onChange={handleData}
                  value={inputData.email}
                  name="email"
                  id="email"
                  placeholder="email"
                />
              </div>

              <label htmlFor="first_name" className="col-sm-2 col-form-label"> First Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleData}
                  value={inputData.first_name}
                  name="first_name"
                  id="first_name"
                  placeholder="firstname"
                />
              </div>

              <label htmlFor="last_name" className="col-sm-2 col-form-label"> Last Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleData}
                  value={inputData.last_name}
                  name="last_name"
                  id="last_name"
                  placeholder="lastname"
                />
              </div>

              <label htmlFor="avatar" className="col-sm-2 col-form-label">Profile</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleData}
                  name="avatar"
                  id="avatar"
                />
              </div>

              <button className="bg-primary-100 w-40 h-10 mt-5 mx-52 rounded-2xl">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container">
        <h1 className="text-2xl font-bold mb-5">User Data</h1>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>PROFILE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="align-middle">
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td><img src={user.avatar} alt="" style={{ width: "50px", borderRadius: "50%" }} /></td>
                  <td>
                                        {/* <button className="btn btn-warning" onClick={() => {
                                           handleEdit(item.id)
                                            setEditID(item.id)
                                        }}>
                                            Edit
                                        </button>{" "} */}
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InputForm;
