import React, { useState, useEffect } from "react";
import panel  from './styles/Panels.module.css'
import grid  from './styles/Grids.module.css'
import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const axiosMembers = axios.create({
    baseURL: `${SERVER_BASE_URL}/members`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});


const MembersPanel = () => {

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        try {
            const res = await axiosMembers.get()
            setMembers(res.data);
        } catch (error) {
            console.error(`Error getting members, ${error}`)
        };
    };

    useEffect(() => {
        getMembers()
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosMembers.delete(`/${id}`)
            getMembers()
        } catch (error) {
            console.error(`Error getting members, ${error}`)
        };
    };

    const MembersCard = ({data}) => {

        const [edit, setEdit] = useState(false)

        return(
        <div className={grid.gridCardContainer}>
            <li className={grid.listItem}>
                <div className={grid.imageContainer}>
                    <img className={grid.image} src={data.image} alt="Image" />
                </div>
                <div className={grid.dataContainer}>
                    <h4>{ data.name }</h4>
                </div>
                <div className={grid.buttons}>
                    <button onClick={() => handleDelete(data.id)} className={grid.deleteButton}>Eliminar</button>
                </div>
            </li>
        </div>
        );
    }

    return (
        <div className={panel.simpleContainer}>
            <div className={panel.titleContainer}>
                <h1 className={panel.title}>Miembros</h1>
            </div>
            <div className={grid.gridContainer}>
                <div className={grid.grid}>
                    {
                        members && members.map((data) => (
                            <MembersCard data={data} key={data.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );


}



export default MembersPanel