import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Task1() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
          const response = await axios.get('https://reqres.in/api/users?page=1');
          setUsers(response.data.images); //store the data 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    
      // Fetch data when component mounts
      useEffect(() => {
        fetchUsers();
      }, []);
    
  return (
    <>
    <div className="container">
        <h1 className='text-2xl font-bold mb-5'>User Data</h1>
        <div className="mt-3">
            <table className='table'>
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
                        
                            {users.map((user)=>(
                               <tr key={user.id} className='align-middle'>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td><img src={user.avatar} alt=""/></td>
                               </tr>
                            ))}
                            
                
                    </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Task1
