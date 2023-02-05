import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main/Main/Main'
import Contact from './components/Contact/Contact'
import Login from './components/Users/Login/Login'
import Register from './components/Users/Register/Register';
import ActivityHome from './components/Activities/ActivityHome/ActivityHome'
import BackOffice from './components/BackOffice/BackOffice';
import { Routes, Route } from 'react-router-dom';
import ActivityDetail from './components/Activities/ActivityDetail/ActivityDetail';
import NewsHome from './components/News/NewsHome/NewsHome'
import NewsDetail from './components/News/NewsDetail/NewsDetail'
import Layout from './components/Layout/Layout';
import AboutUs from './components/AboutUs/AboutUs' 
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from './reducers/userReducer'
import { fetchOrganization } from './reducers/organizationReducer';
import { BASE_PATH } from './utils/constants'
import { customFetch } from './services/fetch'
import ProtectedRoute from './features/protectedRoute/ProtectedRoute'
import TestimonialsHome from './components/Testimonials/TestimonialsHome/TestimonialsHome';
import Profile from './components/Profile/Profile'
import EditProfile from './components/Profile/EditProfile/EditProfile';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail';
import EmailConfirmed from './components/EmailConfirmed/EmailConfirmed';
import Donations from './components/Donations/Donations';


function App() {
  // const location = useLocation();
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const refreshURL = `${BASE_PATH}/auth/me`
  const refreshProperties = {
    method: 'get'
  }

  useEffect(() => {
    if(token){
      customFetch(refreshURL, refreshProperties)
        .then(user => {
          let userObj = {
            id: user.data.payload.id,
            firstName: user.data.payload.firstName,
            lastName: user.data.payload.lastName,
            email: user.data.payload.email,
            image: user.data.payload.image,
            roleId: user.data.payload.roleId,
            isConfirmed: user.data.payload.isConfirmed,
            token
          }
          dispatch(refresh(userObj))
        })
          .catch(error => console.log(error))
      }
    //get organization data
    dispatch(fetchOrganization())
  }, [])


  const userData = useSelector(store => store.user)

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<MainSPA userData={userData} />} />
        <Route element={<ProtectedRoute isAllowed={!!userData} />}>
          <Route path="/backOffice/*" element={ <BackOffice/> } />
        </Route>
      </Routes>
    </div>
  );
}

function MainSPA({ userData }) {


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path='/usuario/:id' element={<Profile />} />
        <Route exact path='/usuario/editar/:id' element={<EditProfile/>} /> 
        <Route exact path='/usuario/confirmaremail/' element={<ConfirmEmail />} />
        <Route exact path='/confirmacion/:token' element={<EmailConfirmed />} />
        <Route exact path='/donaciones' element={<Donations />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/nosotros" element={<AboutUs/>} />
        <Route path="/novedades" element={<NewsHome />} />
        <Route path="/novedades/:id" element={<NewsDetail />} />
        <Route path='/actividades' element={<ActivityHome />} />
        <Route path='/actividades/:id' element={<ActivityDetail />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testimonios" element={<TestimonialsHome />} />
      </Routes>
    </Layout>
  );
}


export default App;