import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

//Social Icons
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'

//styles
import styles from './Footer.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

//dummy data (replace it with data receive from public endpoint when available)
const links = [
    {
        name: 'Actividades',
        url: '/actividades'
    },
    {
        name: 'Novedades',
        url: '/novedades'
    },
    {
        name: 'Nosotros',
        url: '/nosotros'
    }
]

const Footer = () => {
    //Organization data (redux)
    const organization = useSelector(store => store.organization)

    const Logo = () => {
        return (
            <div className={`${styles.box} ${styles.logoContainer}`}>
                <img src={organization.data?.image ? organization.data.image : '/images/logo.png'} alt={organization.data?.name ? organization.data.name : 'logo'} className={styles.logo} />
            </div>
        )
    }

    const WebLinks = () => {
        return (
            <div className={`${styles.box} ${styles.webLinks}`}>
                <h3>Nuestras secciones</h3>
                {links.length > 0 && (
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={`web-${index}`}>
                                    <Link to={link.url}>{link.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

    //Social media icon
    //Add more if needed (first import it from 'react-bootstrap-icons')
    const SocialIcon = ({ socialName, size }) => {
        switch (socialName) {
            case 'Facebook':
                return <Facebook size={size} className={styles.icon} />
            case 'Instagram':
                return <Instagram size={size} className={styles.icon} />
            case 'Twitter':
                return <Twitter size={size} className={styles.icon} />
            default:
                return null
        }
    }

    const SocialLinks = () => {
        return (
            <div className={`${styles.box} ${styles.socialLinks}`}>
                <h3>Nuestras redes</h3>
                {organization.data.socialLinks.length > 0 && (
                    <ul>
                        {organization.data.socialLinks.map((social, index) => {
                            return (
                                <li key={`social-${index}`}>
                                    <a href={social.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                        <SocialIcon socialName={social.name} size={18} />
                                        {social.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        )
    }

    return (
        <>
            <div className={styles.container}>
                {!organization.loading && <Logo />}
                {organization.data && <SocialLinks />}
                <WebLinks />
            </div>
            <div className={styles.contact}>
                <p><Link to='/contacto'>Contáctanos</Link></p>
                {organization.data && <p className={styles.siteName}>{organization.data.name}</p>}
            </div>
        </>
    )
}

export default Footer
