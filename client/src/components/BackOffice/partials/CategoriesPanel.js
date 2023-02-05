import React, { useState, useEffect, useReducer } from "react"
import adminService from "../../../services/adminService"
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const CategoriesPanel = ({ defaultCatg }) => {
    const [category, setCategori] = useState(defaultCatg)
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

    const categoriesList = async () => {
        let response = await adminService.categoriesPanel()
        setCategori(response.data)
    }

    useEffect(() => {
        categoriesList()
    }, [reducerValue])

    /*  const handleDelete = () => {
         console.log(`click en delete ${b.id}`)
         fetch(`${SERVER_BASE_URL}/categories/delete/${b.id}`, {
             method: "DELETE"
         })
             .then(response => {
                 if (!response.ok) {
                     throw new Error("Hubo un problema en el borrado")
                 } else {
                     console.log(`Se borró el item numero id ${b.id} satisfactoriamente`)
                 }
             })
             .catch(error => {
                 console.error(error)
             })
     } */

    return (
        <div className="col-sm-8 py-3 align-items-center justify-content-center">
            <h1>CATEGORIAS</h1>
            {(category) &&
                category.map((b, i) => (
                    <ListGroup className="col-sm-8 py-2 mx-auto">
                        <ListGroup.Item className="d-flex justify-content-between"><span>{i + 1}.-{b.name}</span><Button variant="danger"

                            onClick={() => {
                                fetch(`${SERVER_BASE_URL}/categories/${b.id}`, {
                                    method: "DELETE"
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error("Hubo un problema en el borrado")
                                        } else {
                                            console.log(`Se borró el item numero id ${b.id} satisfactoriamente`)
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    })
                                forceUpdate()
                            }}
                        >Eliminar</Button> </ListGroup.Item>
                    </ListGroup>
                ))
            }
        </div>
    );


}

export default CategoriesPanel