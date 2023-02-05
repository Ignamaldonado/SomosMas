import React, {useState} from "react"
import { Routes, Route } from 'react-router-dom';
import AdminRouteGuard from "./AdminRouteGuard"

import {List}  from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import SideBar from './partials/SideBar'
import EditProfilePanel from './partials/EditProfilePanel'
import ProfilePanel from './partials/ProfilePanel'
import AddTestimonialPanel from './partials/AddTestimonialPanel'
import NewsPanel from './partials/NewsPanel'
import ActivitiesPanel from './partials/ActivitiesPanel'
import CategoriesPanel from './partials/CategoriesPanel'
import TestimonialsPanel from './partials/TestimonialsPanel'
import SlidesPanel from './partials/SlidesPanel'
import UsersPanel from './partials/UsersPanel'
import OrganizationPanel from './partials/OrganizationPanel'
import MembersPanel from './partials/MembersPanel'
import ContactsPanel from './partials/ContactsPanel'

import './BackOffice.css'

const BackOffice = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <main className="d-flex">
            <div className="d-none d-lg-block">
                <SideBar/>

            </div>

            <div className="d-lg-none position-absolute">
                <Button onClick={handleShow}><List/></Button>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton/>
                    <SideBar/>
                </Offcanvas>

            </div>
            <Routes>
                <Route path="/usuario/:id" element={<ProfilePanel />} />
                <Route path="/usuario/editar/:id" element={<EditProfilePanel />} />
                <Route path="/addTestimonial" element={<AddTestimonialPanel />} />
                <Route element={<AdminRouteGuard />}>
                    <Route path="/news" element={<NewsPanel />} />
                    <Route path="/activities" element={<ActivitiesPanel />} />
                    <Route path="/categories" element={<CategoriesPanel />} />
                    <Route path="/testimonials" element={<TestimonialsPanel />} />
                    <Route path="/slides" element={<SlidesPanel />} />
                    <Route path="/users" element={<UsersPanel />} />
                    <Route path="/organization" element={<OrganizationPanel />} />
                    <Route path="/members" element={<MembersPanel />} />
                    <Route path="/contacts" element={<ContactsPanel />} />
                </Route>

            </Routes>
        </main>
    )

}

export default BackOffice