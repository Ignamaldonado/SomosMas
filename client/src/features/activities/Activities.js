import React from 'react';
import './activities.css';
import { useState, useEffect } from 'react';

/* DUMMY EXAMPLE ACTIVITIES */
// let activities = ["activity1", "activity2", "activity3", "activity4"];

let activities = [
    {
        id: 1,
        name: "activity 1",
        image: "https://images.pexels.com/photos/8813498/pexels-photo-8813498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        name: "activity 2",
        image: "https://images.pexels.com/photos/8471859/pexels-photo-8471859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
        id: 3,
        name: "activity 3",
        image: "https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
        id: 4,
        name: "activity 4",
        image: "https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
]

/* FETCH AND HOOKS TO BE USED ONCE ACTIVITIES ENDPOINT IS COMPLETED */

// const [activities, setActivities] = useState([]);

// const fetchData = async () => {;
//    const data = await fetch("urlActivitiesEndpoint");
//    const fetchedActivities = await data.json(); 
//    setUsers(fetchedActivities);
//}

// useEffect(
// () => {
// fetchData()
//}, []
// ) 

const Activities = () => {
    return (

        <table>
            <tr>
                <th>Título</th>
                <th>Imagen</th>
                <th>Descripción</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>

            {activities.map((activity, index) => (
                <tr key={activity.id}>
                    <td>{activity.name}</td>
                    <td><img width="200px" src={activity.image} alt="activity image" /></td>
                    <td><p>{activity.content}</p></td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            ))}

        </table>
    )
};

export default Activities;