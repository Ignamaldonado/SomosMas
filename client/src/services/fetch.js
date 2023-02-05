import axios from 'axios';

export function customFetch (url, properties) { 
    let token = localStorage.getItem('token'); // if a token exist in localStorage is going to be saved here
        const config = {
            ...properties, // properties are the axios config, like the method or the url
            url: url,
            headers: {
                ...properties?.headers, // if properties have something and is passed, is going to see if they are headers inside
                "Authorization": `Bearer ${JSON.parse(token)}` // this line can be passed in public fetchs and nothing happens, is for authentication
            }
        }
        console.log(config)
       return axios(config) 
}


/* EXAMPLE OF A POST FETCH 
async function examplePost() {
    try {
        const url = 'example url'
        const properties = {
            method: 'post',
            data: {
                name: 'john',
                lastName: 'doe',
                email: 'johndoe@email.com'
            }
        }
        const result = await customFetch(url, properties) // here you passed the url, the HTTP method and the data/body to the customFetch
        return result
    } catch (error) {
        console.log(error)
        return null
    }
} */




