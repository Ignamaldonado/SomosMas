import React from 'react';
import './EditForm.css';

const EditForm = () => {
    return (

        <form>
            <h1>Formulario de edición</h1>

            <label for="textarea">Ingrese el nuevo texto de bienvenida</label>
            <textarea id="textarea" minLength="20" required></textarea>

            <label for="img1">Seleccione la primera imagen</label>
            <input type="file" id="img1"></input>
            <label for="text1">Escriba el texto para la primera imagen</label>
            <input id="text1"></input>

            <label for="img2">Seleccione la segunda imagen</label>
            <input type="file" id="img2"></input>
            <label for="text2">Escriba el texto para la segunda imagen</label>
            <input id="text2"></input>

            <label for="img3">Seleccione la tercera imagen</label>
            <input type="file" id="img3"></input>
            <label for="text3">Escriba el texto para la tercera imagen</label>
            <input id="text3"></input>

            <button type="submit">Enviar</button>

        </form>

    )
}

export default EditForm;