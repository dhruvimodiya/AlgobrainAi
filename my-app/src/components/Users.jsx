import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function Users() {
  const [data, setData] = useState([]);
  const [mode ,setMode] =useState('online');

  useEffect(() => {
    // Check if data exists in localStorage first
    const localData = localStorage.getItem("users");

    if (localData) {
      // If found, set it to the state
      setData(JSON.parse(localData));
    }

    // Fetch new data from API, and update both state and localStorage
    let url = "https://jsonplaceholder.typicode.com/users/";
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setData(result);

        // Store the new data in localStorage
        localStorage.setItem("users", JSON.stringify(result));
      })
      .catch((err) => {
        console.error("Failed to fetch data", err); // If fetch fails, it will continue to show localStorage data
        setMode('offline')
      });
  }, []);

  return (
    <>
    <div>
    <center>
      {
        mode === 'offline' ? 
        <Alert variant="warning">
        you are in offline mode or some issue with connection
        </Alert>
        : null
      }
      </center>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
}

export default Users;
