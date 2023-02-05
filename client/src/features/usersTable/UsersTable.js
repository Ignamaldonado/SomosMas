import React from 'react';
import './userTable.css';
import { useState, useEffect } from 'react';

/* DUMMY EXAMPLE USER INFORMATION */
let users = [
    { name: "nameFirstUser", lastName: "lastNameFirstUser", email: "emailFirstUser@test.com" },
    { name: "nombreSegundoUsuario", lastName: "apellidoSegundoUsuario", email: "emailSegundoUsuario@test.com" },
    { name: "dummyName", lastName: "dummyLastName", email: "dummyEmail@test.com" },
    { name: "afasfasfasf", lastName: "gwetw4tty65u", email: "34yt34yy34y3ty34" },
    { name: "yiu45896bwer", lastName: "6twt264c8e98", email: "u348otfn389ew2" }
]


/* FETCH AND HOOKS TO BE USED ONCE USERS ENDPOINT IS COMPLETED */

// const [users, setUsers] = useState([]);

// const fetchData = async () => {;
//    const data = await fetch("urlUsersEndpoint");
//    const fetchedUsers = await data.json(); 
//    setUsers(fetchedUsers);
//}

// useEffect(
// () => {
// fetchData()
//}, []
// ) 

const UsersTable = () => {
    return (

        <table>
            <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Edit User</th>
                <th>Delete User</th>
            </tr>

            {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            ))}

        </table>
    )
};

export default UsersTable;