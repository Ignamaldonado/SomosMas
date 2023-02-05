const request = require('supertest');
const app = require('../app');



describe ('get,post and put /activities response status 200', () => { 
    const id = 1
    const newActivity={        
        name:'Prueba Jest',
        image: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        content:'<p>contenido 37</p>'
    }

    const activityModific={
        id: 1,
        name:'Prueba Jest Modificado',
        image: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        content:'<p>Modificardo jest</p>'
    }
    
test('should response status 200 an all activities', async ()=>{
    const response= await request(app).get('/activities').send();    
    expect(response.statusCode).toBe(200)      
   
    })

test('should response status 200 and data activity for id', async ()=>{
    const response= await request(app).get(`/activities/${id}`).send();    
    expect(response.statusCode).toBe(200); 
    
    })

test('should content-type header is json', async ()=>{
        const response= await request(app).get('/activities').send(); 
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8")        
    })

test('the response will come in an array', async ()=>{
        const response= await request(app).get('/activities').send(); 
        expect(response.text).toHaveProperty([0])        
    })


test('create activity post', async ()=>{
    const response= await request(app).post('/activities').send(newActivity);    
    expect(response.statusCode).toEqual(200);    
    
    })

test('should response edit activity ', async ()=>{
    const response= await request(app).put(`/activities/${id}`).send(activityModific);    
    expect(response.statusCode).toBe(200); 
    
    })
});


describe ('bad reques response status 400', () => { 
    const id='50';
    const newActivityBad={    
        id:50,    
        name:'',
        image: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        content:''
    }
    const newActivityBad2={    
        id:50,    
        name:'Activiti jest bad',
        image: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        content:''
    }

    test('create activity post bad', async ()=>{
        const response= await request(app).post('/activities').send(newActivityBad);    
        expect(response.statusCode).toEqual(400);
        expect(response.body)
        
    })
    
    test('create activity post bad', async ()=>{
        const response= await request(app).post('/activities').send(newActivityBad2);    
        expect(response.statusCode).toEqual(400);
        expect(response.body)
        
    })


    test('create activity put bad', async ()=>{
        const response= await request(app).put('/activities').send(newActivityBad);    
        expect(response.statusCode).toEqual(404);
        expect(response.body)
       
    })

    test('when no activity is found the response status is 404', async ()=>{
        const response= await request(app).get(`/activities/${id}`).send();    
        expect(response.statusCode).toBe(404); 
        
    }) 
     
    
});
