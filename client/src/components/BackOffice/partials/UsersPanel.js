import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import panel  from './styles/Panels.module.css'
import grid  from './styles/Grids.module.css'
import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const axiosUsers = axios.create({
    baseURL: `${SERVER_BASE_URL}/users`,
    headers: {
        'authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'multipart/form-data'
    }
});


const UsersPanel = () => {

    const [users, setUsers] = useState([])
    const loggedUser = useSelector((state) => state.user)

    const getUsers = async () => {
        try {
            const res = await axiosUsers.get()
            setUsers(res.data)
        } catch (error) {
            console.log('Error getting users: ', error)
        }
    };

    useEffect(() => {
        getUsers()
    }, []);

    const handleDelete = async (id) => {
        await axiosUsers.delete(`/${id}`)
        getUsers()
    };

    const handleChangeRole = async (id) => {
        await axiosUsers.put(`/changeRole/${id}`)
        getUsers()
    };

    return (
        <div className={panel.simpleContainer}>
            <div className={panel.titleContainer}>
                <h1 className={panel.title}>Usuarios</h1>
            </div>
            <div className={grid.gridContainer}>
                <div className={grid.grid}>
                    {
                        users && users.map((e) => (
                            <div key={e.id} className={grid.gridCardContainer}>
                                <li className={grid.listItem}>
                                    <div className={grid.imageContainer}>
                                        <img className={grid.image} src={e.image} alt="Image" />
                                    </div>
                                    <div className={grid.dataContainer}>
                                        <h4> {e.firstName} {e.lastName} </h4>
                                        <h4>{e.email}</h4>
                                        <h4>Admin: { e.roleId === 1 ? 'Si' : 'No' }</h4>
                                    </div>
                                    <div className={grid.buttons}>
                                        <button onClick={() => handleChangeRole(e.id)} className={e.email === loggedUser.email ? grid.disabledButton : grid.roleButton} disabled={e.email === loggedUser.email ? true : false} >Cambiar Rol</button>
                                        <button onClick={() => handleDelete(e.id)} className={grid.deleteButton}>Eliminar</button>
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default UsersPanel