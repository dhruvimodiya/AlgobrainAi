import React, { useState, useEffect } from "react";
import axios from 'axios'
import { avatar } from "@nextui-org/react";
const Demo1 = () => {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
    });

    const [editID, setEditID] = useState()

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    const { email, first_name, last_name, avatar } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ email: "", first_name: "", last_name: "", avatar: "" });

                })
                .catch(err => console.log(err))
    };

    const handleUpdate = () => {
        if (email && first_name && last_name && avatar) {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
                .then(res => {
                    setFormData({ email: "", first_name: "", last_name: "", avatar: "" });
                    setRefresh(refresh + 1)
                })
                .catch(err => console.log(err))

        }
    };

    const handleDelete = (deleteID) => {
        axios.delete(`https://reqres.in/api/users/2/${deleteID}`)
        .then(res => {
           console.log('DELETD RECORD::::', res)

        })
        .catch(err => console.log(err))
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
            .then(res => {
                setFormData(res.data)

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
        // console.log(data);
    }, [refresh]);

    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <h4> Lets Learn CRUD API Integration in React js using axios</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="first_name">First name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                placeholder="Enter id"
                                name="first_name"
                                value={first_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                placeholder="Enter last name"
                                name="last_name"
                                value={last_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar">profile</label>
                            <input
                                type="file"
                                className="form-control"
                                name="avatar"
                                value={avatar}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={() => {
                            handleUpdate()
                        }}>
                            Update
                        </button>
                    </form>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>email</th>
                                <th>first name</th>
                                <th>last name</th>
                                <th>profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.avatar}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => {
                                            handleEdit(item.id)
                                            setEditID(item.id)
                                        }}>
                                            Edit
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    </>
    );
};

export default Demo1;